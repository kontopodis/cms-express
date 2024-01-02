const {expect} = require('chai');
const request = require('supertest');
const app = require("../server")
let token;
describe('Authenticate a user', () => {
    it('Gets 401 for invalid password', async () => {
        const response =  await request(app)
        .post('/admin/login')
        .send({
            email:"manos123@gmail.com",
            password:"1trtrt",

        })

        expect(response.status).to.be.equal(401)

 });
 it('Gets 401 for invalid email syntax', async () => {
    const response =  await request(app)
    .post('/admin/login')
    .send({
        email:"manos123@gmail.com",
        password:"1A#dcfddsfvbedfgvb",

    })

    expect(response.status).to.be.equal(401)

});
it('Gets 200 for new login', async () => {
    const response =  await request(app)
    .post('/admin/login')
    .send({

        password:"1A_qwerty",
        email:"manos123@gmail.com"

    })

    expect(response.status).to.be.equal(200)
    token = response.body.token


});

it('Gets 403 when its not admin to get all users', async () => {
    const response =  await request(app)
    .get('/admin/dashboard/users')
    .set("token", token)

    expect(response.status).to.be.equal(403)



});
it('Gets 403 when its not admin to delete a user', async () => {
    const response =  await request(app)
    .delete('/admin/dashboard/users')
    .set("token", token)
    .send({id:"aergesargesargergaewrg"})

    expect(response.status).to.be.equal(403)



});
});

