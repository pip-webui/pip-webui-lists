declare module pip.lists {


export interface ITagListBindings {
    [key: string]: any;
    tags: any;
    type: any;
    typeLocal: any;
    rebuid: any;
}
export class TagListChanges implements ng.IOnChangesObject, ITagListBindings {
    [key: string]: ng.IChangesObject<any>;
    tags: ng.IChangesObject<string[]>;
    type: ng.IChangesObject<string>;
    typeLocal: ng.IChangesObject<string>;
    rebuid: ng.IChangesObject<boolean>;
}

}
