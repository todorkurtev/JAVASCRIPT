function startApp() {

    sessionStorage.clear();

    showHideMenuLinks();

    //Authorization
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_SJutTOqme";
    const kinveyAppSecret = "398c619861d348c3a98ccee5c156bdd7";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " +
        btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };

    $('main > section').hide();

    $("#infoBox, #errorBox, #loadingBox").hide();
    showView('viewAppHome');

    $('#linkMenuAppHome').on('click', function () {
        showView('viewAppHome');
    });

    $('#linkMenuLogin').on('click', function () {
        showView('viewLogin');
    });

    $('#linkMenuRegister').on('click', function () {
        showView('viewRegister');
    });

    $('#linkMenuUserHome').on('click', function () {
        showView('viewUserHome');
    });

    $('#linkMenuMyMessages').on('click', function () {
        showView('viewMyMessages');
        listMessages();
    });

    $('#linkMenuArchiveSent').on('click', function () {
        showView('viewArchiveSent');
        listSentMessages();
    });

    $('#linkMenuSendMessage').on('click', function () {
        showView('viewSendMessage');
    });

    $('#linkMenuLogout').click(logoutUser);


    function showView(viewName) {
        $('main > section').hide();
        $('#' + viewName).show();
    }

    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    });

    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }
    });

    function showHideMenuLinks() {
        $("#linkMenuAppHome").show();
        if (sessionStorage.getItem('authToken') == null) {
            // Not logged in
            $("#spanMenuLoggedInUser").hide();
            $("#linkMenuUserHome").hide();
            $("#linkMenuMyMessages").hide();
            $("#linkMenuArchiveSent").hide();
            $("#linkMenuSendMessage").hide();
            $("#linkMenuLogout").hide();
            $("#linkMenuAppHome").show();
            $("#linkMenuLogin").show();
            $("#linkMenuRegister").show();

        } else {
            // Loged in
            $("#spanMenuLoggedInUser").show();
            $("#linkMenuUserHome").show();
            $("#linkMenuMyMessages").show();
            $("#linkMenuArchiveSent").show();
            $("#linkMenuSendMessage").show();
            $("#linkMenuLogout").show();
            $("#linkMenuAppHome").hide();
            $("#linkMenuLogin").hide();
            $("#linkMenuRegister").hide();


        }
    }


    //Alert

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function() {
            $('#infoBox').fadeOut();}, 3000);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    //Register User

    $("#formRegister").submit(registerUser);
    function registerUser(event) {
        event.preventDefault();

        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=password]').val(),
            name:  $('#formRegister input[name=name]').val()
        };
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/",
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        });

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            showInfo('User registration successful.');
        }
    }

    //Login
    $("#formLogin").submit(loginUser);
    function loginUser() {
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=password]').val()
        };
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            showInfo('Login successful.');
        }
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        $('#spanMenuLoggedInUser').text(
            "Welcome, " + username + "!");
        $('#viewUserHomeHeading').text(
            "Welcome, " + username + "!");
        showView('viewUserHome');
    }
    //LogOut User
    function logoutUser() {
        sessionStorage.clear();
        $('#spanMenuLoggedInUser').text("");
        showHideMenuLinks();
        showView('viewAppHome');
        showInfo('Logout successful.');
    }


    //List Messages
    function listMessages() {
        $('#myMessages').empty();
        showView('viewMyMessages');
        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages",
            headers: getKinveyUserAuthHeaders(),
            success: loadMessagesSuccess,
            error: handleAjaxError
        });
        function loadMessagesSuccess(messages) {
            showInfo('Messages loaded.');
            if (messages.length == 0) {
                $('#myMessages').text('No messages in the library.');
            } else {
                let messagesTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>From</th><th>Message</th>',
                        '<th>Date Received</th>'));
                for (let message of messages)
                    if(message.recipient_username == sessionStorage.getItem('username'))
                        appendMessageRow(message, messagesTable);
                $('#myMessages').append(messagesTable);
            }
        }
    }

    function appendMessageRow(message, messagesTable) {
        messagesTable.append($('<tr>').append(
            $('<td>').text(formatSender(message.sender_name, message.sender_username)),
            $('<td>').text(message.text),
            $('<td>').text(formatDate(message._kmd.lmt))
        ));

        function formatSender(name, username) {
            if (!name)
                return username;
            else
                return username + ' (' + name + ')';
        }

        function formatDate(dateISO8601) {
            let date = new Date(dateISO8601);
            if (Number.isNaN(date.getDate()))
                return '';
            return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
                "." + date.getFullYear() + ' ' + date.getHours() + ':' +
                padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

            function padZeros(num) {
                return ('0' + num).slice(-2);
            }
        }


    }


    function listSentMessages() {
        $('#sentMessages').empty();
        showView('viewArchiveSent');
        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages",
            headers: getKinveyUserAuthHeaders(),
            success: loadSentMessagesSuccess,
            error: handleAjaxError
        });
        function loadSentMessagesSuccess(messages) {
            console.log(messages);
            showInfo('Send Messages loaded.');
            if (messages.length == 0) {
                $('#sentMessages').text('no messages.');
            } else {
                let messagesTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>To</th><th>Message</th>',
                        '<th>Date Sent</th>','<th>Actions</th>'));
                for (let message of messages)
                    if (message._acl.creator == sessionStorage['userId'])
                        appendMessageSentRow(message, messagesTable);
                $('#sentMessages').append(messagesTable);
            }
        }
    }


    function appendMessageSentRow(message, messagesTable) {
        let links = [];
        let deleteLink = $('<a href="#">[Delete]</a>')
            .click(deleteMessage.bind(this, message));
        links = [deleteLink];

        messagesTable.append($('<tr>').append(
            $('<td>').text(message.recipient_username),
            $('<td>').text(message.text),
            $('<td>').text(formatDate(message._kmd.lmt)),
            $('<td>').append(links)
        ));

        function formatDate(dateISO8601) {
            let date = new Date(dateISO8601);
            if (Number.isNaN(date.getDate()))
                return '';
            return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
                "." + date.getFullYear() + ' ' + date.getHours() + ':' +
                padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

            function padZeros(num) {
                return ('0' + num).slice(-2);
            }
        }
    }

    function deleteMessage(message) {
        console.log(message);
        $.ajax({
            method: "DELETE",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/messages/" + message._id,
            headers: getKinveyUserAuthHeaders(),
            success: deleteMassageSuccess(),
            error: handleAjaxError
        });
        function deleteMassageSuccess(response) {
            listMessages();
            showInfo('Message deleted.');
        }
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " +
            sessionStorage.getItem('authToken'),
        };
    }
}