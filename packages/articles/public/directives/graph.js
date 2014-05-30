'use strict';

angular.module('mean').directive('clientGraph', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            scope.$evalAsync(function () {
                $(element).peity('line', {
                    height: 70,
                    width: 160
                });
            });
        }
    };
});