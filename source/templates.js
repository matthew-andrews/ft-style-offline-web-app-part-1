APP.templates = (function () {
    'use strict';

    function application() {
        return '<div id="window"><div id="header"><h1>Guardian Technology News</h1></div><div id="body"></div></div>';
    }

    function home() {
        return '<button id="refreshButton">Refresh the news!</button><div id="headlines"></div></div>';

    }

    function articleList(articles) {
        var i, l, output = '';

        if (!articles.length) {
            return '<p><i>No articles have been found, maybe you haven\'t <b>refreshed the news</b>?</i></p>';
        }
        for (i = 0, l = articles.length; i < l; i = i + 1) {
            output = output + '<li><a href="#' + articles[i].id + '"><b>' + articles[i].headline + '</b><br />By ' + articles[i].author + ' on ' + articles[i].date + '</a></li>';
        }
        return '<ul>' + output + '</ul>';
    }

    function article(articles) {

        // If the data is not in the right form, redirect to an error
        if (!articles[0]) {
            window.location = '#error';
        }
        return '<a href="#">Go back home</a><h2>' + articles[0].headline + '</h2><h3>By ' + articles[0].author + ' on ' + articles[0].date + '</h3>' + articles[0].body;
    }

    function articleLoading() {
        return '<a href="#">Go back home</a><br /><br />Please wait&hellip;';
    }

    return {
        application: application,
        home: home,
        articleList: articleList,
        article: article,
        articleLoading: articleLoading
    };
}());