const supertest = require('supertest');
const server = require('../server');
const request = supertest(server);
const {adminToken} = require('./seedData');
const { dbconnect, dbclose} = require('./mock-db');

beforeAll(async () => {
    await dbconnect();
    setTimeout(() => {}, 90*1000);
});
afterAll(async () => {
    await dbclose();
});

describe('ABOUT SECTION TESTS', () => {
    let aboutInfoRetreivaId;
    it('should return ok(200) status code for About Section Info creation', async () => {
        const response = await request
        .post('/api/v1/aboutRoute')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .send({
            aboutMeDescription: 'Portfolio Owner/Admin decription of their journey, skills, etc',
            skills: ['Portfolio/Admin FIRST skill', 'Portfolio/Admin SECOND skill', 'Portfolio/Admin THIRD skill'],
            education: ['Classes taken' , 'School Attended' , 'Another school Attended']
        });
        expect(response.statusCode).toEqual(200);
        aboutInfoRetreivaId = response.body._id;
    });
    it('should return ok(401) status code for About Section Info creation w/o Auth Token', async () => {
        const response = await request
        .post('/api/v1/aboutRoute')
        .send({
            aboutMeDescription: 'Portfolio Owner/Admin decription of their journey, skills, etc',
            skills: ['Portfolio/Admin FIRST skill', 'Portfolio/Admin SECOND skill', 'Portfolio/Admin THIRD skill'],
            education: ['Classes taken' , 'School Attended' , 'Another school Attended']
        });
        expect(response.statusCode).toEqual(401);
    });
    it('should return ok(200) status code for About Section Info retreival', async () => {
        const response = await request
        .get('/api/v1/aboutRoute/'.concat(aboutInfoRetreivaId))
        expect(response.statusCode).toEqual(200);
    });
    it('should return unAuthorized(400) status code for About Section Info retreival w/o valid About Section Object ID', async () => {
        const response = await request
        .get('/api/v1/aboutRoute/1234567890')
        expect(response.statusCode).toEqual(400);
    });
    it('should return ok(200) status code for About Section Info update', async () => {
        const response = await request
        .put('/api/v1/aboutRoute/'.concat(aboutInfoRetreivaId))
        .set({'Authorization' : `Bearer ${adminToken}`})
        .send({
            aboutMeDescription: 'Portfolio Owner/Admin decription of their journey, skills, etc',
            skills: ['Portfolio/Admin FIRST skill', 'Portfolio/Admin SECOND skill', 'Portfolio/Admin THIRD skill'],
            education: [ 'School Attended' , 'Another school Attended'] 
        });
        expect(response.statusCode).toEqual(200);
    });
    it('should return bad request(400) status code for About Section Info update w/ invalid About Section Object ID', async () => {
        const response = await request
        .put('/api/v1/aboutRoute/1234567890')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .send({
            aboutMeDescription: 'Portfolio Owner/Admin decription of their journey, skills, etc',
            skills: ['Portfolio/Admin FIRST skill', 'Portfolio/Admin SECOND skill', 'Portfolio/Admin THIRD skill'],
            education: [ 'School Attended' , 'Another school Attended'] 
        });
        expect(response.statusCode).toEqual(400);
    });
    it('should return bad unAuthorized(401) status code for About Section Info update w/o valid Auth Token', async () => {
        const response = await request
        .put('/api/v1/aboutRoute/'.concat(aboutInfoRetreivaId))
        .send({
            aboutMeDescription: 'Portfolio Owner/Admin decription of their journey, skills, etc',
            skills: ['Portfolio/Admin FIRST skill', 'Portfolio/Admin SECOND skill', 'Portfolio/Admin THIRD skill'],
            education: [ 'School Attended' , 'Another school Attended'] 
        });
        expect(response.statusCode).toEqual(401);
    });


})