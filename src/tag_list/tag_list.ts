interface ITagList {
    tags: string[];
    type: string;
    typeLocal: string;
}

class TagListController implements ITagList {
    private _rebind: string;

    public tags: string[];
    public type: string;
    public typeLocal: string;

    constructor(
         $scope: ng.IScope, 
         $element: ng.IRootElementService
    ) {

        // Set tags
        this.tags = $scope['pipTags'];
        this.type = $scope['pipType'];
        this.typeLocal = $scope['pipTypeLocal'];
        this._rebind = $scope['pipRebind'];
      
        if (this.toBoolean(this._rebind)) {
            $scope.$watch('pipTags', () => {
                this.tags = $scope['pipTags'];
            });
        }

        $element.css('display', 'block');
        $element.addClass('pip-tag-list');
     }

     private toBoolean(value: string): boolean {
        if (_.isNull(value) || _.isUndefined(value)) return false;
        if (!value) return false;
        value = value.toString().toLowerCase();
        return value == '1' || value == 'true';
     }
 }

/**
 * pipTags - set of tags
 * pipType - additional type tag
 * pipTypeLocal - additional translated type tag
 */
function TagList ($parse) {
    return {
        restrict: 'E',
        scope: {
            pipTags: '=',
            pipType: '=',
            pipTypeLocal: '='
        },
        templateUrl: 'tag_list/tag_list.html',
        controller: TagListController,
        controllerAs: '$ctrl'
    };
    }

angular.module('pipTagList', ['pipList.Translate'])
    .directive('pipTagList', TagList)
