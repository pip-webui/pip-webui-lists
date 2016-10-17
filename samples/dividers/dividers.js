/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appLists.Dividers', []);

    thisModule.controller('DividersController',
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
