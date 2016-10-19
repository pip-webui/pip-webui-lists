(function (angular) {
    'use strict';

    var thisModule = angular.module('appLists.Tags', ['pipTagList', 'pipLists.Templates']);
    
    thisModule.controller('TagsController',
        function ($scope, $timeout) {

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });
            
            $scope.example1 = {};
            $scope.example2 = {};
            $scope.example3 = {};

            $scope.example1.tags = ['TBD', 'Modular', 'Defect', 'A', 'Very Very Very Very Long Tag', 'Tag 2', 'Tag 4'];

            $scope.example2.tags = ['onw', 'two', 'six', 'seven'];
            $scope.example2.type = 'goal';

            $scope.example3.tags = [
                'Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7',
                'Tag 8', 'Tag 9', 'Tag 10', 'Tag 11', 'Tag 12', 'Tag 13', 'Tag 14',
                'Tag 15', 'Tag 16', 'Tag 17', 'Tag 18', 'Tag 19', 'Tag 20', 'Tag 21',
                'Tag 22', 'Tag 23', 'Tag 24', 'Tag 25', 'Tag 26', 'Tag 27', 'Tag 28'
            ];
            $scope.example3.type = 'goal';
            $scope.example3.typeLocal = $scope.example3.type;
        }
    );

})(window.angular);