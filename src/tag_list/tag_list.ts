
(() => {
interface ITagList {
    tags: string[];
    type: string;
    typeLocal: string;
}

class TagListController implements ITagList {
    public rebind: string;

    public tags: string[];
    public type: string;
    public typeLocal: string;

    constructor(
         $scope: ng.IScope, 
         $element: ng.IRootElementService
    ) {

        // Set tags
        $element.css('display', 'block');
        $element.addClass('pip-tag-list');
     }

     private toBoolean(value: string): boolean {
        if (_.isNull(value) || _.isUndefined(value)) return false;
        if (!value) return false;
        value = value.toString().toLowerCase();
        return value == '1' || value == 'true';
     }

    public $onChanges(changes: TagListChanges) {
        if (this.rebind && changes.tags) {
            this.tags = changes.tags.currentValue;
        }

    }

 }

interface ITagListBindings {
    [key: string]: any;

    tags: any,
    type: any,
    typeLocal: any,
    rebuid: any
}

const TagListBindings: ITagListBindings = {
    tags: '<pipTags',
    type: '<pipType',
    typeLocal: '<pipTypeLocal',
    rebuid: '<pipRebind'
}

class TagListChanges implements ng.IOnChangesObject, ITagListBindings {
    [key: string]: ng.IChangesObject<any>;
    
    tags: ng.IChangesObject<string[]>;
    type: ng.IChangesObject<string>;
    typeLocal: ng.IChangesObject<string>;
    rebuid: ng.IChangesObject<boolean>
}

const TagList = {
        restrict: 'E',
        bindings: TagListBindings,
        templateUrl: 'tag_list/tag_list.html',
        controller: TagListController,
        controllerAs: '$ctrl'
    }

angular.module('pipTagList', ['pipList.Translate'])
    .component('pipTagList', TagList)

})();