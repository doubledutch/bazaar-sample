const bazaar = require('../bazaar.json')

module.exports = function run(req, rsp) {
    rsp.write(JSON.stringify(
        bazaar
    ))
}