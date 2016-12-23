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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZGVwZW5kZW5jaWVzL3RyYW5zbGF0ZS50cyIsInNyYy9saXN0cy50cyIsInNyYy90YWdfbGlzdC90YWdfbGlzdC50cyIsInRlbXAvcGlwLXdlYnVpLWxpc3RzLWh0bWwubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDT0EsQ0FBQztJQUNHLFlBQVksQ0FBQztJQUViLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFekQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsVUFBVSxTQUFTO1FBQzlDLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO2NBQzFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxVQUFVLEdBQUc7WUFDaEIsTUFBTSxDQUFDLFlBQVksR0FBSSxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDcEUsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsRUFBRSxDQUFDOztBQ2RMLENBQUM7SUFDRyxZQUFZLENBQUM7SUFFYixPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUMxQixZQUFZO0tBQ1osQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUNMTCxDQUFDO0lBQ0csWUFBWSxDQUFDO0lBRWIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFPckUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQzdCLFVBQVUsTUFBTTtRQUNaLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFlBQVksRUFBRSxHQUFHO2FBQ3BCO1lBQ0QsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxVQUFVLEVBQUUsVUFBVSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU07Z0JBQzFDLElBQUksVUFBVSxDQUFDO2dCQUVmLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFakMsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWpDLG1CQUFtQixLQUFLO29CQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxNQUFNLENBQUM7Z0JBQzNDLENBQUM7Z0JBR0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUN0QixNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFHRCxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQyxDQUNKLENBQUM7QUFFTixDQUFDLENBQUMsRUFBRSxDQUFDOztBQzFETDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBAZmlsZSBPcHRpb25hbCBmaWx0ZXIgdG8gdHJhbnNsYXRlIHN0cmluZyByZXNvdXJjZXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcbiBcclxuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIHRoaXNNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwTGlzdC5UcmFuc2xhdGUnLCBbXSk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5maWx0ZXIoJ3RyYW5zbGF0ZScsIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgXHJcbiAgICAgICAgICAgID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGlwVHJhbnNsYXRlICA/IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoa2V5KSB8fCBrZXkgOiBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCLvu78vKipcclxuICogQGZpbGUgUmVnaXN0cmF0aW9uIG9mIGFsbCBXZWJVSSBsaXN0IGNvbnRyb2xzXHJcbiAqIEBjb3B5cmlnaHQgRGlnaXRhbCBMaXZpbmcgU29mdHdhcmUgQ29ycC4gMjAxNC0yMDE2XHJcbiAqL1xyXG5cclxuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3BpcExpc3RzJywgW1xyXG5cdCAgICAncGlwVGFnTGlzdCdcclxuICAgIF0pO1xyXG4gICAgXHJcbn0pKCk7IiwiLyoqXHJcbiAqIEBmaWxlIFRhZyBsaXN0IGNvbnRyb2xcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTVcclxuICogQHRvZG9cclxuICogLSBJbXByb3ZlIHNhbXBsZXMgaW4gc2FtcGxlciBhcHBcclxuICogLSBXaGF0J3MgcGlwVHlwZSBhbmQgcGlwVHlwZUxvY2FsPyBHaXZlIGJldHRlciBuYW1lXHJcbiAqIC0gRG8gbm90IHVzZSBuZy1pZiwgaW5zdGVhZCBnZW5lcmF0ZSB0ZW1wbGF0ZSBzdGF0aWNhbGx5XHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBUYWdMaXN0JywgWydwaXBMaXN0LlRyYW5zbGF0ZSddKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHBpcFRhZ3MgLSBzZXQgb2YgdGFnc1xyXG4gICAgICogcGlwVHlwZSAtIGFkZGl0aW9uYWwgdHlwZSB0YWdcclxuICAgICAqIHBpcFR5cGVMb2NhbCAtIGFkZGl0aW9uYWwgdHJhbnNsYXRlZCB0eXBlIHRhZ1xyXG4gICAgICovXHJcbiAgICB0aGlzTW9kdWxlLmRpcmVjdGl2ZSgncGlwVGFnTGlzdCcsXHJcbiAgICAgICAgZnVuY3Rpb24gKCRwYXJzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXHJcbiAgICAgICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpcFRhZ3M6ICc9JyxcclxuICAgICAgICAgICAgICAgICAgICBwaXBUeXBlOiAnPScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGlwVHlwZUxvY2FsOiAnPSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RhZ19saXN0L3RhZ19saXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdzR2V0dGVyO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YWdzR2V0dGVyID0gJHBhcnNlKCRhdHRycy5waXBUYWdzKTtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGFnc1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50YWdzID0gdGFnc0dldHRlcigkc2NvcGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiB0b0Jvb2xlYW4odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09ICcxJyB8fCB2YWx1ZSA9PSAndHJ1ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbHNvIG9wdGltaXphdGlvbiB0byBhdm9pZCB3YXRjaCBpZiBpdCBpcyB1bm5lY2Vzc2FyeVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b0Jvb2xlYW4oJGF0dHJzLnBpcFJlYmluZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiR3YXRjaCh0YWdzR2V0dGVyLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudGFncyA9IHRhZ3NHZXR0ZXIoJHNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgY2xhc3NcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcygncGlwLXRhZy1saXN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBMaXN0cy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcExpc3RzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGFnX2xpc3QvdGFnX2xpc3QuaHRtbCcsXG4gICAgJzxkaXYgY2xhc3M9XCJwaXAtY2hpcCBybTQgcGlwLXR5cGUtY2hpcCBwaXAtdHlwZS1jaGlwLWxlZnQge3tcXCdiZy1cXCcgKyBwaXBUeXBlICsgXFwnLWNoaXBzXFwnfX1cIiBuZy1pZj1cInBpcFR5cGUgJiYgIXBpcFR5cGVMb2NhbFwiPjxzcGFuPnt7cGlwVHlwZS50b1VwcGVyQ2FzZSgpIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlfX08L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1jaGlwIHJtNCBwaXAtdHlwZS1jaGlwIHBpcC10eXBlLWNoaXAtbGVmdCB7e1xcJ2JnLVxcJyArIHBpcFR5cGUgKyBcXCctY2hpcHNcXCd9fVwiIG5nLWlmPVwicGlwVHlwZSAmJiBwaXBUeXBlTG9jYWxcIj48c3Bhbj57e3BpcFR5cGVMb2NhbC50b1VwcGVyQ2FzZSgpIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlfX08L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1jaGlwIHJtNFwiIG5nLXJlcGVhdD1cInRhZyBpbiBwaXBUYWdzXCI+PHNwYW4+e3s6OnRhZ319PC9zcGFuPjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLWxpc3RzLWh0bWwubWluLmpzLm1hcFxuIl19