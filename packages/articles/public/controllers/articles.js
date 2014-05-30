'use strict';

angular.module('mean').controller('ArticlesController', ['$scope', '$stateParams', '$location', '$fileUploader', 'Global', 'Articles',
    function($scope, $stateParams, $location, $fileUploader, Global, Articles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
            var article = new Articles({
                name: this.name,
                occupation: this.occupation
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            });

            this.name = '';
            this.occupation = '';
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function(response) {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;
            if (!article.updated) {
                article.updated = [];
            }
            article.updated.push(new Date().getTime());

            article.$update(function() {
                $location.path('articles/' + article._id);
            });
        };

        $scope.find = function() {
            Articles.query(function(articles) {
                $scope.articles = articles;
            });
        };

        $scope.findOne = function() {
            Articles.get({
                articleId: $stateParams.articleId
            }, function(article) {
                $scope.article = article;
            });
        };

        // create a uploader with options
        $scope.uploader = $fileUploader.create({
            scope: $scope,                          // to automatically update the html. Default: $rootScope
            url: 'upload.php',
            formData: [
                { key: 'value' }
            ],
            filters: [
                function (item) {                    // first user filter
                    console.info('filter1');
                    return true;
                }
            ]
        });

    }
]);
