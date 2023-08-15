
const {selectTopics, selectServerDocs} = require('../models/model')
const endpoints = require('../endpoints.json')

const {selectTopics} = require('../models/model')



exports.getTopics = (request, response) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    })

}

exports.getServerDocs = (request, response) => {
    response.status(200).send(endpoints)

}