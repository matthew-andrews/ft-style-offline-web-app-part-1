APP.applicationController = (function () {
    'use strict';

    function offlineWarning() {
        alert("This feature is only available online.");
    }

    function pageNotFound() {
        alert("That page you were looking for cannot be found.");
    }

    function showHome() {
        $("#body").html(APP.templates.home());

        // Load up the last cached copy of the news
        APP.articlesController.showArticleList();

        $('#refreshButton').click(function () {

            // If the user is offline, don't bother trying to synchronize
            if (navigator && navigator.onLine === false) {
                offlineWarning();
            } else {
                APP.articlesController.synchronizeWithServer();
            }
        });
    }

    function showArticle(id) {
        $("#body").html(APP.templates.articleLoading());
        APP.articlesController.showArticle(id);
    }

    function route() {
        var page = window.location.hash;
        if (page) {
            page = page.substring(1);
            if (parseInt(page, 10) > 0) {
                showArticle(page);
            } else {
                pageNotFound();
            }
        } else {
            showHome();
        }
    }


    // This is to our webapp what main() is to C, $(document).ready is to jQuery, etc
    function start(resources, start) {
        APP.database.open(function () {

            // Listen to the hash tag changing
            $(window).bind("hashchange", route);

            // Inject CSS Into the DOM
            $("head").append("<style>" + resources.css + "</style>");

            // Create app elements
            $("body").html(APP.templates.application());

            // Remove our loading splash screen
            $("#loading").remove();

            route();
        });

        if (storeResources) {
          localStorage.resources = JSON.stringify(resources);
        }
    }

    return {
        start: start
    };
}());