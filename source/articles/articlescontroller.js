APP.articlesController = (function () {
    'use strict';

    function showArticleList(id, successCallback) {
        APP.article.selectBasicArticles(function (articles) {
            $("#headlines").html(APP.templates.articleList(articles));
        });
    }

    function showArticle(id, successCallback) {
        APP.article.selectFullArticle(id, function (article) {
            $("#body").html(APP.templates.article(article));
        });
    }

    function synchronizeWithServer(failureCallback) {
        $.ajax({
            dataType: 'json',
            url: '/api/articles',
            success: function (articles) {
                APP.article.deleteArticles(function () {
                    APP.article.insertArticles(articles, function () {
                        /*
                         * Instead of the line below we *could* just run showArticeList() but since
                         * we already have the articles in scope we needn't make another call to the
                         * database and instead just render the articles straight away.
                         */
                        $("#headlines").html(APP.templates.articleList(articles));
                    });
                });
            },
            type: "GET",
            error: function () {
                if (failureCallback) {
                  failureCallback();
                }
            }
        });
    }

    return {
        synchronizeWithServer: synchronizeWithServer,
        showArticleList: showArticleList,
        showArticle: showArticle
    };
}());