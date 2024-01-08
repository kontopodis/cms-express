import Pass from "../admin/modules/password.js"
import Id from "../admin/modules/id.js"
import encryptOassword from "../admin/modules/encrypt.js"
import bcrypt from 'bcrypt'
import userDB from "../admin/users/data-access/index.js"
import makeUser from "../admin/users/user/index.js"
import { expect, assert } from "chai"
import validator from "../admin/modules/email.js"
import validators from "../admin/modules/index.js"

  describe("Id tests", () => {
    let id = Id.createId();
    it("Is new id created?", () => {
      assert.isOk(id);
    });
    it("Id is from cuid?", () => {
      expect(Id.isValid(id)).to.be.a("boolean");
      expect(Id.isValid(id)).to.be.true;
      expect(Id.isValid(""), "this is not cuid id 1").to.be.false;
      expect(Id.isValid("not a cuid"), "this is not cuid id 2").to.be.false;
    });
  });

  describe("Password Test", () => {
    it("Correct password validates", () => {
      let pass = "abc4e_fA";
      expect(Pass.isValid(pass)).to.be.true;
    });
    it("Wrong password doesnt validate", () => {
      let pass = "wergt";
      expect(Pass.isValid(pass)).to.be.false;
    });
  });

  const validSupported = [
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@letters-in-local.org",
    "01234567890@numbers-in-local.net",
    "&'*+-./=?^_{}~@other-valid-characters-in-local.net",
    "mixed-1234-in-{+^}-local@sld.net",
    "a@single-character-in-local.org",
    "one-character-third-level@a.example.com",
    "single-character-in-sld@x.org",
    "local@dash-in-sld.com",
    "letters-in-sld@123.com",
    "one-letter-sld@x.org",
    "test@test--1.com",
    "uncommon-tld@sld.museum",
    "uncommon-tld@sld.travel",
    "uncommon-tld@sld.mobi",
    "country-code-tld@sld.uk",
    "country-code-tld@sld.rw",
    "local@sld.newTLD",
    "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-four-characters.and-this-address-is-254-characters-exactly.so-it-should-be-valid.and-im-going-to-add-some-more-words-here.to-increase-the-length-blah-blah-blah-blah-bla.org",
    "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-three-characters-so-it-is-valid-blah-blah.com",
    "local@sub.domains.com",
    "backticks`are`legit@test.com",
    "digit-only-domain@123.com",
    "digit-only-domain-with-subdomain@sub.123.com",
    "com@sil.c1m",
  ];

  const validUnsupported = [
    '"quoted"@sld.com',
    '"\\e\\s\\c\\a\\p\\e\\d"@sld.com',
    '"quoted-at-sign@sld.org"@sld.com',
    '"escaped\\"quote"@sld.com',
    '"back\\slash"@sld.com',
    "punycode-numbers-in-tld@sld.xn--3e0b707e",
    "bracketed-IP-instead-of-domain@[127.0.0.1]",
  ];

  const invalidSupported = [
    "@missing-local.org",
    "! #$%`|@invalid-characters-in-local.org",
    "(),:;`|@more-invalid-characters-in-local.org",
    "<>@[]\\`|@even-more-invalid-characters-in-local.org",
    ".local-starts-with-dot@sld.com",
    "local-ends-with-dot.@sld.com",
    "two..consecutive-dots@sld.com",
    'partially."quoted"@sld.com',
    "the-local-part-is-invalid-if-it-is-longer-than-sixty-four-characters@sld.net",
    "missing-sld@.com",
    "sld-starts-with-dashsh@-sld.com",
    "sld-ends-with-dash@sld-.com",
    'invalid-characters-in-sld@! "#$%(),/;<>_[]`|.org',
    "missing-dot-before-tld@com",
    "missing-tld@sld.",
    "invalid",
    "the-total-length@of-an-entire-address.cannot-be-longer-than-two-hundred-and-fifty-six-characters.and-this-address-is-257-characters-exactly.so-it-should-be-invalid.and-im-going-to-add-some-more-words-here.to-increase-the-length-blah-blah-blah-blah-blah-.org",
    "the-character-limit@for-each-part.of-the-domain.is-sixty-three-characters.this-is-exactly-sixty-four-characters-so-it-is-invalid-blah-blah.com",
    "missing-at-sign.net",
    "unbracketed-IP@127.0.0.1",
    "invalid-ip@127.0.0.1.26",
    "another-invalid-ip@127.0.0.256",
    "IP-and-port@127.0.0.1:25",
    "trailing-dots@test.de.",
    "dot-on-dot-in-domainname@te..st.de",
    "dot-first-in-domain@.test.de",
    "mg@ns.i",
    ".dot-start-and-end.@sil.com",
    "double@a@com",
    "",
    "tr119037jskc_ihndkdoz@d.aakctgajathzffcsuqyjhgjuxnuulgnhxtnbquwtgxljfayeestsjdbalthtddy.lgtmsdhywswlameglunsaplsblljavswxrltovagexhtttodqedmicsekvpmpuu.pgjvdmvzyltpixvalfbktnnpjyjqswbfvtpbfsngqtmhgamhrbqqvyvlhqigggv.nxqglspfbwdhtfpibcrccvctmoxuxwlunghhwacjtrclgirrgppvshxvrzkoifl",
  ];
  describe("TEST EMAILS AGAINST VALIDATOR", () => {
    it("Should Be Valid", () => {
      validSupported.forEach((email) => {
        expect(validator(email), email + " should be valid").to.equal(true);
      });
    });

    it("Should Be Invalid", () => {
      invalidSupported.forEach((email) => {
        expect(validator(email)).to.equal(false);
      });
    });

    it("Should Be Invalid(UnSupported By Module)", () => {
      validUnsupported.forEach((email) => {
        expect(validator(email)).to.equal(false);
      });
    });
  });
  describe("Testing validators Object", () => {
    it("Validates Email", () => {
      expect(
        validators.isValidEmail("sdg@gm.com"),
        "adg@gm.com" + " should be valid"
      ).to.equal(true);
    });
    it("Validates Passowrd", () => {
      expect(validators.isValidPassword("1Qqw_e45t")).to.equal(true);
    });
    it("Validates Id", () => {
      expect(validators.isValidId(Id.createId())).to.equal(true);
    });
  });

  describe("Encrypt Tests",()=>{
    after("Cleaning up", async () => {
      const db = userDB

      let allUsers = await db.findAll();
      if(allUsers.length > 0){
        for(let i=0;i<allUsers.length;i++){
          await db.deleteUserByEmail(allUsers[i].email);
        }
      }
      let noneUser = await db.findAll()
      expect(noneUser).to.be.a("array");
      expect(noneUser.length).to.be.equal(0);
    });
    const validUser={
      id : Id.createId(),
      username:"manos",
      password:"1_aAhsbx2",
      createdOn : Date.now(),
      role:"admin",
      salt:"active",
      email:"asd@gmail.com",
      lastLogin : Date.now(),
  }
    it("Encrypts passwords", async ()=>{
      let user = makeUser(validUser)
       let hash = await encryptOassword(user.getPassword())
       let ok = await bcrypt.compare(user.getPassword(),hash)
       expect(ok).to.be.true
    })
   })
   

