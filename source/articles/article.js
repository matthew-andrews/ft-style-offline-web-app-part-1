APP.article = (function () {
    'use strict';

    function deleteArticles(successCallback) {
        APP.database.runQuery("DELETE FROM articles", [], successCallback);
    }

    function insertArticles(articles, successCallback) {
        var remaining = articles.length, i, l, data = [];

        if (remaining === 0) {
            successCallback();
        }

        // Convert article array of objects to array of arrays
        for (i = 0, l = articles.length; i < l; i = i + 1) {
            data[i] = [articles[i].id, articles[i].date, articles[i].headline, articles[i].author, articles[i].body];
        }

        APP.database.runQuery("INSERT INTO articles (id, date, headline, author, body) VALUES (?, ?, ?, ?, ?);", data, successCallback);
    }

    function selectBasicArticles(successCallback) {
        APP.database.runQuery("SELECT id, headline, date, author FROM articles", [], successCallback);
    }

    function selectFullArticle(id, successCallback) {
        APP.database.runQuery("SELECT id, headline, date, author, body FROM articles WHERE id = ?", [id], successCallback);
    }

    return {
        insertArticles: insertArticles,
        selectBasicArticles: selectBasicArticles,
        selectFullArticle: selectFullArticle,
        deleteArticles: deleteArticles
    };
}());