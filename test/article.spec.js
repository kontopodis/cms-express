import makeArticle from "../admin/articles/article/index.js"
import modules from "../admin/modules/index.js"
import {expect} from "chai"
const validArticle={
    id:modules.createId(),
    authorId:modules.createId(),
    title:"Sample title",
    content:"Sample Content",
    imageUrl:"sample/url",

}
const invalidArticle={
    id:modules.createId(),
    authorId:modules.createId(),
    title: false,
    content:"Sample Content",
    imageUrl:"sample/url",

}


    describe("Article tests",()=>{
        it("Should create an Article instance",()=>{
            const article = makeArticle(validArticle)
            expect(article.getTitle()).to.be.equal("Sample title")
        })
        it("Should throw an error on creating article instance",()=>{
            
            expect(()=>makeArticle(invalidArticle)).to.throw("Article must have a title")
        })
    })


