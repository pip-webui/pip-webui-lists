(function(module) {
try {
  module = angular.module('pipLists.Templates');
} catch (e) {
  module = angular.module('pipLists.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tag_list/tag_list.html',
    '<div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + pipType + \'-chips\'}}"\n' +
    '     ng-if="pipType && !pipTypeLocal">\n' +
    '\n' +
    '    <span>{{pipType.toUpperCase() | translate | uppercase}}</span>\n' +
    '</div>\n' +
    '<div class="pip-chip rm4 pip-type-chip pip-type-chip-left {{\'bg-\' + pipType + \'-chips\'}}"\n' +
    '     ng-if="pipType && pipTypeLocal">\n' +
    '\n' +
    '    <span>{{pipTypeLocal.toUpperCase() | translate | uppercase}}</span>\n' +
    '</div>\n' +
    '<div class="pip-chip rm4" ng-repeat="tag in pipTags">\n' +
    '    <span>{{::tag}}</span>\n' +
    '</div>');
}]);
})();

/**
 * @file Registration of all WebUI list controls
 * @copyright Digital Living Software Corp. 2014-2016
 */
/* global angular */
(function () {
    'use strict';
    angular.module('pipLists', [
        'pipTagList'
    ]);
})();

/**
 * @file Optional filter to translate string resources
 * @copyright Digital Living Software Corp. 2014-2016
 */
/* global angular */
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

/**
 * @file Tag list control
 * @copyright Digital Living Software Corp. 2014-2015
 * @todo
 * - Improve samples in sampler app
 * - What's pipType and pipTypeLocal? Give better name
 * - Do not use ng-if, instead generate template statically
 */
(function () {
    'use strict';
    var thisModule = angular.module('pipTagList', ['pipList.Translate']);
    /**
     * pipTags - set of tags
     * pipType - additional type tag
     * pipTypeLocal - additional translated type tag
     */
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
                // Set tags
                $scope.tags = tagsGetter($scope);
                function toBoolean(value) {
                    if (value == null)
                        return false;
                    if (!value)
                        return false;
                    value = value.toString().toLowerCase();
                    return value == '1' || value == 'true';
                }
                // Also optimization to avoid watch if it is unnecessary
                if (toBoolean($attrs.pipRebind)) {
                    $scope.$watch(tagsGetter, function () {
                        $scope.tags = tagsGetter($scope);
                    });
                }
                // Add class
                $element.addClass('pip-tag-list');
            }]
        };
    }]);
})();



//# sourceMappingURL=pip-webui-lists.js.map
