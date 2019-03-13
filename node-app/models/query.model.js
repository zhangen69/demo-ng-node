class QueryModel {
    constructor(queryModel = {}) {
        // for pagination
        this.pageSize = queryModel.pageSize || 0;
        this.currentPage = queryModel.currentPage || 0;
        // for filter/search
        this.searchText = queryModel.searchText || '';
        this.max = queryModel.max || null;
        this.min = queryModel.min || null;
        this.type = queryModel.type || null;
        this.queryType = queryModel.queryType || 'string';
        // advanced search
        this.filters = queryModel.filters || [];
    }

    _isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    _getCondition(conditions, options) {
        switch(options.queryType) {
            case 'string':
                if (conditions[options.type] != undefined) {
                    conditions[options.type].push(new RegExp(`${options.searchText}`, 'gi'));
                } else {
                    conditions[options.type] = [new RegExp(`${options.searchText}`, 'gi')];
                }
                break;
            case 'number':
                let query = {};

                if (options.min != null) {
                    query['$gte'] = options.min;
                }
                    
                if (options.max != null) {
                    query['$lte'] = options.max;
                }
                
                // if (options.searchText) {
                //     query['$in'] = [new RegExp(`${options.searchText}`, 'gi')];
                // }

                if (conditions[options.type] != undefined) {
                    // make entries to the conditions
                    const keys = Object.keys(conditions[options.type]);
                    
                    // check has match from query to conditions
                    const queryEntries = Object.entries(query);
                    queryEntries.forEach(keyItem => {
                        const keyName = keyItem[0];
                        const keyVal = keyItem[1];
                        
                        if (keys.includes(keyName)) {
                            if (conditions['$and'] != undefined) {
                                conditions['$and'].push({ [keyName]: keyVal });
                            } else {
                                conditions['$and'] = [conditions[options.type], { [keyName]: keyVal }];
                            }
                        } else {
                            conditions[options.type][keyName] = keyVal;
                        }
                    })

                } else if (!this._isEmpty(query)) {
                    conditions[options.type] = query;
                }
                break;
            default:
                throw new Error(`Undefined 'queryType' as ${this.queryType}`);
        }

        return conditions;
    }

    getQuery() {
        // query patterns: conditions, select columns, pagination options
        let conditions = {};
        let selections = null;
        const options = { skip: (this.currentPage * this.pageSize), limit: this.pageSize };

        if (!!this.type && !!this.searchText) {
            this._getCondition(conditions, this);
        }

        if (this.filters.length > 0) {
            this.filters.forEach(filter => {
                if (!filter.queryType) filter.queryType = 'string';
                if (!!filter.type) {
                    this._getCondition(conditions, filter);
                }
            })
        }
        
        return {conditions, selections, options};
    }
};

module.exports = QueryModel;