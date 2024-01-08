import app from "../../server.js";
import {expect} from "chai"
import articleService from "../../admin/articles/data-access"
import {
  SupertestSecurity,
  dataPreparation,
  attacks,
} from "supertest-security";

describe("Security Tests",()=>{
  console.log("Message: Timeout is set to 150000 so 150 Seconds usually it takes 60 to 70 seconds")
/*
  it("/admin/login attacks get 401 on results",async ()=>{

const { SQL_INJECTION, XSS, UNIX_COMMAND_INJECTION } = attacks;

const config = {
  endpoint: "/admin/login",
  method: "post",
  headers: {token:"empty"},
};

const supertest = new SupertestSecurity(app, config);

// we need to provide a valid data
const bodyFields = {
  email: "admin@gmail.com",
  password: "1A_qwerty",

};

const template = {
  email: [SQL_INJECTION,XSS,UNIX_COMMAND_INJECTION],
  password: [SQL_INJECTION,XSS,UNIX_COMMAND_INJECTION],
};

// creating tests
const tests = dataPreparation(bodyFields, template);

await supertest.testBodyFields(tests,(result)=>{
result.map((element)=>{
  const code = element.statusCode
expect(code).to.be.equal(401)
})

})

}).timeout(150000);
*/
it("/article attacks get 400 on results",async ()=>{

  const { SQL_INJECTION, XSS, UNIX_COMMAND_INJECTION } = attacks;
  
  const config = {
    endpoint: "/article",
    method: "get",
    headers: {token:"empty"},
  };
  
  const supertest = new SupertestSecurity(app, config);
  
  // we need to provide a valid data
  const bodyFields = {
id:"py8k0qcpktamdi0i1ymdef2q"
  
  };
  
  const template = {
    id: [SQL_INJECTION,XSS,UNIX_COMMAND_INJECTION],

  };
  
  // creating tests
  const tests = dataPreparation(bodyFields, template);
  
  await supertest.testQueryParams(tests,async (result)=>{
    console.log("Results: "+result.length)
  result.map((element)=>{
    const code = element.statusCode
  expect(code).to.be.equal(400)
  })
  
  const articles = await articleService.findAll()
  console.log(articles)
  })
  
  }).timeout(150000);
})