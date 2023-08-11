import chai from 'chai'
import supertest from 'supertest'

//import config from '../../src/config'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Integration Test suite for Products router', function () {
  this.timeout(10000)
  this.productId = ''
  //this.cookie = {}

  before(async function () {

    // const adminUser = {
    //   email: config.admin.ADMIN_EMAIL,
    //   password: config.admin.ADMIN_PASSWORD
    // }

    // const result = await requester.post('/api/v1/users/login').send(adminUser)
    // const cookieResult = result.headers['set-cookie'][0]

    // this.cookie = {
    //   name: cookieResult.split('=')[0],
    //   value: cookieResult.split('=')[1]
    // }
  })

  // it("POST /api/sessions/login: Debe loguear correctamente al usuario", async function () {
  //   const mockUser = {
  //     email: "correos@com",
  //     password: "1234",
  //   };

  //   const result = await requester.post("/api/sessions/login").send(mockUser);
  //   console.log(result);
  //   expect(result._body.status).to.have.property("id");
  //   expect(result.status).to.be.eql(200)
  // });
  // it("GET current user",async function(){
  //   const result = await requester.get("api/sessions/current")
  //   expect(result._body.status).to.have.property("first_name");
  //   expect(result.status).to.be.eql(200)
  // })
  // try {
  //   it('Endpoint /api/products/:pid (PUT) updates a product successfully with valid product ID input', async function () {
  //     const productUpdate = {
  //       category: 'TEST'
  //     }

  //     const result = await requester
  //       .put('/api/products/64b71da96c9723f42d160aca')
  //       //   .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
  //       .send(productUpdate)
  //     console.log(result)
  //     expect(result.statusCode).to.be.and.eq(500)
  //     expect(result._body.payload).to.have.property('modifiedCount').eq(1)
  //     expect(result.ok).to.be.ok
  //   })

  // } catch (error) {
  //   throw new error()
  // }
  // it('Endpoint /api/v1/products/mockingproducts (GET) returns an array of 50 fake products', async function () {
  //   const { statusCode, ok, _body } = await requester
  //     .get('/api/v1/products/mockingproducts')
  //     .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

  //   expect(statusCode).to.be.ok.and.eq(200)
  //   expect(_body.payload.length).to.be.eq(50)
  //   expect(ok).to.be.ok
  // })
  // try {
  //   it('/api/products/ (POST) creates new product with valid input', async function () {
  //     const productMock = {
  //       title: 'Test Product',
  //       description: 'This is a Test Product',
  //       code: "pr333",
  //       price: 10,
  //       stock: 5,
  //       status:true,
  //       owner: 'admin',
  //       category: 'GPU',
  //       thumbnails: ['image1.jpg', 'image2.jpg']
  //     }

  //     const result= await requester
  //       .post('/api/products').send(productMock)
  // //      // .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

  // //     console.log(_body)
  //     this.productId = result_body.payload._id.toString()

  //     expect(result.statusCode).to.be.ok.and.eq(200)
  //     //expect(result._body.payload.length).to.be.eq(50)
  //     expect(result.ok).to.be.ok
  //   })
  // } catch (error) {
  //     throw new error();
  // }


    it('/api/products (GET) returns an array of products', async function () {
      const { statusCode, ok, _body } = await requester.get('/api/products')

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload).to.have.property('docs')
      expect(ok).to.be.ok
    })

    it('Endpoint /api/products/:pid (GET) returns expected product with valid product ID input', async function () {
      const { statusCode, ok, _body } = await requester.get(
        `/api/products/643f197c4dda5576da9fadf9`
      )

      expect(statusCode).to.be.ok.and.eq(200)
      expect(_body.payload._id).to.be.eq("643f197c4dda5576da9fadf9")
      expect(ok).to.be.ok
    })
  

  //   it('Endpoint /api/products/:pid (DELETE) deletes a product successfully with valid product ID input', async function () {
  //     const { statusCode, ok, _body } = await requester
  //       .delete(`/api/v1/products/${this.productId}`)
  //     //  .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])

  //     expect(statusCode).to.be.ok.and.eq(200)
  //     expect(_body.payload).to.have.property('deletedCount').eq(1)
  //     expect(ok).to.be.ok
  //   })
})