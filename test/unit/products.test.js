import chai from "chai"

import config from "../../src/config.js";

import { productMongo } from "../../src/dao/dbManagers/productdbManager.js";

import mongoose from "mongoose";
const expect = chai.expect;
//const requester = supertest("http://localhost:8080")
const { dbUrl } = config
describe("Set de pruebas para los productos", function () {
  this.timeout(10000)
  before(function () {

    mongoose.connect(dbUrl)

    this.productId = ''
    this.productsDao = productMongo
  });
  // it('addProduct creates new product with valid input', async function () {
  //   const productMock = {
  //     title: 'Test Products',
  //     description: 'This is a Test Product to add ',
  //     code: "PR222",
  //     price: 10,
  //     stock: 555,
  //     owner: "admin",
  //     category: 'Procesador',
  //     thumbnails: ['image1.jpg', 'image3.jpg']
  //   }
  //   const result = await this.productsDao.createProduct(productMock)
  //   console.log(result)
  //   this.productId = result._id.toString()
  //   console.log(this.productId)
  //   expect(result).to.have.property('_id')
  // })


  // it('getProducts returns an array of products', async function () {
  //   const { docs } = await this.products.getProducts()

  //   expect(docs).to.be.a('array')
  // })

  // it('getProducts returns expected products with valid input', async function () {

  //   const result = await this.products.getProducts(1, 5, 'Procesador', 'true', 1)

  //   expect(result.docs.length).to.be.lessThanOrEqual(10)
  // })

  // it('getProductById returns expected product with valid input', async function () {
  //   const result = await this.products.getProductsbyId(this.productId)

  //   expect(result).to.have.property('_id')
  // })

  // it('updateProduct modifies a product successfully', async function () {
  //   const example = {
  //     category: 'test'
  //   }
  //   const result = await this.products.updateProduct(this.productId, example)
  //   const productAfter = await this.products.getProductsbyId(this.productId)
  //   console.log(result.modifiedCount)
  //   expect(result).to.have.property('modifiedCount').eq(1)
  //   expect(productAfter.category).to.eq('test')
  // })
  // it('deleteProduct deletes a product successfully', async function () {
  //   const result = await this.products.deleteProduct(this.productId)
  //   const productsAfter = await this.products.getProducts()

  //   expect(result).to.have.property('deletedCount').eq(1)
  //   expect(productsAfter.docs).to.be.deep.eq([])
  // })
})