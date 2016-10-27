/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appLists.GroupedGrid', []);

    thisModule.controller('GroupedGridController',
        function($scope) {
            //...

            $scope.navCollection = [
                'Nav1',
                'Nav2',
                'Nav3'
            ];
        }
    );

})();
