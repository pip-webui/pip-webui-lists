/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appLists.RefList', []);

    thisModule.controller('RefListController',
        function($scope) {

            $scope.item = {
                title: 'title',
                parent: 'parent name',
                time: 'time',
                text: 'Enthusiastically visualize virtual process improvements with dynamic strategic theme areas. Energistically benchmark interactive niche markets whereas global intellectual capital. Seamlessly visualize best-of-breed opportunities whereas client-centric applications. Uniquely target scalable channels after functional meta-services. Intrinsicly innovate resource sucking infrastructures rather than prospective innovation.Synergistically utilize reliable leadership via error-free.'
            };

            $scope.item2 = {
                title: 'title2',
                time: 'time2',
                text: 'Enthusiastically visualize virtual process improvements with dynamic strategic theme areas. Energistically benchmark interactive niche markets whereas global intellectual capital. Seamlessly visualize best-of-breed opportunities whereas client-centric applications. Uniquely target scalable channels after functional meta-services. Intrinsicly innovate resource sucking infrastructures rather than prospective innovation. Synergistically utilize reliable leadership via error-free.'
            };

            $scope.item3 = {
                title: 'Dynamically synergize bricks-and-clicks solutions for equity invested platforms. Objectively promote accurate "outside the box" thinking without bleeding-edge deliverables. Dramatically iterate fully researched applications rather than economically sound initiatives. Dramatically.',
                time: 'thinking without bleeding-edge deliverables. Dramatically iterate fully researched applications rather than economically sound initiatives. Dramatically.',
                text: 'Enthusiastically visualize virtual process improvements with dynamic strategic theme areas. Energistically benchmark interactive niche markets whereas global intellectual capital. Seamlessly visualize best-of-breed opportunities whereas client-centric applications. Uniquely target scalable channels after functional meta-services. Intrinsicly innovate resource sucking infrastructures rather than prospective innovation. Synergistically utilize reliable leadership via error-free.'
            };
        }
    );

})();
