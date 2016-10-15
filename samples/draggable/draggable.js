/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appBasicBehaviors.Draggable', []);

    thisModule.controller('DraggableController',
        function($scope) {
            $scope.centerAnchor = true;

            $scope.toggleCenterAnchor = function () {
                $scope.centerAnchor = !$scope.centerAnchor;
            };

            $scope.draggableObjects = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];
            $scope.droppedObjects1 = [];
            $scope.droppedObjects2 = [];

            $scope.content = [
                {
                    file_id: "1",
                    color: {'background-color':'#00ff00'},
                    file_name: 'name1'
                },
                {
                    file_id: "2",
                    color: {'background-color':'#ff0000'},
                    file_name: 'name2'
                },
                {
                    file_id: "3",
                    color: {'background-color':'#0000ff'},
                    file_name: 'name3'
                },
                {
                    file_id: "4",
                    color: {'background-color':'#55ff55'},
                    file_name: 'name4'
                },
                {
                    file_id: "5",
                    color: {'background-color':'#0055cc'},
                    file_name: 'name5'
                },
                {
                    file_id: "6",
                    color: {'background-color':'#cc2299'},
                    file_name: 'name6'
                },
                {
                    file_id: "7",
                    color: {'background-color':'#aaaa22'},
                    file_name: 'name7'
                },
                {
                    file_id: "8",
                    color: {'background-color':'#008888'},
                    file_name: 'name8'
                }
            ];

            $scope.onDropComplete = function (index, data, evt) {
                var otherObj = $scope.content[index];
                var otherIndex = $scope.content.indexOf(data);
                $scope.content[index] = data;
                $scope.content[otherIndex] = otherObj;
            };

            $scope.onDropComplete1 = function (data, event) {
                var index = $scope.droppedObjects1.indexOf(data);
                if (index == -1)
                    $scope.droppedObjects1.push(data);
            };

            $scope.onDragSuccess1 = function (data, event) {
                var index = $scope.droppedObjects1.indexOf(data);
                if (index > -1) {
                    $scope.droppedObjects1.splice(index, 1);
                }
            };

            $scope.onDragSuccess2 = function (data, event) {
                var index = $scope.droppedObjects2.indexOf(data);
                if (index > -1) {
                    $scope.droppedObjects2.splice(index, 1);
                }
            };

            $scope.onDropComplete2 = function (data, event) {
                var index = $scope.droppedObjects2.indexOf(data);
                if (index == -1) {
                    $scope.droppedObjects2.push(data);
                }
            };
        }
    );

})();
