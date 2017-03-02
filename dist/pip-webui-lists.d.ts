declare module pip.lists {


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

}
