const bazaar = require('../bazaar.json')
const tiles = require('../web/admin/src/layouts/tiles.json')
const insertData = tiles

module.exports = (req, res) => {
    log(`http://127.0.0.1:7171/api/rest/${bazaar.name}/modules`)
    fetch(`http://127.0.0.1:7171/api/rest/${bazaar.name}/modules`, {
        method: 'POST',
        headers: {
            'Authorization': req.headers.Authorization,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(insertData)
    })
        .then((result) => {
            log(result.body)
            res.write(result.body)
        })
        .catch((err) => {
            log(err)
            res.write({ error: err })
        })
}