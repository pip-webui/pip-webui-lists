/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appBasicBehaviors.DraggableInput', []);

    thisModule.controller('DraggableInputController',
        function($scope) {

            $scope.content = [
                {
                    file_id: "1",
                    color: {'background-color':'#0055cc'},
                    file_name: 'name1',
                    checked: false
                },
                {
                    file_id: "2",
                    color: {'background-color':'#aaaa22'},
                    file_name: 'name2',
                    checked: false
                },
                {
                    file_id: "3",
                    color: {'background-color':'#0055cc'},
                    file_name: 'name3',
                    checked: false
                },
                {
                    file_id: "4",
                    color: {'background-color':'#aaaa22'},
                    file_name: 'name4',
                    checked: false
                },
                {
                    file_id: "5",
                    color: {'background-color':'#0055cc'},
                    file_name: 'name5',
                    checked: false
                },
                {
                    file_id: "6",
                    color: {'background-color':'#aaaa22'},
                    file_name: 'name6',

                },
                {
                    file_id: "7",
                    color: {'background-color':'#0055cc'},
                    file_name: 'name7',

                },
                {
                    file_id: "8",
                    color: {'background-color':'#aaaa22'},
                    file_name: 'name8',
                    checked: false
                }
            ];

            $scope.onDropComplete = function (index, data, evt) {
                var otherObj = $scope.content[index];
                var otherIndex = $scope.content.indexOf(data);
                $scope.content[index] = data;
                $scope.content[otherIndex] = otherObj;
            };
        }
    );

})();
