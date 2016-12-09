function startApp() {

    //Clear User Auth Data:
    sessionStorage.clear();

    //Show & Hide Menu Links:
    showHideMenuLinks();

    // Bind The Navigation Menu Links:
    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(registerView);
    $("#linkListAds").click(listAds);
    $("#linkCreateAd").click(showCreatedAds);
    $("#linkLogout").click(logoutUser);

    //Bind The Form Submit Buttons:
    $("#buttonLoginUser").click(loginUser);
    $("#buttonRegisterUser").click(registerUser);
    $("#buttonCreateAd").click(createAd);
    $("#buttonEditAd").click(editAd);

    //Bind the info / error boxes: hide on click:
    $("#infoBox, #errorBox").click(function () {
        $(this).fadeOut();
    });

    //Create Constants:
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_rkf7DvrMg";
    const kinveyAppSecret = "201fdc29f52c4e70925f1112df485a1c";
    const kinveyAppAuthHeaders = {
        'Authorization' : "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {$("#loadingBox").show()},
        ajaxStop: function () {$("#loadingBox").hide()}
    });

    // Functions:
    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " +
            sessionStorage.getItem('authToken'),
        };
    }

    function saveAuthInSession(userInfo) {
        sessionStorage.setItem("username", userInfo.username);
        sessionStorage.setItem("authToken", userInfo._kmd.authtoken);

        $("#loggedInUser").text("Welcome, " + userInfo.username);
        listAds();
    }

    // Show & Hide View Functions:
    function showHideMenuLinks() {
        $("#menu a").hide();

        if (sessionStorage.getItem("authToken")) {
            //Logged In User:
            $("#linkHome").show();
            $("#linkListAds").show();
            $("#linkCreateAd").show();
            $("#linkLogout").show();
        } else {
            //Not Logged In User:
            $("#linkHome").show();
            $("#linkLogin").show();
            $("#linkRegister").show();
        }
    }

    function showView(viewName) {
        //Hide All Views And Show The Selected View Only:
        $('main > section').hide();
        $("#" + viewName).show();
    }

    function showHomeView() {
        showView("viewHome");
    }

    function showLoginView() {
        showView("viewLogin");
        $("#formLogin").trigger('reset');
    }

    function registerView() {
        showView("viewRegister");
        $("#formRegister").trigger('reset');
    }

    function showCreatedAds() {
        showView("viewCreateAd");
        $("#formCreateAd").trigger('reset');
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut;
        }, 3000);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

    //Func That Handle Ajax Error:
    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    //Functions for Login/Logout/Register & CRUD Operations:
    function logoutUser() {
        sessionStorage.clear();
        $("#loggedInUser").text("");
        showView("viewHome");
        showHideMenuLinks();
        showInfo("Logout Successful");
    }

    function loginUser() {
        let userData = {
            username: $("#formLogin input[name=username]").val(),
            password: $("#formLogin input[name=passwd]").val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
            data: userData,
            headers: kinveyAppAuthHeaders,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo("Login Successful");
        }
    }

    function registerUser() {
        let userData = {
            username: $("#formRegister input[name=username]").val(),
            password: $("#formRegister input[name=passwd]").val()
        };
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/",
            data: JSON.stringify(userData),
            contentType: "application/json",
            headers: kinveyAppAuthHeaders,
            success: registerUserSuccess,
            error: handleAjaxError
        });
        function registerUserSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo("User Registration Successful.");
        }
    }

    function createAd() {

    }

    function editAd() {

    }
    function listAds(ads) {

    }
}