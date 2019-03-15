const Promise = require('promise');
const QueryModel = require('../models/query.model');

class StandardController {
    constructor(modelName) {
        this.modelName = modelName;
        this.model = require(`../models/${this.modelName}.model`);
    }

    // CRUD functions - create, fetch, fetchAll, update, delete

    create(model) {
        const newModel = new this.model(model);
        return new Promise((fulfill, reject) => {
            newModel.save().then(data => {
                const result = {
                    status: 201, 
                    message: `${this.modelName} created successfully!`,
                    data: data
                };
                fulfill(result);
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${this.modelName} failed to create!`,
                    error: error.toString()
                };
                reject(result);
            });
        });
    }

    fetch(id) {
        return new Promise((fulfill, reject) => {
            this.model.findById(id).then(data => {
                if (data == null) throw new Error("Product not found!");
        
                const result = { 
                    status: 200, 
                    message: `${this.modelName} fetched successfully!`,
                    data: data
                };
                fulfill(result);
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${this.modelName} not found!`,
                    error: error.toString()
                };
                reject(result);
            });
        });        
    }

    fetchAll(queryModel) {
        return new Promise((fulfill, reject) => {
            const query = new QueryModel(queryModel).getQuery();
            // console.log(query);
            this.model.find(query.conditions, query.selections, query.options, (err, docs) => {
                console.log(err);
                console.log(docs);
            }).then(data => {
                const result = { 
                    status: 200, 
                    message: `${this.modelName} fetched all successfully!`,
                    data: data,
                };
                console.log(data);
                fulfill(result);
            });
        });    
    }

    _getUpdateConditions(model) {
        let updateModel = { $set: model };

        if (model.hasOwnProperty('audit')) {
            Object.keys(model.audit).forEach(key => updateModel.$set[`audit.${key}`] = model.audit[key]);
            delete updateModel.$set.audit;
            updateModel['$currentDate'] = { 'audit.updatedDate': { $type: 'date' } };
        }

        return updateModel;
    }

    update(model) {
        return new Promise((fulfill, reject) => {
            this.model.findById(model._id).then(doc => {
                if (doc == null) throw new Error(`${this.modelName} not found!`);

                doc.updateOne(this._getUpdateConditions(model)).then(() => {
                    this.model.findById(model._id).then(data => {
                        const result = { 
                            status: 201, 
                            message: `${this.modelName} updated successfully!`,
                            data: data
                        };
                        fulfill(result);
                    });
                })                
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${this.modelName} failed to update!`,
                    error: error.toString()
                };
                reject(result);
            });
        });        
    }

    delete(id) {
        return new Promise((fulfill, reject) => {
            this.model.findByIdAndDelete(id).then(data => {
                if (data == null) throw new Error(`${this.modelName} not found!`);
        
                const result = { 
                    status: 200, 
                    message: `${this.modelName} deleted successfully!`
                };
                fulfill(result);
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${this.modelName} failed to delete!`,
                    error: error.toString()
                };
                reject(result);
            });
        })
    }
};

module.exports = StandardController;