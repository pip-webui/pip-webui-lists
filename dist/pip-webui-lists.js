/**
 * @file Registration of all WebUI list controls
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipLists', [
        'pipFocused',
        'pipSelected',
        'pipInfiniteScroll',
	'pipTagList'
    ]);
    
})();
/**
 * @file Keyboard navigation over few focusable controls
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipFocused", []);

    thisModule.directive('pipFocused', ['$timeout', '$mdConstant', function($timeout, $mdConstant) {
        return {
            require: "?ngModel",
            link: function ($scope, $element, $attrs) {
                var controls, controlsLength,
                    withHidden = $attrs.pipWithHidden;

                $timeout(init);
                $element.on('keydown', keydownListener);

                $scope.$watch($attrs.ngModel, function () {
                    $timeout(init);
                }, true);

                function init() {
                    var selector = withHidden ? '.pip-focusable' : '.pip-focusable:visible';
                    controls = $element.find(selector);
                    controlsLength = controls.length;

                    // add needed event listeners
                    controls.on('focus', function () {
                        $element.addClass('pip-focused-container');
                        $(this).addClass('md-focused');
                    }).on('focusout', function () {
                        $element.removeClass('pip-focused-container');
                    });
                }

                function keydownListener(e) {
                    var keyCode = e.which || e.keyCode;

                    // Check control keyCode
                    if (keyCode == $mdConstant.KEY_CODE.LEFT_ARROW ||
                        keyCode == $mdConstant.KEY_CODE.UP_ARROW ||
                        keyCode == $mdConstant.KEY_CODE.RIGHT_ARROW ||
                        keyCode == $mdConstant.KEY_CODE.DOWN_ARROW) {

                        e.preventDefault();

                        var 
                            increment = (keyCode == $mdConstant.KEY_CODE.RIGHT_ARROW || keyCode == $mdConstant.KEY_CODE.DOWN_ARROW) ? 1 : -1,
                            moveToControl = controls.index(controls.filter(".md-focused")) + increment;

                        // Move focus to next control
                        if (moveToControl >= 0 && moveToControl < controlsLength) {
                            controls[moveToControl].focus();
                        }
                    }
                }
            }
        };
    }]);

})();


/**
 * @file Infinite scrolling behavior
 * @description
 * Modified from https://github.com/sroze/ngInfiniteScroll
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipInfiniteScroll", []);

    thisModule.directive('pipInfiniteScroll', 
        ['$rootScope', '$window', '$interval', '$parse', function($rootScope, $window, $interval, $parse) {
            var THROTTLE_MILLISECONDS = 500;

            return {
                scope: {
                    pipInfiniteScroll: '&',
                    pipScrollContainer: '=',
                    pipScrollDistance: '=',
                    pipScrollDisabled: '=',
                    pipScrollUseDocumentBottom: '=',
                    pipScrollListenForEvent: '@'
                },
                link: function($scope, $element, $attrs) {
                    var 
                        checkWhenEnabled = null,
                        scrollContainer,
                        immediateCheck = true,
                        scrollDistance = null,
                        scrollEnabled = null, 
                        unregisterEventListener = null,
                        useDocumentBottom = false, 
                        windowElement = angular.element($window);
                    
                    function height(element) {
                        element = element[0] || element;
                        if (isNaN(element.offsetHeight)) {
                            return element.document.documentElement.clientHeight;
                        } else {
                            return element.offsetHeight;
                        }
                    };

                    function offsetTop(element) {
                        if (!element[0].getBoundingClientRect || element.css('none')) {
                            return;
                        }
                        return element[0].getBoundingClientRect().top + pageYOffset(element);
                    };

                    function pageYOffset(element) {
                        element = element[0] || element;
                        if (isNaN(window.pageYOffset)) {
                            return element.document.documentElement.scrollTop;
                        } else {
                            return element.ownerDocument.defaultView.pageYOffset;
                        }
                    };

                    var onContainerScroll = function() {
                        var 
                            containerBottom, 
                            containerTopOffset, 
                            elementBottom, 
                            remaining, 
                            shouldScroll;
                                                
                        if (scrollContainer === windowElement) {
                            containerBottom = height(scrollContainer) + pageYOffset(scrollContainer[0].document.documentElement);
                            elementBottom = offsetTop($element) + height($element);
                        } else {
                            containerBottom = height(scrollContainer);
                            containerTopOffset = 0;
                            if (offsetTop(scrollContainer) !== void 0) {
                                containerTopOffset = offsetTop(scrollContainer);
                            }
                            elementBottom = offsetTop($element) - containerTopOffset + height($element);
                        }

                        if (useDocumentBottom) {
                            elementBottom = height(($element[0].ownerDocument || $element[0].document).documentElement);
                        }

                        remaining = elementBottom - containerBottom;
                        shouldScroll = remaining <= height(scrollContainer) * scrollDistance + 1;
                        
                        if (shouldScroll) {
                            checkWhenEnabled = true;
                            if (scrollEnabled) {
                                if ($scope.$$phase || $rootScope.$$phase) {
                                    return $scope.pipInfiniteScroll();
                                } else {
                                    return $scope.$apply($scope.pipInfiniteScroll);
                                }
                            }
                        } else {
                            return checkWhenEnabled = false;
                        }
                    };

                    if (THROTTLE_MILLISECONDS != null) {
                        onContainerScroll = _.throttle(onContainerScroll, THROTTLE_MILLISECONDS);                    
                    }

                    $scope.$on('$destroy', function() {
                        scrollContainer.unbind('scroll', onContainerScroll);
                        if (unregisterEventListener != null) {
                            unregisterEventListener();
                            return unregisterEventListener = null;
                        }
                    });

                    function handleScrollDistance(v) {
                        return scrollDistance = parseFloat(v) || 0;
                    };
                    $scope.$watch('pipScrollDistance', handleScrollDistance);
                    handleScrollDistance($scope.pipScrollDistance);
                    
                    function handleScrollDisabled(v) {
                        scrollEnabled = !v;
                        if (scrollEnabled && checkWhenEnabled) {
                            checkWhenEnabled = false;
                            return onContainerScroll();
                        }
                    };
                    $scope.$watch('pipScrollDisabled', handleScrollDisabled);
                    handleScrollDisabled($scope.pipScrollDisabled);

                    function handleScrollUseDocumentBottom(v) {
                        return useDocumentBottom = v;
                    };
                    $scope.$watch('pipScrollUseDocumentBottom', handleScrollUseDocumentBottom);
                    handleScrollUseDocumentBottom($scope.pipScrollUseDocumentBottom);

                    function changeContainer(newContainer) {
                        if (scrollContainer != null) {
                            scrollContainer.unbind('scroll', onContainerScroll);
                        }

                        scrollContainer = newContainer;
                        if (newContainer != null) {
                            return scrollContainer.bind('scroll', onContainerScroll);
                        }
                    };

                    changeContainer(windowElement);
                    if ($scope.pipScrollListenForEvent) {
                        unregisterEventListener = $rootScope.$on($scope.pipScrollListenForEvent, onContainerScroll);
                    }

                    function handleScrollContainer(newContainer) {
                        if ((newContainer == null) || newContainer.length === 0) {
                            return;
                        }
                        if (newContainer instanceof HTMLElement) {
                            newContainer = angular.element(newContainer);
                        } else if (typeof newContainer.append === 'function') {
                            newContainer = angular.element(newContainer[newContainer.length - 1]);
                        } else if (typeof newContainer === 'string') {
                            newContainer = $element.parents().find(newContainer);
                        }

                        if (newContainer != null && (!Array.isArray(newContainer) ||
                            (Array.isArray(newContainer) && newContainer.length > 0))) {
                            return changeContainer(newContainer);
                        } else {
                            throw new Error("Invalid pip-scroll-container attribute.");
                        }
                    };
                    $scope.$watch('pipScrollContainer', function (newContainer) {
                        if (newContainer !== scrollContainer)
                            handleScrollContainer(newContainer);
                    });
                    handleScrollContainer($scope.pipScrollContainer || []);
                    
                    if ($attrs.pipScrollParent != null) {
                        changeContainer(angular.element($element.parent()));
                    }
                    if ($attrs.pipScrolImmediateCheck != null) {
                        immediateCheck = $scope.$eval($attrs.pipScrolImmediateCheck);
                    }
                    
                    return $interval((function() {
                        if (immediateCheck) {
                            return onContainerScroll();
                        }
                    }), 0, 1);
                }
            }
        }]
    );

})();


/**
 * @file Keyboard navigation with scrolling over non-focusable controls
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipSelected", ['pipUtils']);

    thisModule.directive('pipSelected',['$parse', 'pipUtils', '$mdConstant', '$timeout', function ($parse, pipUtils, $mdConstant, $timeout) {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope, $element, $attrs) {
                var
                    indexGetter = $attrs.pipSelected ? $parse($attrs.pipSelected) : null,
                    indexSetter = indexGetter ? indexGetter.assign : null,
                    idGetter = $attrs.pipSelectedId ? $parse($attrs.pipSelectedId) : null,
                    idSetter = idGetter ? idGetter.assign : null,
                    changeGetter = $attrs.pipSelect ? $parse($attrs.pipSelect) : null,
                    enterSpaceGetter = $attrs.pipEnterSpacePress ? $parse($attrs.pipEnterSpacePress) : null,
                    noScroll = pipUtils.toBoolean($attrs.pipNoScroll),
                    modifier = pipUtils.toBoolean($attrs.pipSkipHidden) ? ':visible' : '',
                    className = pipUtils.toBoolean($attrs.pipTreeList) ? '.pip-selectable-tree' : '.pip-selectable',
                    selectedIndex = indexGetter($scope),
                    currentElementTabinex = $element.attr('tabindex'),
                    pipSelectedWatch = $attrs.pipSelectedWatch;

                // Set tabindex if it's not set yet
                $element.attr('tabindex', currentElementTabinex || 0);

                // Watch selected item index
                if (!pipUtils.toBoolean($attrs.pipTreeList)) {
                    $scope.$watch(indexGetter, function(newSelectedIndex) {
                        selectItem({itemIndex: newSelectedIndex});
                    });
                } else {
                    $scope.$watch(idGetter, function(newSelectedId) {
                        setTimeout(function () {
                            selectItem({itemId: newSelectedId, raiseEvent: true});
                        }, 0);
                    });
                }

                // Watch resync selection
                if (pipSelectedWatch) {
                    $scope.$watch(pipSelectedWatch, function() {
                        // Delay update to allow ng-repeat to update DOM
                        setTimeout(function() {
                            selectedIndex = indexGetter($scope);
                            selectItem({itemIndex: selectedIndex});
                        }, 100);
                    });
                }

                // Select item defined by index
                selectItem({itemIndex: selectedIndex, items: $element.find(className)});

                // Functions and listeners

                function selectItem(itemParams) {
                    var itemIndex = itemParams.itemIndex,
                        itemId = itemParams.itemId,
                        items = itemParams.items || $element.find(className + modifier),
                        itemsLength = items.length,
                        item = (function () {
                            if (itemParams.item) return itemParams.item;
                            if (itemIndex === undefined && itemIndex === -1) {
                                itemIndex = items.index(items.filter('[pip-id=' + itemId + ']'));
                            }
                            if (itemIndex >= 0 && itemIndex < itemsLength) {
                                return items[itemIndex]
                            }
                        }()),
                        raiseEvent = itemParams.raiseEvent;

                    if (item) {
                        $element.find(className).removeClass('selected md-focused');
                        item = angular.element(item)
                            .addClass('selected md-focused')
                            .focus(); // todo сдвигает список тут, на первом проходе
                        if (!noScroll) scrollToItem(item);
                        if (raiseEvent) defineSelectedIndex(items);
                    }
                };

                function defineSelectedIndex(items) {
                    var oldSelectedIndex = selectedIndex;
                    selectedIndex = -1;
                    for (var index = 0; index < items.length; index++) {
                        if ($(items[index]).hasClass('selected')) {
                            selectedIndex = index;

                            break;
                        }
                    }

                    // Execute callback to notify about item select
                    if (oldSelectedIndex != selectedIndex && selectedIndex !== -1) {
                        $scope.$apply(updateIndex);
                    }

                    function updateIndex() {
                        var selectedItem = angular.element(items[selectedIndex]),
                            selectedId = selectedItem.attr('pip-id');

                        if (indexSetter) indexSetter($scope, selectedIndex);
                        if (idSetter) idSetter($scope, selectedId);
                        if (changeGetter) {
                            changeGetter($scope, {
                                $event: {
                                    target: $element,
                                    item: selectedItem,
                                    index: selectedIndex,
                                    id: selectedId,
                                    newIndex: selectedIndex,
                                    oldIndex: oldSelectedIndex
                                }
                            });
                        }
                    };
                };

                function scrollToItem($item) {
                    if (noScroll) return;

                    var
                        containerTop = $element.offset().top,
                        containerHeight = $element.height(),
                        containerBottom = containerTop + containerHeight,
                        itemTop = $item.offset().top,
                        itemHeight = $item.outerHeight(true),
                        itemBottom = itemTop + itemHeight,
                        containerScrollTop = $element.scrollTop();

                    if (containerTop > itemTop) {
                        $element.scrollTop(containerScrollTop + itemTop - containerTop);
                    }
                    else if (containerBottom < itemBottom) {
                        $element.scrollTop(containerScrollTop + itemBottom - containerBottom);
                    }

                };

                $element.on('click touchstart', className, function (event) {
                    selectItem({item: event.currentTarget, raiseEvent: true});
                });

                $element.on('keydown', function (e) {
                    var keyCode = e.which || e.keyCode;

                    // Check control keyCode
                    if (keyCode == $mdConstant.KEY_CODE.ENTER || keyCode == $mdConstant.KEY_CODE.SPACE) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (enterSpaceGetter) {
                            enterSpaceGetter($scope, {
                                $event: {
                                    target: $element,
                                    index: selectedIndex,
                                    item: $element.find('.selected')
                                }
                            });
                        }

                    } else
                    if (keyCode == $mdConstant.KEY_CODE.LEFT_ARROW || keyCode == $mdConstant.KEY_CODE.RIGHT_ARROW ||
                        keyCode == $mdConstant.KEY_CODE.UP_ARROW || keyCode == $mdConstant.KEY_CODE.DOWN_ARROW) {

                        e.preventDefault();
                        e.stopPropagation();

                        // Get next selectable control index
                        var items = $element.find(className + modifier),
                            inc = (keyCode == $mdConstant.KEY_CODE.RIGHT_ARROW || keyCode == $mdConstant.KEY_CODE.DOWN_ARROW) ? 1 : -1,
                            newSelectedIndex = selectedIndex + inc;

                        // Set next control as selected
                        selectItem({itemIndex: newSelectedIndex, items: items, raiseEvent: true});
                    }
                });

                $element.on('focusin', function (event) {
                    // Choose selected element
                    var items,
                        selectedItem = $element.find(className + '.selected');

                    selectedItem.addClass('md-focused');

                    // If there are not selected elements then pick the first one
                    if (selectedItem.length === 0) {
                        selectedIndex = indexGetter($scope);
                        items = $element.find(className + modifier);
                        selectItem({itemIndex: selectedIndex || 0, items: items, raiseEvent: true});
                    }
                });

                $element.on('focusout', function (event) {
                    $element.find(className + '.md-focused' + modifier).removeClass('md-focused');
                });
            }
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

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipTagList', []);

    /**
     * pipTags - set of tags
     * pipType - additional type tag
     * pipTypeLocal - additional translated type tag
     */
    thisModule.directive('pipTagList',
        ['$parse', function ($parse) {
            return {
                restrict: 'EA',
                scope: {
                    pipTags: '=',
                    pipType: '=',
                    pipTypeLocal: '='
                },
                templateUrl: 'tags/tag_list.html',
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    var tagsGetter;

                    tagsGetter = $parse($attrs.pipTags);
                    $element.css('display', 'block');
                    // Set tags
                    $scope.tags = tagsGetter($scope);

                    function toBoolean(value) {
                        if (value == null) return false;
                        if (!value) return false;
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
        }]
    );

})(window.angular);

//# sourceMappingURL=pip-webui-lists.js.map
