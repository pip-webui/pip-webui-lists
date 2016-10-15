'use strict';

describe('pipFocused', function () {

    describe('directive', function () {
        var $compile,
            $rootScope,
            $timeout,
            scope,
            elem, focusableElems, control0, control1, control2;
        beforeEach(module('ngMaterial'));
        beforeEach(module('pipFocused'));

        beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
        }));

        beforeEach(function () {
            scope = $rootScope.$new();
            scope.buttonsSet = ['Button1', 'Button2', 'Button3', 'Button4', 'Button5', 'Button6'];

            elem = angular.element('<div pip-focused><md-button class="pip-focusable" ng-repeat="button in buttonsSet" ng-bind="button"></md-button></div>');

            //to fire jquery events
            elem.appendTo(document.body);
            $compile(elem)(scope);
            scope.$digest();
            $timeout.flush();

            focusableElems = elem.find('.pip-focusable');
            control0 = focusableElems.eq(0);
            control1 = focusableElems.eq(1);
            control2 = focusableElems.eq(2);
        });

        it.only('focus', function (done) {

           // control0[0].focus();
           // assert.equal(focusableElems.length, 6);
           // assert.equal(control0.hasClass('md-focused'), true);
           // assert.equal(control1.hasClass('md-focused'), false);
           // assert.equal(elem.hasClass('focused-container'), true);

          //  control1.focus();
           // assert.equal(control0.hasClass('md-focused'), false);
          //  assert.equal(control1.hasClass('md-focused'), true);

            done();
        });

        it('keydown', function (done) {

            //control0.focus();
            //assert.equal(control0.hasClass('md-focused'), true);
//
            //elem.triggerHandler({type: 'keydown', which: 39});
            //assert.equal(control0.hasClass('md-focused'), false);
            //assert.equal(control1.hasClass('md-focused'), true);
//
            //elem.triggerHandler({type: 'keydown', which: 40});
            //assert.equal(control2.hasClass('md-focused'), true);
            //assert.equal(control1.hasClass('md-focused'), false);
//
            //elem.triggerHandler({type: 'keydown', which: 37});
            //assert.equal(control1.hasClass('md-focused'), true);
            //assert.equal(control2.hasClass('md-focused'), false);
//
            //elem.triggerHandler({type: 'keydown', which: 38});
            //assert.equal(control0.hasClass('md-focused'), true);
            //assert.equal(control1.hasClass('md-focused'), false);

            done();
        });


    });

});

