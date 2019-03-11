const Promise = require('promise');

let Model;
let ModelName;

class ServiceController {
    constructor(modelName) {
        ModelName = modelName;
        Model = require('../models/' + ModelName);
    }

    // CRUD functions - create, fetch, fetchAll, update, delete

    create(model) {
        const newModel = new Model(model);
        return new Promise((fulfill, reject) => {
            newModel.save().then(data => {
                const result = {
                    status: 201, 
                    message: `${ModelName} created successfully!`,
                    data: data
                };
                fulfill(result);
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${ModelName} failed to create!`,
                    error: error.toString()
                };
                reject(result);
            });
        });
    }

    fetch(id) {
        return new Promise((fulfill, reject) => {
            Model.findById(id).then(data => {
                if (data == null) throw new Error("Product not found!");
        
                const result = { 
                    status: 200, 
                    message: `${ModelName} fetched successfully!`,
                    data: data
                };
                fulfill(result);
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${ModelName} not found!`,
                    error: error.toString()
                };
                reject(result);
            });
        });        
    }

    fetchAll(queryModel) {
        return new Promise((fulfill, reject) => {
            Model.find().then(data => {
                const result = { 
                    status: 200, 
                    message: `${ModelName} fetched all successfully!`,
                    data: data
                };
                fulfill(result);
            });
        });    
    }

    update(model) {
        return new Promise((fulfill, reject) => {
            Model.findByIdAndUpdate(model._id, { $set: model }).then(data => {
                if (data == null) throw new Error(`${ModelName} not found!`);
                
                Model.findById(model._id).then(data => {
                    const result = { 
                        status: 201, 
                        message: `${ModelName} updated successfully!`,
                        data: data
                    };
                    fulfill(result);
                });
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${ModelName} failed to update!`,
                    error: error.toString()
                };
                reject(result);
            });
        });        
    }

    delete(id) {
        return new Promise((fulfill, reject) => {
            Model.findByIdAndDelete(id).then(data => {
                if (data == null) throw new Error(`${ModelName} not found!`);
        
                const result = { 
                    status: 200, 
                    message: `${ModelName} deleted successfully!`
                };
                fulfill(result);
            }).catch(error => {
                const result = { 
                    status: 500, 
                    message: `${ModelName} failed to delete!`,
                    error: error.toString()
                };
                reject(result);
            });
        })
    }
}

module.exports = ServiceController;
