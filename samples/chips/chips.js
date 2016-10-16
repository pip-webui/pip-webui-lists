/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appComponentsStyles.Chips', []);

    thisModule.controller('ChipsController',
        function($scope) {
            $scope.rec_parties = [
                {
                    "party_id": "55757a9d4004415c6feea8d8",
                    "party_name": "Test3 PipLife",
                    "deleted": false,
                    "viewed": true,
                    "id": "55bba68b8b5361ef38e4da02"
                }, {
                    "party_id": "558aec962d65689163b2808e",
                    "party_name": "Test Presentation PipLife",
                    "deleted": false,
                    "viewed": true,
                    "id": "55bba68b8b5361ef38e4da01"
                }
            ];
            $scope.tags = ["tag1", "tag2", "tag3", "tag4", "tag5"];
            $scope.pipTypeLocal = "type";
        }
    );

})();
