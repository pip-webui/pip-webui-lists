(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).lists = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipList.Translate', []);
    thisModule.filter('translate', ['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }]);
})();

},{}],2:[function(require,module,exports){
(function () {
    'use strict';
    angular.module('pipLists', [
        'pipTagList'
    ]);
})();

},{}],3:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipTagList', ['pipList.Translate']);
    thisModule.directive('pipTagList', ['$parse', function ($parse) {
        return {
            restrict: 'EA',
            scope: {
                pipTags: '=',
                pipType: '=',
                pipTypeLocal: '='
            },
            templateUrl: 'tag_list/tag_list.html',
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var tagsGetter;
                tagsGetter = $parse($attrs.pipTags);
                $element.css('display', 'block');
                $scope.tags = tagsGetter($scope);
                function toBoolean(value) {
                    if (value == null)
                        return false;
                    if (!value)
                        return false;
                    value = value.toString().toLowerCase();
                    return value == '1' || value == 'true';
                }
                if (toBoolean($attrs.pipRebind)) {
                    $scope.$watch(tagsGetter, function () {
                        $scope.tags = tagsGetter($scope);
                    });
                }
                $element.addClass('pip-tag-list');
            }]
        };
    }]);
})();

},{}],4:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipLists.Templates');
} catch (e) {
  module = angular.module('pipLists.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tag_list/tag_list.html',
    '<div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + pipType + \'-chips\'}}" ng-if="pipType && !pipTypeLocal"><span>{{pipType.toUpperCase() | translate | uppercase}}</span></div><div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + pipType + \'-chips\'}}" ng-if="pipType && pipTypeLocal"><span>{{pipTypeLocal.toUpperCase() | translate | uppercase}}</span></div><div class="pip-chip rm4" ng-repeat="tag in pipTags"><span>{{::tag}}</span></div>');
}]);
})();



},{}]},{},[4,1,2,3])(4)
});

//# sourceMappingURL=pip-webui-lists.js.map
