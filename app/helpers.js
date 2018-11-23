'use strict'

function notAuthorized(res) {
    return res.status(403).send({ message: 'Not Authorized' })
}

module.exports = {
    notAuthorized
}