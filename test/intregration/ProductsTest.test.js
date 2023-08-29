import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Integration Test suite for Products router', function () {
  this.timeout(10000)
  this.productId = ''
  

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
  
})