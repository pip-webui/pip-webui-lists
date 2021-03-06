﻿/* global angular */

(function () {
    'use strict';

    var content = [
        { title: 'Grouped Grid', state: 'grouped_grid', url: '/grouped_grid', controller: 'GroupedGridController', templateUrl: 'grouped_grid/grouped_grid.html' },
        { title: 'Reference list', state: 'ref_list', url: '/ref_list', controller: 'RefListController', templateUrl: 'ref_list/ref_list.html' },
        { title: 'Reference item', state: 'ref_item', url: '/ref_item', controller: 'RefItemController', templateUrl: 'ref_list/ref_item.html' },
        { title: 'Check list', state: 'check_list', url: '/check_list', controller: 'CheckListController', templateUrl: 'check_list/check_list.html' },
        { title: 'Simple list', state: 'simple_list', url: '/simple_list', controller: 'SimpleListController', templateUrl: 'simple_list/simple_list.html' },
        { title: 'Chips', state: 'chips', url: '/chips', controller: 'ChipsController', templateUrl: 'chips/chips.html' },
        { title: 'Table', state: 'table', url: '/table', controller: 'TableController', templateUrl: 'table/table.html' },
        { title: 'Tag list', state: 'tag_list', url: '/tag_list', controller: 'TagsController', templateUrl: 'tag_list/tags_list.html' }
    ];

    var thisModule = angular.module('appLists',
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 
            // 'angularFileUpload', 'ngAnimate',
            
            'pipLists.Templates', 'pipLists',
			
            'appLists.RefList',  'appLists.CheckList',
            'appLists.Chips', 'appLists.RefItem',
            'appLists.Table',
            'appLists.SimpleList',
            'appLists.Tags',
            'appLists.GroupedGrid'
        ]
    );

    thisModule.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
            $mdIconProvider.iconSet('icons', '../../lib/images/icons.svg', 512);

            for (var i = 0; i < content.length; i++) {
                var contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise('/ref_list');
        } 
    );

    thisModule.controller('AppController', 
        function ($scope, $rootScope, $state, $mdSidenav, $mdTheming, localStorageService) {
            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            $rootScope.$theme = localStorageService.get('theme');

            $scope.selected = {
                theme: 'blue',
                tab: 0  
            };

            $scope.content = content;
            $scope.menuOpened = false;

            $scope.onLanguageClick = function(language) {
               // pipTranslate.use(language);
            };

            // Update page after language changed
            $rootScope.$on('languageChanged', function(event) {
                console.log('Reloading...');
                console.log($state.current);
                console.log($state.params);

                $state.reload();
            });

            // Update page after theme changed
            $rootScope.$on('themeChanged', function(event) {
                $state.reload();
            });
                        
            $scope.onSwitchPage = function(state) {
                $mdSidenav('left').close();
                $state.go(state);
            };
            
            $scope.onToggleMenu = function() {
                $mdSidenav('left').toggle();
            };
                        
            $scope.isActiveState = function(state) {
                return $state.current.name == state;  
            };
        }
    );

})();
