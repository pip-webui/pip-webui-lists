/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appComponentsStyles.SimpleList', []);

    thisModule.controller('SimpleListController',
        function($scope) {

            $scope.list = [
                'List 1',
                'Credibly conceptualize business leadership skills for low-risk high-yield channels.',
                'Conveniently fabricate ethical leadership for frictionless applications. Authoritatively initiate highly efficient scenarios through intermandated strategic theme areas. Objectively fabricate wireless opportunities and go forward technology. Collaboratively network sticky schemas.'
            ]
        }
    );

})();
