function translate($injector) {
    var pipTranslate = $injector.has('pipTranslate') 
        ? $injector.get('pipTranslate') : null;

    return function (key) {
        return pipTranslate  ? pipTranslate.translate(key) || key : key;
    }
}

angular.module('pipList.Translate', [])
    .filter('translate', translate);
