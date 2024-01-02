const {expect} = require('chai');
const request = require('supertest');
const app = require("../server")
const userService = require("../admin/users/use-cases")
let token;
let adminToken;
const admin = {
    username:"admin",
    password:"1A_qwerty",
    email:"admin@gmail.com"
}
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

it('Gets 201 when when users updates his email', async () => {
    const response =  await request(app)
    .patch('/admin/dashboard/users')
    .set("token", token)
    .send({
        case:"email",
        value:"manos@gmail.com"
    })

    expect(response.status).to.be.equal(201)
});
it('Gets 201 when when users updates his password', async () => {
    const response =  await request(app)
    .patch('/admin/dashboard/users')
    .set("token", token)
    .send({
        case:"password",
        value:"1A_qwerty"
    })

    expect(response.status).to.be.equal(201)
});
it('Gets 201 when when users updates his username', async () => {
    const response =  await request(app)
    .patch('/admin/dashboard/users')
    .set("token", token)
    .send({
        case:"username",
        value:"kontopodis"
    })

    expect(response.status).to.be.equal(201)
});
it('Gets 403 when trying to change toAdmin', async () => {
    const user = await userService.findByEmail("manos@gmail.com")
    const response =  await request(app)
    .patch('/admin/dashboard/users')
    .set("token", token)
    .send({
        id:user.id,
        case:"toAdmin",
        value:"admin"
    })

    expect(response.status).to.be.equal(403)
});
it('Gets 201 when trying to change toAdmin', async () => {
    // create admin
    await userService.addUser(admin)
    const adminUser = await userService.findByEmail(admin.email)
    const setting = {
        case:"toAdmin",
        id:adminUser.id
    }
    await userService.updateUser(setting)
    // login the admin
    const responseAdmin =  await request(app)
    .post('/admin/login')
    .send({
        password:"1A_qwerty",
        email:"admin@gmail.com"
    })

    expect(responseAdmin.status).to.be.equal(200)
    adminToken = responseAdmin.body.token

    const user = await userService.findByEmail("manos@gmail.com")
    const response =  await request(app)
    .patch('/admin/dashboard/users')
    .set("token", adminToken)
    .send({
        id:user.id,
        case:"toAdmin",
        value:"admin"
    })

    expect(response.status).to.be.equal(201)
});

it('Gets 201 when an admin trying to change toModerator', async () => {
    const user = await userService.findByEmail("manos@gmail.com")
    const response =  await request(app)
    .patch('/admin/dashboard/users')
    .set("token", adminToken)
    .send({
        id:user.id,
        case:"toModerator",
        value:"moderator"

    })
        expect(response.status).to.be.equal(201)
        const user2 = await userService.findByEmail("manos@gmail.com")
        expect(user2.role).to.be.equal("moderator")
});

it('Gets 201 when an admin trying to get all users', async () => {
    const user = await userService.findByEmail("manos@gmail.com")
    const response =  await request(app)
    .get('/admin/dashboard/users')
    .set("token", adminToken)
 
        expect(response.status).to.be.equal(200)
    
 
});
});

