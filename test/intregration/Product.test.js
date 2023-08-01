import chai from "chai";
import supertest from "supertest";
import config from "./../../src/config/config.js";
import mongoose from "mongoose";


const {
    mongo: { dbUrl },
    server: { appUrl }
} = config;

const expect = chai.expect;
let requester = supertest(appUrl);

describe("Set de pruebas de integración para el módulo de productos", function() {
    this.timeout(30000);
    this.cookie;

    before(async function() {
        await mongoose.connect(dbUrl);
        const credentials = {
            email: "ferweb.reyna@gmail.com",
            password: "123"
        };
        const result = await requester.post("/api/sessions/login").send(credentials);

        const cookieResult = result.headers["set-cookie"][0];
        const cookieSplit = cookieResult.split("=");

        this.cookie = {
            name: cookieSplit[0],
            value: cookieSplit[1]
        }
    });

    beforeEach(async function(){
        const collections = await mongoose.connection.db.collections();
        if (collections.some(collection => collection.collectionName === 'products')) {
            await mongoose.connection.dropCollection("products");
        }
    });    

    after(async function() {
        await mongoose.connection.close();
    });


    const productMock = {
        title: "test",
        description: "test",
        price: 2000,
        status: 1,
        code: 1,
        stock: 1,
        category: "test",
    };

    describe("Pruebas para el metodo POST en la url de /api/products", function() {
        it("Debe crear un producto correctamente", async function() {
            const res = await requester.post("/api/products")
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .field("title", productMock.title)
                .field("description", productMock.description)
                .field("price", productMock.price)
                .field("status", productMock.status)
                .field("code", productMock.code)
                .field("stock", productMock.stock)
                .field("category", productMock.category)
                .attach("thumbnails", "./test/integration/assets/dog.jpg");
    
            expect(res.status).be.equal(200);
            expect(res._body.payload).to.have.property("_id");
        });
    
        it("Debe retornar un error al no envíar el cuerpo del producto", async function(){
            const res = await requester.post("/api/products")
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .attach("thumbnails", "./test/integration/assets/yerba-amanda-500.png");
    
            expect(res.status).be.equal(500);
            expect(res._body).to.have.property("error");
            expect(res._body.error).be.equal("Product error: All fields are required");
        });
    
        it("Debe retornar un error al no enviar una imagen para el producto", async function(){
            const res = await requester.post("/api/products")
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .field("title", productMock.title)
                .field("description", productMock.description)
                .field("price", productMock.price)
                .field("status", productMock.status)
                .field("code", productMock.code)
                .field("stock", productMock.stock)
                .field("category", productMock.category);
        
            expect(res.status).to.be.equal(500);
            expect(res._body.status).to.be.equal("Error");
            expect(res._body).to.have.property("error");
            expect(res._body.error).to.be.equal("Thumbnail not uploaded");
        });
    });

    describe("Pruebas para el metodo PUT en la url de /api/products/{id}", function() {
        it("Debe actualizar un producto de forma correcta", async function() {
            const createProduct = await requester.post("/api/products")
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .field("title", productMock.title)
                .field("description", productMock.description)
                .field("price", productMock.price)
                .field("status", productMock.status)
                .field("code", productMock.code)
                .field("stock", productMock.stock)
                .field("category", productMock.category)
                .attach("thumbnails", "./test/integration/assets/yerba-amanda-500.png");

            const productDataToUpdate = {
                title: "update",
                description: "update",
                price: 1,
                status: 0,
                code: 2,
                stock: 2,
                category: "update",
            };

            const res = await requester.put(`/api/products/${createProduct._body.payload._id}`)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .send(productDataToUpdate);

            expect(res.status).to.be.equal(200);
            expect(res._body.payload.title).to.be.equal(productDataToUpdate.title);
            expect(res._body.payload.description).to.be.equal(productDataToUpdate.description);
            expect(res._body.payload.price).to.be.equal(productDataToUpdate.price);
            expect(res._body.payload.status).to.be.equal(productDataToUpdate.status);
            expect(res._body.payload.code).to.be.equal(productDataToUpdate.code);
            expect(res._body.payload.stock).to.be.equal(productDataToUpdate.stock);
            expect(res._body.payload.category).to.be.equal(productDataToUpdate.category);
        });

        it("Debe retornar un error al no enviar todos los datos requeridos para actualizar el producto", async function() {
            const createProduct = await requester.post("/api/products")
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .field("title", productMock.title)
                .field("description", productMock.description)
                .field("price", productMock.price)
                .field("status", productMock.status)
                .field("code", productMock.code)
                .field("stock", productMock.stock)
                .field("category", productMock.category)
                .attach("thumbnails", "./test/integration/assets/yerba-amanda-500.png");
            
            const res = await requester.put(`/api/products/${createProduct._body.payload._id}`)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

            expect(res.status).to.be.equal(500);
            expect(res._body.status).to.be.equal("Error");
            expect(res._body).to.have.property("error");
            expect(res._body.error).to.be.equal("Product error: All fields are required");
        });

        it("Debe retornar un mensaje de error al no encontrar el producto a actualizar", async function() {            
            const res = await requester.put(`/api/products/643d9c93ae6c641e5f14dad4`)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

            expect(res.status).to.be.equal(500);
            expect(res._body.status).to.be.equal("Error");
            expect(res._body).to.have.property("error");
            expect(res._body.error).to.be.equal("Product error: Product does not exist");
        });
    });

    describe("Pruebas para el metodo DELETE en la url de /api/products/{id}", function() {
        it("Debe eliminar un producto de forma correcta", async function() {
            const createProduct = await requester.post("/api/products")
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
                .field("title", productMock.title)
                .field("description", productMock.description)
                .field("price", productMock.price)
                .field("status", productMock.status)
                .field("code", productMock.code)
                .field("stock", productMock.stock)
                .field("category", productMock.category)
                .attach("thumbnails", "./test/integration/assets/yerba-amanda-500.png");

            const deleteProduct = await requester.delete(`/api/products/${createProduct._body.payload._id}`)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

            expect(deleteProduct).to.be.ok;
            expect(deleteProduct.status).to.be.equal(200);
            
            const checkIfIsDeleted = await requester.get(`/api/products/${createProduct._body.payload._id}`)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);


            expect(checkIfIsDeleted._body.status).to.be.equal("Error");
            expect(checkIfIsDeleted._body).to.have.property("error");
            expect(checkIfIsDeleted._body.error).to.be.equal("Product error: Product does not exist");
        });
    });
    
});