module.exports = function(app) {
    let controller = require('./controller');

    app.route('/api/v1/rebate_forms').get(controller.getApplication);
    app.route('/api/v1/rebate_forms').post(controller.postApplication);
};
