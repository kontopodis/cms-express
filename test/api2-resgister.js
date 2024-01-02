const {expect} = require('chai');
const request = require('supertest');
const app = require("../server")

describe('Register a user', () => {
    it('Gets 400 for invalid password', async () => {
        const response =  await request(app)
        .post('/admin/dashboard/users')
        .send({
            username:"manos",
            password:"1trtrt",
            email:"manos123@gmail.com"
        })

        expect(response.status).to.be.equal(400)

 });
 it('Gets 400 for invalid email syntax', async () => {
    const response =  await request(app)
    .post('/admin/dashboard/users')
    .send({
        username:"manos",
        password:"1A#dcfddsfvbedfgvb",
        email:"manos123@gmail"
    })

    expect(response.status).to.be.equal(400)

});
it('Gets 201 for new user', async () => {
    const response =  await request(app)
    .post('/admin/dashboard/users')
    .send({
        username:"manos",
        password:"1A_qwerty",
        email:"manos123@gmail.com"
    })

    expect(response.status).to.be.equal(201)

});
});

