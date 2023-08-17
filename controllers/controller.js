const {selectTopics, selectArticle, selectAllArticles, insertComment} = require('../models/model')
const endpoints = require('../endpoints.json')

exports.getTopics = (request, response, next) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    })
    .catch(next)
}

exports.getArticle = (request, response, next) => {
    const {article_id} = request.params
    selectArticle(article_id)
    .then((article) => {
        response.status(200).send({article})
    })
    .catch(next);
}

exports.getAllArticles = (request, response, next) => {
    selectAllArticles()
    .then((articles) => {
        response.status(200).send(articles)
    })
    .catch(next)
}

exports.getServerDocs = (request, response, next) => {
    response.status(200).send(endpoints)
    .catch(next)
}


exports.addComment = (request, response, next) => {
    insertComment(request.body, request.params)
    .then((comment) => {
        response.status(201).send({comment})
    })
    .catch(next)
}