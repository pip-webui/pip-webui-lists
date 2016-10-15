/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appBasicBehaviors.InfiniteScroll', []);

    thisModule.config(function(pipTranslateProvider) {

        pipTranslateProvider.translations('en', {
            DESCRIPTION: 'Block with red border is scroll container for infinite-scroll control',
            TRY_TO_SCROLL: 'Try to scroll. You will see the addition of elements.'
        });
        pipTranslateProvider.translations('ru', {
            DESCRIPTION: 'Блок с красной границей является скроллируемым блоком для infinite-scroll контрола',
            TRY_TO_SCROLL: 'Попробуйте проскроллить. Вы увидите добавление элементов.'
        });
    });

    thisModule.controller('InfiniteScrollController',
        function($scope) {
            var 
                itemCount = 0,
                colors = ['red', 'blue', 'yellow', 'green'];

            $scope.generateItems = function (count) {
                console.log('Generating ' + count + ' items');

                for (var i = 0; i < count; i++) {
                    var item = {
                        id: itemCount,
                        name: 'Item ' + itemCount,
                        color: colors[_.random(0, colors.length - 1)]
                    };
                    itemCount++;

                    $scope.items.push(item);
                }
            };


            $scope.items = [];
            $scope.generateItems(20);
        }
    );

})();
