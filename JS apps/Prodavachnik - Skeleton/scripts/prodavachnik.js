function startApp(){

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
}