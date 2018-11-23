'use strict'

function notAuthorized(res) {
    return res.status(403).send({ message: 'No tienes autorización' })
}

module.exports = {
    notAuthorized
}