'use strict';

angular.module('mean').directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                element.attr('src', attrs.errSrc);
            });
        }
    };
});