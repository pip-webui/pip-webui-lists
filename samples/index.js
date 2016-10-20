/* global angular */

(function () {
    'use strict';

    var content = [
        { title: 'Reference list', state: 'ref_list', url: '/ref_list', controller: 'RefListController', templateUrl: 'ref_list/ref_list.html' },
        { title: 'Reference item', state: 'ref_item', url: '/ref_item', controller: 'RefItemController', templateUrl: 'ref_list/ref_item.html' },
        { title: 'Check list', state: 'check_list', url: '/check_list', controller: 'CheckListController', templateUrl: 'check_list/check_list.html' },
        { title: 'Simple list', state: 'simple_list', url: '/simple_list', controller: 'SimpleListController', templateUrl: 'simple_list/simple_list.html' },
        { title: 'Chips', state: 'chips', url: '/chips', controller: 'ChipsController', templateUrl: 'chips/chips.html' },
        { title: 'Dividers', state: 'dividers', url: '/dividers', controller: 'DividersController', templateUrl: 'dividers/dividers.html' },
        { title: 'Focused', state: 'focused', url: '/focused', controller: 'FocusedController', templateUrl: 'focused/focused.html' },
        { title: 'Selected', state: 'selected', url: '/selected', controller: 'SelectedController', templateUrl: 'selected/selected.html' },
        { title: 'Infinite Scroll', state: 'infinite_scroll', url: '/infinite_scroll', controller: 'InfiniteScrollController', templateUrl: 'infinite_scroll/infinite_scroll.html' },
        { title: 'Table', state: 'table', url: '/table', controller: 'TableController', templateUrl: 'table/table.html' },
        { title: 'Tag list', state: 'tag_list', url: '/tag_list', controller: 'TagsController', templateUrl: 'tag_list/tags_list.html' }

        //{ title: 'Unsaved changes', state: 'unsaved_changes', url: '/unsaved_changes', controller: 'UnsavedChangesController', templateUrl: 'unsaved_changes.html' },
        //{ title: 'Fab\'s tooltip visibility', state: 'fab_tooltip', url: '/fab_tooltip', controller: 'FabTooltipVisibilityController', templateUrl: 'fab_tooltip_visibility.html' }
    ];

    var thisModule = angular.module('appLists',
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            'pipLists.Templates', 'pipLists',
			
            'appLists.Focused',
            'appLists.Selected', 'appLists.InfiniteScroll', 
            'appLists.RefList',  'appLists.CheckList',
            'appLists.Chips', 'appLists.RefItem',
            'appLists.Dividers',
            'appLists.Table',
            'appLists.SimpleList',
            'appLists.Tags'
        ]
    );

    thisModule.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
            $mdIconProvider.iconSet('icons', '../../lib/images/icons.svg', 512);
        //pipTranslateProvider, 
//             $mdThemingProvider.theme('blue')
//                 .primaryPalette('blue')
//                 .accentPalette('green');
// 
//             $mdThemingProvider.theme('pink')
//                 .primaryPalette('pink')
//                 .accentPalette('orange');
// 
//             $mdThemingProvider.theme('green')
//                 .primaryPalette('green')
//                 .accentPalette('purple');
// 
//             $mdThemingProvider.theme('grey')
//                 .primaryPalette('grey')
//                 .accentPalette('yellow');
// 
//             $mdThemingProvider.setDefaultTheme('blue');

        /*
            // String translations
            pipTranslateProvider.translations('en', {
                'APPLICATION_TITLE': 'WebUI Sampler',

                'blue': 'Blue Theme',
                'green': 'Green Theme',
                'pink': 'Pink Theme',
                'grey': 'Grey Theme'
            });

            pipTranslateProvider.translations('ru', {
                'APPLICATION_TITLE': 'WebUI Демонстратор',

                'blue': 'Голубая тема',
                'green': 'Зеленая тема',
                'pink': 'Розовая тема',
                'grey': 'Серая тема'
            });*/

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
