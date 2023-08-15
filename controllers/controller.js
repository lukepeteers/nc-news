const {selectTopics, selectServerDocs} = require('../models/model')
const endpoints = require('../endpoints.json')

exports.getTopics = (request, response) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    })
}

exports.getServerDocs = (request, response) => {
    response.status(200).send(endpoints)
}