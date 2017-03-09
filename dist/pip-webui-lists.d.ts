declare module pip.lists {

function translate($injector: any): (key: any) => any;

interface ITagList {
    tags: string[];
    type: string;
    typeLocal: string;
}
class TagListController implements ITagList {
    private _rebind;
    tags: string[];
    type: string;
    typeLocal: string;
    constructor($scope: ng.IScope, $element: ng.IRootElementService);
    private toBoolean(value);
}
function TagList($parse: any): {
    restrict: string;
    scope: {
        pipTags: string;
        pipType: string;
        pipTypeLocal: string;
    };
    templateUrl: string;
    controller: typeof TagListController;
    controllerAs: string;
};

}
