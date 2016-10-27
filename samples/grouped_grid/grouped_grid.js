/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appLists.GroupedGrid', []);

    thisModule.controller('GroupedGridController',
        function ($scope) {
            //...

            $scope.adapters = [
                {
                    name: 'adapter name group',
                    services: [
                        {
                            name: 'name1',
                            color: 13
                        },
                        {
                            name: 'name2',
                            color: 8
                        },
                        {
                            name: 'name3',
                            color: 8
                        },
                    ]
                },
                {
                    name: 'adapter name group2',
                    services: [
                        {
                            name: 'name1',
                            color: 13
                        },
                        {
                            name: 'name2',
                            color: 8
                        },
                        {
                            name: 'name3',
                            color: 8
                        },
                    ]
                }, {
                    name: 'group3',
                    services: [
                        {
                            name: 'name1',
                            color: 13
                        }
                    ]
                }, {
                    name: 'adapter name group4',
                    services: [
                        {
                            name: 'name1',
                            color: 13
                        },
                        {
                            name: 'name2',
                            color: 8
                        },
                        {
                            name: 'name3',
                            color: 8
                        },
                    ]
                }
            ]
        }
    );

})();
