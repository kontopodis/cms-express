const {expect} = require("chai")
const articleService = require("./index")
const modules = require("../../modules")
const validArticle={
    id:modules.createId(),
    authorId:modules.createId(),
    title:"Sample title",
    content:"Sample Content",
    imageUrl:"sample/url",

}
const validArticle2={
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
module.exports = ()=>{
    describe("Article Use Cases",()=>{
        after("clean up",async ()=>{
            const articles = await articleService.getAllArticles()
            articles.map((article)=>{
                articleService.deleteArticle(article.id)
            })
        })
        it("Should insert an article",async ()=>{
            const res = await articleService.addArticle(validArticle)
            expect(res).to.be.true
        })
        it("Should update an article ",async ()=>{
            validArticle.content = "Updated article"
            const res = await articleService.updateArticle(validArticle)
            expect(res).to.be.true
        })
        it("Should give an article by id", async ()=>{
            const res = await articleService.getArticleById(validArticle.id)
            expect(res.id).to.be.equal(validArticle.id)
        })
        it("Should give many articles",async ()=>{
            await articleService.addArticle(validArticle2)
            const res = await articleService.getAllArticles()
            expect(res).to.be.a("array")
            expect(res.length).to.be.above(1)
        })
    })
}