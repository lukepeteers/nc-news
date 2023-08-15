const request = require("supertest");
const app = require("../app.js");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");

beforeEach(() => {
    return seed(data);
});

afterAll(() => connection.end());


describe('GET', () => {
    test('404 - response with error message when given a url that doesnt exist on server', () => {
        return request(app)
        .get('/api/pokeomon-news')
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
        test('200 - responds with an object with the correct properties', () => {
            
            return request(app)
            .get('/api/articles/2')
            .expect(200)
            .then(({body}) => {
                expect(body).toHaveProperty('article_id', expect.any(Number))
                expect(body).toHaveProperty('title', expect.any(String))
                expect(body).toHaveProperty('topic', expect.any(String))
                expect(body).toHaveProperty('author', expect.any(String))
                expect(body).toHaveProperty('body', expect.any(String))
                expect(body).toHaveProperty('created_at', expect.any(String))
                expect(body).toHaveProperty('votes', expect.any(Number))
                expect(body).toHaveProperty('article_img_url', expect.any(String))
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

        test('400 - repsonds with "Invalid Id - please enter a number" when id entered is not a number', () => {
            
            return request(app)
            .get('/api/articles/nazgûl')
            .expect(400)
            .then(({body}) => {
                const {msg} = body
                expect(msg).toBe('Invalid input')
            })
        });
    });
});
