/* global angular */

(function () {
    'use strict';

    var content = [
        { title: 'Draggable', state: 'draggable', url: '/draggable', controller: 'DraggableController', templateUrl: 'draggable.html' },
        { title: 'Draggable Input', state: 'draggable_input', url: '/draggable_input', controller: 'DraggableInputController', templateUrl: 'draggable_input.html' },
        { title: 'Focused', state: 'focused', url: '/focused', controller: 'FocusedController', templateUrl: 'focused.html' },
        { title: 'Selected', state: 'selected', url: '/selected', controller: 'SelectedController', templateUrl: 'selected.html' },
        { title: 'Infinite Scroll', state: 'infinite_scroll', url: '/infinite_scroll', controller: 'InfiniteScrollController', templateUrl: 'infinite_scroll.html' },
        { title: 'Unsaved changes', state: 'unsaved_changes', url: '/unsaved_changes', controller: 'UnsavedChangesController', templateUrl: 'unsaved_changes.html' },
        { title: 'Fab\'s tooltip visibility', state: 'fab_tooltip', url: '/fab_tooltip', controller: 'FabTooltipVisibilityController', templateUrl: 'fab_tooltip_visibility.html' }
    ];

    var thisModule = angular.module('appBasicBehaviors', 
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate', 
			'pipCore', 'appBasicBehaviors.FabTooltipVisibility',
            'appBasicBehaviors.Draggable', 'appBasicBehaviors.Focused', 'appBasicBehaviors.UnsavedChanges',
            'appBasicBehaviors.Selected', 'appBasicBehaviors.InfiniteScroll', 'appBasicBehaviors.DraggableInput'
        ]
    );

    thisModule.config(function (pipTranslateProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
            $mdIconProvider.iconSet('icons', '../images/icons.svg', 512);
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
            });

            for (var i = 0; i < content.length; i++) {
                var contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise('/date');
        } 
    );

    thisModule.controller('AppController', 
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, $mdTheming, localStorageService) {
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
                pipTranslate.use(language);
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
