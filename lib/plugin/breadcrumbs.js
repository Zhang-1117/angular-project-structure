"use strict"
/*************************************************************************************
 * 面包屑组件
 * ***********************************************************************************
 * require: ui.route
 * ***********************************************************************************
 * usage:
 * <breadcrumbs display-name='data.displayName' front-msg='当前页面'></breadcrumbs>
 *  $stateProvider.
 *       state('home', {
 *           url: '/',
 *          templateUrl: 'core/home.html',
 *           data: {
 *              displayName: '首页'
 *          }
 *      }).
 *      state('home.huodong', {
 *          url: 'huodong',
 *          templateUrl: 'core/home.html',
 *          data: {
 *              displayName: '活动'
 *          }
 *      });
 *************************************************************************************/
angular.module('yo.breadcrumbs', [])
    .directive('breadcrumbs', function($state) {
        return {
            restrict: 'E',
            template: '<ol class="breadcrumb">' +
                '<li><span>{{ frontMsg }}：</span></li>' +
                '<li ng-repeat="crumb in breadcrumbs" ng-class="{ active: $last }">' +
                '<a ui-sref="{{ crumb.route }}" ng-if="!$last">{{ crumb.displayName }}&nbsp;</a>' +
                '<span ng-show="$last">{{ crumb.displayName }}</span>' +
                '</li>' +
                '</ol>',
            scope: {
                displayName: '@',
                frontMsg: '@'
            },
            replace: true,
            link: function(scope, element, attrs) {
                if (!scope.displayName) {
                    return;
                }
                var propertyArray = scope.displayName.split('.');
                scope.breadcrumbs = [];

                scope.$on('$stateChangeSuccess', function() {
                    updateBreadcrumbs();
                });

                function updateBreadcrumbs() {
                    var displayName,
                        breadcrumbs = [],
                        current = $state.$current;
                    while ((displayName = getDisplayName(current))) {
                        var breadcrumb = getBreadcrumb(current, displayName);
                        breadcrumb && breadcrumbs.push(breadcrumb);
                        current = current.parent;
                    }
                    scope.breadcrumbs = breadcrumbs.reverse();
                }

                function getBreadcrumb(current, displayName) {
                    if (current.name == '') return;
                    return {
                        route: current.name,
                        displayName: displayName
                    };
                }

                function getDisplayName(current) {
                    var propertyReference = current;
                    for (var i = 0; i < propertyArray.length; i++) {
                        if (propertyReference[propertyArray[i]]) {
                            propertyReference = propertyReference[propertyArray[i]];
                        } else {
                            return undefined;
                        }
                    };
                    return (typeof propertyReference === 'string') ? propertyReference : undefined;
                }

            }
        }
    });