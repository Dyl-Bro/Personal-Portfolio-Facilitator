const supertest = require('supertest');
const server = require('../server');
const request = supertest(server);
const { dbconnect, dbclose } = require('./mock-db');



beforeAll( async () => {
    await dbconnect();
    setTimeout(() => {}, 90*1000);
});
afterAll(async () => {
    await dbclose();
});

describe('ADMIN TESTS', () => {
    let validAuthToken;
    it('should return default admin info saved in database',  async () => {
        const response = await request
        .post('/api/v1/adminRoute/login')
        .send({
            email: 'SeedAdministrator@gmail.com',
            password: 'SeedAdministratorPassword'
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.admin).toEqual('SeedAdministrator@gmail.com');
        validAuthToken= response.body.token;
    });
    it('should return request(400) status code for admin login w/o valid login credentials', async () => {
        const response = await request
        .post('/api/v1/adminRoute/login')
        .send({
            email: 'SeedAdministrator@gmail.com',
            password: 'SeedAdministratorInvalidPassword'
        })
        expect(response.statusCode).toEqual(400);
    });
    it('should return ok(200) status code for registering new portfolio administrators w/ valid auth token', async () => {
        const response = await request
        .post('/api/v1/adminRoute/register')
        .set({'Authorization': 'Bearer '.concat(validAuthToken) })
        .send({
            name: 'Portfolio Administrator 2',
            email: 'PortfolioAdministrator2@gmail.com',
            password:'PortfolioAdministrator2Password'
        });
        expect(response.statusCode).toEqual(200);
    });
    it('should return bad request(401) status code for registering new portfolio administrators w/o valid auth token', async () => {
        const response = await request
        .post('/api/v1/adminRoute/register')
        .send({
            name: 'Portfolio Administrator 2',
            email: 'PortfolioAdministrator2@gmail.com',
            password:'PortfolioAdministrator2Password'
        });
        expect(response.statusCode).toEqual(401);
    });
    it('should return bad request(400) status code for registering new portfolio administrators w/o valid auth token', async () => {
        const response = await request
        .post('/api/v1/adminRoute/register')
        .set({'Authorization' : 'Bearer '.concat(validAuthToken)})
        .send({
            email: 'Portfolio Administrator 3 ',
            password:'PortfolioAdministrator3Password '
        });
        expect(response.statusCode).toEqual(400);
    });

})