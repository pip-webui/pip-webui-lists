/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appBasicBehaviors.Selected', []);

    thisModule.controller('SelectedController',
        function($scope) {
            $scope.items = [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' },
                { id: 4, name: 'Item 4' },
                { id: 5, name: 'Item 5' },
                { id: 6, name: 'Item 6' },
                { id: 7, name: 'Item 7' },
                { id: 8, name: 'Item 8' },
                { id: 9, name: 'Item 9' },
                { id: 10, name: 'Item 10' },
            ];
    
            $scope.sel = {
                itemIndex: 0,
                item: $scope.items[0]
            };
    
            $scope.onItemSelect = function(event) {
                console.log('Selected item #' + event.index);
                $scope.sel.item = $scope.items[$scope.sel.itemIndex];
            };

            $scope.onEnterSpacePress = function ($event) {
                console.log('enter or space pressed', $event);
            };
    
            $scope.onItemDelete = function(event) {
                if ($scope.sel.itemIndex >= 0)
                    $scope.items.splice($scope.sel.itemIndex, 1);
                $scope.sel.itemIndex = Math.min(Math.max(0, $scope.sel.itemIndex), $scope.items.length - 1);
                $scope.sel.item = $scope.items[$scope.sel.itemIndex];
            };
    
            $scope.onMoveToStart = function() {
                $scope.sel.itemIndex = 0;
                $scope.sel.item = $scope.items[$scope.sel.itemIndex];
            };
        }
    );

})();
