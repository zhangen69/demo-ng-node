export default class QueryModel {
    _properties = ['pageSize', 'currentPage', 'searchText', 'type'];
    pageSize = 0;
    currentPage = 0;
    searchText = '';
    type = null;

    constructor(queryModel) {
        _properties.forEach(prop => {
            if (!queryModel[prop]) return;

            this[prop] = queryModel[prop];
        });

        return generateMongoQuery();
    }

    generateMongoQuery() {
        // query patterns: conditions, select columns, pagination options
        conditions = {};
        selections = null;
        options = {};

        if (type == null) {
            return {conditions, selections, options};
        }
    }
};
