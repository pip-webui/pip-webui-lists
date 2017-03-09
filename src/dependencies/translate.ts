(() => {
    'use strict';
    function filerTranslate($injector: angular.auto.IInjectorService) {
        let pipTranslate: any = $injector.has('pipTranslate') 
            ? $injector.get('pipTranslate') : null;

        return (key: string) => {
            return pipTranslate  ? pipTranslate.translate(key) || key : key;
        }
    }

    angular.module('pipList.Translate', [])
        .filter('translate', filerTranslate);

})();
