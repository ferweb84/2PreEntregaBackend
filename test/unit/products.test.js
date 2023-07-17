import chai from "chai"
import supertest from "supertest"
import config from "../../src/config.js";
import { ProductsMock } from "../../src/mocking.js";
const expect = chai.expect;


const requester = supertest("http://localhost:8080")
before(function () {

  this.productMock = new ProductsMock();
});
describe("Set de pruebas para los productos", function () {
  const product = {
    
title:"leche",
description:"dolca",
code:"694",
status:false,
price:"$1481.65",
category:"limpieza",
owner: "admin",
stock: 34,
image:"http://dummyimage.com/216x100.png/ff4444/ffffff",
}

  it("GET /api/products/ GET debe retornar todos los productos", async function () {
    const result = await requester.get("/api/products/")
    expect(result.status).to.be.eql(200)
  }).timeout(10000);


  it("GET /api/products/:pid debe retornar un producto", async function () {
    const result = await requester.get("/api/products/643c1d3d69ce9221316cc170")
    //console.log(result)

    expect(result._body.payload).to.have.property("_id");
    expect(result._body.payload._id).to.be.eql("643c1d3d69ce9221316cc170")
    expect(result.status).to.be.eql(200)

  }).timeout(10000)



  it("POST /api/products Debe crear un producto correctamente", async function () {

    const result = await requester.post("/api/products")
    .field("title", product.title)
    .field("description", product.description)
    .field("price", product.price).field("status", product.status)
    .field("code", product.code)
    .field("stock", product.stock)
    .field("category", product.category)
    .field("owner", product.owner)
    .attach("thumbnails", product.thumbnails)
   // expect(response.headers["Content-Type"]).toMatch(/json/);
   // expect(result.status).to.be.eql(200);

   // expect(response.body.email).toEqual('foo@bar.com');
    // console.log(result)
    // expect(result.status).to.be.eql(500);
    // expect(result._body.payload).to.have.property("_id");
  }).timeout(10000)


}).timeout(10000)