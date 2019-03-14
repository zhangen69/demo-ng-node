class StandardRoutes {
    constructor(router, modelName, modelService) {
        if (!router) throw new Error('"router" is not defined.');

        router.post(`/${modelName}`, (req, res, next) => {
            this.resHandling(res, modelService.create(req.body));
        });

        router.get(`/${modelName}/:id`, (req, res, next) => {
            this.resHandling(res, modelService.fetch(req.params.id));
        });

        router.get(`/${modelName}`, (req, res, next) => {
            this.resHandling(res, modelService.fetchAll(JSON.parse(req.query.queryModel)));
        });

        router.put(`/${modelName}/`, (req, res, next) => {
            this.resHandling(res, modelService.update(req.body));
        });

        router.delete(`/${modelName}/:id`, (req, res, next) => {
            this.resHandling(res, modelService.delete(req.params.id));
        });

        return router;
    }

    resHandling (res, func) {
        try {
            func.then(result => {
                res.status(result.status).json(result);
            }).catch(result => {
                res.status(result.status).json(result);
            });
        } catch (error) {
            console.log('Error Occurs!');
            console.error(error);
        }
    };
    
}

module.exports = StandardRoutes;
