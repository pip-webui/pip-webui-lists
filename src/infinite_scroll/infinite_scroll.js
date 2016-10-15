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
        function($rootScope, $window, $interval, $parse) {
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
        }
    );

})();

