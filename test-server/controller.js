let state = require('./testdata');

let getCount = 0;
module.exports.getApplication = (req, res) => {

    getCount++;

    (async () => {
        await sleep(300);

        if (getCount % 2) {
            res.status(500).send({message: 'This is an error!'});
        } else {
            res.json(state.application);
        }
    })();
};

let postCount = 0;
module.exports.postApplication = (req, res) => {

    postCount++;

    (async () => {
        await sleep(1000);

        if (postCount % 2) {
            res.status(500).send({message: 'This is an error!'});
        } else {
            res.json(state.postResponse);
        }
    })();
};

function sleep(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
