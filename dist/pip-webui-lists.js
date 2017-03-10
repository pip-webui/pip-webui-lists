(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).lists = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
{
    translate.$inject = ['$injector'];
    function translate($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }
    angular
        .module('pipList.Translate', [])
        .filter('translate', translate);
}

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./dependencies/translate");
angular.module('pipLists', ['pipTagList']);

},{"./dependencies/translate":1}],3:[function(require,module,exports){
{
    var TagListController = (function () {
        function TagListController($scope, $element) {
            $element.css('display', 'block');
            $element.addClass('pip-tag-list');
        }
        TagListController.prototype.toBoolean = function (value) {
            if (_.isNull(value) || _.isUndefined(value))
                return false;
            if (!value)
                return false;
            value = value.toString().toLowerCase();
            return value == '1' || value == 'true';
        };
        TagListController.prototype.$onChanges = function (changes) {
            if (this.rebind && changes.tags) {
                this.tags = changes.tags.currentValue;
            }
        };
        return TagListController;
    }());
    var TagListBindings = {
        tags: '<pipTags',
        type: '<pipType',
        typeLocal: '<pipTypeLocal',
        rebuid: '<pipRebind'
    };
    var TagListChanges = (function () {
        function TagListChanges() {
        }
        return TagListChanges;
    }());
    var TagList = {
        bindings: TagListBindings,
        templateUrl: 'tag_list/tag_list.html',
        controller: TagListController
    };
    angular.module('pipTagList', ['pipList.Translate'])
        .component('pipTagList', TagList);
}

},{}],4:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipLists.Templates');
} catch (e) {
  module = angular.module('pipLists.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tag_list/tag_list.html',
    '<div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + $ctrl.type + \'-chips\'}}" ng-if="$ctrl.type && !$ctrl.typeLocal"><span>{{$ctrl.type.toUpperCase() | translate | uppercase}}</span></div><div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + $ctrl.type + \'-chips\'}}" ng-if="$ctrl.type && $ctrl.typeLocal"><span>{{$ctrl.typeLocal.toUpperCase() | translate | uppercase}}</span></div><div class="pip-chip rm4" ng-repeat="tag in $ctrl.tags"><span>{{::tag}}</span></div>');
}]);
})();



},{}]},{},[4,1,2,3])(4)
});

//# sourceMappingURL=pip-webui-lists.js.map
