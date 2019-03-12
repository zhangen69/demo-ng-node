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
        for(var key in obj) {
            if(this.hasOwnProperty(key))
                return false;
        }
        return true;
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
                    
                if (conditions[options.type] != undefined) {
                    conditions[options.type].push(query);
                } else if (!this._isEmpty(query)) {
                    conditions[options.type] = [query];
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
            // switch(this.queryType) {
            //     case 'string':
            //         conditions[this.type] = [new RegExp(`${this.searchText}`, 'gi')]; // LIKE condition
            //         break;
            //     case 'number':
            //         let query = {};

            //         if (this.min != null) {
            //             query[$gte] = this.min;
            //         }
                        
            //         if (this.max != null) {
            //             query[$lte] = this.max;
            //         }                        
                        
            //         conditions[this.type] = query;
            //         break;
            //     default:
            //         throw new Error(`Undefined 'queryType' as ${this.queryType}`);
            //         break;
            // }
        }

        if (this.filters.length > 0) {
            this.filters.forEach(filter => {
                if (!filter.queryType) filter.queryType = 'string';
                if (!!filter.type && !!filter.searchText) {
                    this._getCondition(conditions, filter);
                    // conditions[f.type] != undefined ? conditions[f.type].push(new RegExp(`${f.searchText}`, 'gi')) : conditions[f.type] = [new RegExp(`${f.searchText}`, 'gi')];
                }
            })
        }
        
        return {conditions, selections, options};
    }
};

module.exports = QueryModel;