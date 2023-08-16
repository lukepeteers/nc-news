const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");

const endpointsTest = require('../endpoints.json')


beforeEach(() => {
    return seed(data);
});

afterAll(() => connection.end());

describe('GET', () => {
    test('404 - response with error message when given a url that doesnt exist on server', () => {
        return request(app)
        .get('/pokeomon-news')
        .expect(404)
    });
    describe('/api/topics', () => {
        test('200 - responds with an array of objects with "slug" and "description" properties', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                const {rows} = response.body
                return rows.forEach((topic) => {
                    expect(topic).toHaveProperty('slug', expect.any(String))
                    expect(topic).toHaveProperty('description', expect.any(String))
                })
            })
        });   
    });
    describe('/api/articles/:article_id', () => {
        test('200 - responds with an object with a key of "article" and value as the desired object withcorrect properties', () => {
            
            return request(app)
            .get('/api/articles/2')
            .expect(200)
            .then(({body}) => {
                for(const key in body) {
                    const value = body[key]
                    expect(key).toBe('article')
                    expect(value).toHaveProperty('article_id', expect.any(Number))
                    expect(value).toHaveProperty('title', expect.any(String))
                    expect(value).toHaveProperty('topic', expect.any(String))
                    expect(value).toHaveProperty('author', expect.any(String))
                    expect(value).toHaveProperty('body', expect.any(String))
                    expect(value).toHaveProperty('created_at', expect.any(String))
                    expect(value).toHaveProperty('votes', expect.any(Number))
                    expect(value).toHaveProperty('article_img_url', expect.any(String))


                }
            })
        });

        test('404 - responds with "Not Found" when given an id that does not exist', () => {
            
            return request(app)
            .get('/api/articles/4200')
            .expect(404)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toBe('Not Found')
            })
        });

        test('400 - responds with "Invalid Input" when id entered is not a number', () => {
            
            return request(app)
            .get('/api/articles/nazgûl')
            .expect(400)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toBe('Invalid Input')
            })
        });
    });

    describe('/api', () => {
        test('200 - responds with object describing all the available endpoints on server', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
        
                expect(endpointsTest).toEqual(body)
            })
        });
    });

    describe('/api/articles', () => {
        test('200 - an articles array of article objects with the correct properties', () => {
            
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                body.forEach((article) => {  
                    expect(article).toHaveProperty('author', expect.any(String))
                    expect(article).toHaveProperty('title', expect.any(String))
                    expect(article).toHaveProperty('article_id', expect.any(Number))
                    expect(article).toHaveProperty('topic', expect.any(String))
                    expect(article).toHaveProperty('created_at', expect.any(String))
                    expect(article).toHaveProperty('votes', expect.any(Number))
                    expect(article).toHaveProperty('article_img_url', expect.any(String))
                    expect(article).toHaveProperty('comment_count', expect.any(Number))
                    expect(article).not.toHaveProperty('body')
                })
            })
        });
        
        test('200 - articles should be sorted by date descending', () => {
            
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                expect(body).toBeSortedBy('created_at', {
                    descending: true
                })
            })
        });

        test('404 - receive a 404 when url entered is misspelt', () => {
            
            return request(app)
            .get('/api/articleses')
            .expect(404)
            
            }) 
        });

        

    });

    describe('POST', () => {
        test('/api/articles/:article_id/comments', () => {
            
        });
    });


