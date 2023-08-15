const {selectTopics, selectArticles} = require('../models/model')
const endpoints = require('../endpoints.json')

exports.getTopics = (request, response) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    })
}

exports.getArticles = (request, response, next) => {
    const {article_id} = request.params 
    selectArticles(article_id)
    .then((articles) => {
        response.status(200).send({article: articles})
    })
    .catch(next);
}

exports.getServerDocs = (request, response) => {
    response.status(200).send(endpoints)
}