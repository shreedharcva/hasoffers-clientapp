angular.module('mean').directive('clientGraph', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.peity('line', {
                height: 60,
                width: 150,
                strokeWidth: 3
            });
        }
    };
});