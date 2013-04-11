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
                APP.articlesController.synchronizeWithServer(offlineWarning);
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
    
    function initialize() {

        // Listen to the hash tag changing
        $(window).bind("hashchange", route);

        // Inject CSS Into the DOM
        $("head").append("<style>" + resources.css + "</style>");

        // Create app elements
        $("body").html(APP.templates.application());

        // Remove our loading splash screen
        $("#loading").remove();

        route();
    }


    // This is to our webapp what main() is to C, $(document).ready is to jQuery, etc
    function start(resources, storeResources) {
    	var iOSPrivateBrowsing = false;
    	
    	// Try to detect whether iOS private browsing mode is enabled
        try {
        	localStorage.test = '';
        	localStorage.removeItem('item');
        } catch (exception) {
            if (exception.code === 22) {
            	iOSPrivateBrowsing = true;
            }
        }

		// If private browsing mode is enabled don't try to
		// use localstorage offline databases
        if (iOSPrivateBrowsing) {
			return initialize();
        }

        APP.database.open(initialize);

        if (storeResources) {
			localStorage.resources = JSON.stringify(resources);
        }
    }

    return {
        start: start
    };
}());