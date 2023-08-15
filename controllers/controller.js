const {selectTopics, selectArticles} = require('../models/model')


exports.getTopics = (request, response) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    })
}

exports.getArticles = (request, response, next) => {
    const {article_id} = request.params 
    selectArticles(article_id)
    .then((articles) => {
        response.status(200).send(articles)
    })
    .catch(next);
}