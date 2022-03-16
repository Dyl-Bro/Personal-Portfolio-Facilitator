const supertest = require('supertest');
const server = require('../server');
const request = supertest(server);
const {adminToken} = require('./seedData');
const {dbconnect , dbclose} = require('./mock-db');

beforeAll( async () => {
    await dbconnect();
    setTimeout( () => {}, 90*1000);
})
afterAll( async() => {
    await dbclose();
})

describe('CONTACT INFO TESTS', () => {
    let contactInfoRetreivalID;
    it('should return ok(200) status code for contact info creation', async () => {
        const response = await request
        .post('/api/v1/contactRoute/')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .send({
            contact_phone: '123-456-7890',
            contact_email: 'PortfolioOwner@gmail.com',
            contact_linkedIn: 'link-to-portfolio-owners-linkedIn'
        });
        expect(response.statusCode).toEqual(200);
        contactInfoRetreivalID = response.body.id
    });
    it('should return unAuthorized (401) status code for contact info creation w/o Auth Token', async () => {
        const response = await request
        .post('/api/v1/contactRoute/')
        .send({
            contact_phone: '123-456-7890',
            contact_email: 'PortfolioOwner@gmail.com',
            contact_linkedIn: 'link-to-portfolio-owners-linkedIn'
        });
        expect(response.statusCode).toEqual(401);
    })
    it('should return ok (200) status code for contact info retreival', async() => {
        const response = await request
        .get('/api/v1/contactRoute/'.concat(contactInfoRetreivalID))
        expect(response.statusCode).toEqual(200);
    });
    it('should return bad request (400) status code for contact info retreival w/ invalid contact info Object ID', async() => {
        const response = await request
        .get('/api/v1/contactRoute/123456789')
        expect(response.statusCode).toEqual(400);
    });
    it('should return ok(200) status code for contact info update', async () => {
        const response = await request
        .put('/api/v1/contactRoute/'.concat(contactInfoRetreivalID))
        .set({'Authorization' : `Bearer ${adminToken}`})
        .send({
            contact_phone: 'updated phone number here',
            contact_email: ' updated email here',
            contact_linkedIn: ' updated linked in profile'
        });
        expect(response.statusCode).toEqual(200);
    });
    it('should return bad request(400) status code for contact info update w/ invalid contact info Object ID ', async () => {
        const response = await request
        .put('/api/v1/contactRoute/1234567')
        .set({'Authorization' : `Bearer ${adminToken}`})
        .send({
            contact_phone: 'updated phone number here',
            contact_email: ' updated email here',
            contact_linkedIn: ' updated linked in profile'
        });
        expect(response.statusCode).toEqual(400);
    });
    it('should return unAuthorizedt(401) status code for contact info update w/o valid auth Token', async () => {
        const response = await request
        .put('/api/v1/contactRoute/'.concat(contactInfoRetreivalID))
        .set({'Authrization' : `Bearer ${adminToken}`})
        .send({
            contact_phone: 'updated phone number here',
            contact_email: ' updated email here',
            contact_linkedIn: ' updated linked in profile'
        });
        expect(response.statusCode).toEqual(401);
    });
});