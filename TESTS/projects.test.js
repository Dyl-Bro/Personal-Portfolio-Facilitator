const supertest = require('supertest');
const server = require('../server');
const request = supertest(server);
const {dbconnect, dbclose} = require('./mock-db');
const {adminToken} = require('./seedData');

beforeAll( async () => {
    await dbconnect();
    setTimeout( () => {}, 90*1000);
});
afterAll(async () => {
    await dbclose();
});

describe('PORTFOLIO PROJECTS TESTS', () => {
    const filePath = `${__dirname}/test-design-doc.pdf`
    let validProjectRetreivalID;
    it('should return ok(200) status code for Project Portfolio creation', async () => {
        const response = await request
        .post('/api/v1/projectRoute/')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .field('title', 'Test Project 1')
        .field('description', 'Test Project 1 Detailed Description')
        .field('projectLink', 'link-to-test-project-1')
        .attach('image', filePath);
        expect(response.statusCode).toEqual(200);
        console.log("Posted Project----->" + response.body);
        validProjectRetreivalID = response.body.id; 
    });
    it('should return bad request(400) status code for Project Portfolio creation', async () => {
        const response = await request
        .post('/api/v1/projectRoute/')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .field('description', 'Test Project 1 Detailed Description')
        .field('projectLink', 'link-to-test-project-1')
        .attach('image', filePath);
        expect(response.statusCode).toEqual(400);
    });
    it('should return unAuthorized(401) status code for project creation w/o valid adminToken', async () => {
        const response = await request
        .post('/api/v1/projectRoute/')
        .field('title', 'Test Project 1')
        .field('description', 'Test Project 1 Detailed Description')
        .field('projectLink', 'link-to-test-project-1')
        .attach('image', filePath);
        expect(response.statusCode).toEqual(401);
    });
    it('should return ok(200) status code for Project Portfolio Documents upload', async () => {
        const response = await request
        .put('/api/v1/projectRoute/documents/'.concat(validProjectRetreivalID))
        .set({'Authorization' : `Bearer ${adminToken}`})
        .attach('documents' , `${__dirname}/test-design-doc2.pdf`)
        .attach('documents' , `${__dirname}/test-design-doc3.pdf`);
        expect(response.statusCode).toEqual(200);
    });
    it('should return unAuthorized request(401) status code for Project Portfolio Documents upload', async () => {
        const response = await request
        .put('/api/v1/projectRoute/documents/'.concat(validProjectRetreivalID))
        .attach('documents' , `${__dirname}/test-design-doc2.pdf`)
        .attach('documents' , `${__dirname}/test-design-doc3.pdf`);
        expect(response.statusCode).toEqual(401);
    });
    it('should return bad request(400) status code for Project Portfolio Documents upload', async () => {
        const response = await request
        .put('/api/v1/projectRoute/documents/12345')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .attach('documents' , `${__dirname}/test-design-doc2.pdf`)
        .attach('documents' , `${__dirname}/test-design-doc3.pdf`);
        expect(response.statusCode).toEqual(400);
    });
    it('should return ok(200) status code for Project Portfolio update', async () => {
        const response = await request
        .put('/api/v1/projectRoute/'.concat(validProjectRetreivalID))
        .set({'Authorization' : `Bearer ${adminToken}`})
        .field('title', 'Test Project Updated Title')
        .field('description', 'Test Project Updated Decsription')
        .field('projectLink' , 'link-to-test-project')
        .attach('image', `${__dirname}/test-image.jpg`);
        expect(response.statusCode).toEqual(200);
    });
    it('should return unAuthorized(401) status code for Project update w/o valid Auth Token', async () => {
        const response = await request
        .put('/api/v1/projectRoute/'.concat(validProjectRetreivalID))
        .field('title', 'Test Project Updated Title')
        .field('description', 'Test Project Updated Decsription')
        .field('projectLink' , 'link-to-test-project')
        .attach('image', `${__dirname}/test-image.jpg`);
        expect(response.statusCode).toEqual(401);
    });
    it('should return bad request (400) status code for project update w/ invalid project ID ', async () => {
        const response = await request
        .put('/api/v1/projectRoute/1234567890')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .field('title', 'Test Project Updated Title')
        .field('description', 'Test Project Updated Decsription')
        .field('projectLink' , 'link-to-test-project')
        .attach('image', `${__dirname}/test-image.jpg`);
        expect(response.statusCode).toEqual(400);
    });
    it('should return ok(200) status code for Project Portfolio list retreival', async () => {
        const response = await request
        .get('/api/v1/projectRoute/')
        expect(response.statusCode).toEqual(200);
    });
    it('should return ok(200) status code for Project Portfolio individual retreival', async () => {
        const response = await request
        .get('/api/v1/projectRoute/'.concat(validProjectRetreivalID))
        expect(response.statusCode).toEqual(200);
    });
    it('should return bad request(400) status code for project individual retreival w/ invalid project ID', async () => {
        const response = await request
        .get('/api/v1/projectRoute/123456789')
        expect(response.statusCode).toEqual(400);
    });
    it('should return ok(200) status code for Project Portfolio deletion', async () => {
        const response = await request
        .delete('/api/v1/projectRoute/'.concat(validProjectRetreivalID))
        .set({'Authorization' : `Bearer ${adminToken}`});
        expect(response.statusCode).toEqual(200);
    });
    it('should return unAuthorized(401) status code for Project deletion w/o vali Auth Token', async () => {
        const response = await request
        .delete('/api/v1/projectRoute/'.concat(validProjectRetreivalID));
        expect(response.statusCode).toEqual(401)
    });
    it('should return bad request(400) status code for project deletion w/ invalid projectID', async () => {
        const response = await request
        .delete('/api/v1/projectRoute/12345678')
        .set({'Authorization' : `Bearer ${adminToken}`});
        expect(response.statusCode).toEqual(400)
    });
});