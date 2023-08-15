const connection = require('../db/connection')


exports.selectTopics = () => {
    return connection
    .query(`SELECT * FROM topics`)
    .then((topics) => {
        return topics
    })

}

exports.selectArticles = (article_id) => {
    return connection
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not Found'})
        }
        return rows[0]
    })
}

