/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appLists.CheckList', []);

    thisModule.controller('CheckListController',
        function($scope) {
            //....

            $scope.items = [
                {
                    title: 'title',
                    parent: 'parent name',
                    text: 'Enthusiastically visualize virtual process improvements'
                },
                {
                    title: 'Enthusiastically evisculate out-of-the-box e-services whereas user friendly architectures. Interactively revolutionize interoperable data before fully tested manufactured products. Energistically iterate multidisciplinary innovation and team driven innovation. Conveniently generate 2.0 action items and interoperable information. Competently aggregate orthogonal bandwidth after B2C outsourcing.',
                    text: 'Collaboratively embrace collaborative materials before cross-platform alignments. Rapidiously transition high standards in process improvements and future-proof scenarios. Assertively unleash value-added internal or "organic" sources whereas plug-and-play collaboration and idea-sharing. Dynamically generate long-term high-impact architectures rather than maintainable solutions. Dynamically productivate bricks-and-clicks manufactured products after mission-critical.'
                },
                {
                    title: 'title3',
                    parent: 'parent name3',
                    text: 'Enthusiastically visualize virtual process improvements'
                },

            ];
            function aaa(){}
        }
    );

})();
