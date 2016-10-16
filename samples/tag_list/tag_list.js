(function (angular) {
    'use strict';

    var thisModule = angular.module('appControls.Tags', []);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            TYPE_TAG: 'Type tag',
            SIMPLE_TAG_LIST: 'Simple tag list',
            TAGS_LIST_WITH_TYPE: 'Tag list with entity type'
        });
        pipTranslateProvider.translations('ru', {
            TYPE_TAG: '??? ????',
            SIMPLE_TAG_LIST: '??????? ?????? ?????',
            TAGS_LIST_WITH_TYPE: '?????? ????? ? ?????'
        });
    });

    thisModule.controller('TagsController',
        function ($scope, pipTranslate, pipAppBar, $timeout) {

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });
            
            pipAppBar.hideShadow();
            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.showTitleText('CONTROLS');
            
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
            $scope.example3.typeLocal = pipTranslate.translate($scope.example3.type);
        }
    );

})(window.angular);