'use strict';

describe('pipSelected', function () {

   describe('directive', function () {
       var $compile,
           $rootScope,
           $directive,
           scope,
           pipUtils,
           elem, selectableElems, control0, control1, control2;

       beforeEach(module('pipUtils'));
       beforeEach(module('ngMaterial'));
       beforeEach(module('pipSelected'));

       beforeEach(inject(function(_$compile_, _$rootScope_, _pipUtils_) {
           $compile = _$compile_;
           $rootScope = _$rootScope_;
           pipUtils = _pipUtils_;
       }));

       beforeEach(function () {
           scope = $rootScope.$new();
           scope.items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6'];
           scope.count = 0;
           scope.onItemSelect = function (e) {
               scope.count++;
           };

           elem = angular.element('' +
               '<md-list pip-selected="selected.itemIndex" pip-select="onItemSelect($event)" >' +
               '      <md-list-item class="pip-selectable" ng-repeat="item in items">' +
               '          <div class="md-list-item-text">' +
               '              <p>{{ item }}</p>' +
               '          </div>' +
               '      </md-list-item>' +
               ' </md-list>');

           //to fire jquery events
           elem.appendTo(document.body);
           $compile(elem)(scope);
           scope.$digest();

           selectableElems = elem.find('.pip-selectable');
           control0 = selectableElems.eq(0);
           control1 = selectableElems.eq(1);
           control2 = selectableElems.eq(2);
       });

       it('click', function (done) {

           control0.click();
           assert.equal(selectableElems.length, 6);
           assert.equal(control0.hasClass('selected'), true);
           assert.equal(control1.hasClass('selected'), false);

           control1.click();
           assert.equal(control0.hasClass('selected'), false);
           assert.equal(control1.hasClass('selected'), true);

           done();
       });

       it('keydown', function (done) {

           control0.click();
           assert.equal(scope.count, 1);

           elem.triggerHandler({type: 'keydown', which: 39});

           assert.equal(control1.hasClass('selected'), true);
           assert.equal(control0.hasClass('selected'), false);
           assert.equal(scope.count, 2);

           elem.triggerHandler({type: 'keydown', which: 40});

           assert.equal(control2.hasClass('selected'), true);
           assert.equal(control1.hasClass('selected'), false);
           assert.equal(scope.count, 3);

           elem.triggerHandler({type: 'keydown', which: 37});

           assert.equal(control1.hasClass('selected'), true);
           assert.equal(control2.hasClass('selected'), false);
           assert.equal(scope.count, 4);

           elem.triggerHandler({type: 'keydown', which: 38});

           assert.equal(control0.hasClass('selected'), true);
           assert.equal(control1.hasClass('selected'), false);
           assert.equal(scope.count, 5);

           done();
       });

       
   });

});
