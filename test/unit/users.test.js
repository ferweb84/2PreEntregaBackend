import Assert from "assert";
import mongoose from "mongoose";
import config from "../../src/config.js";
import Users from "../../src/dao/dbManagers/User.js"

const assert = Assert.strict;


mongoose.connect("mongodb+srv://ferwebreyna:IauhoPO6IpHisqUq@cluster0.i602mg0.mongodb.net/test?retryWrites=true&w=majority");

let mockUser = {
  first_name: "Coder",
  last_name: "House",
  email: "prueba@correo.com",
  password: "123",
};

describe(" Set de Pruebas User DAO", function()  {

  before(function () {

    this.users = new Users();
  });

  beforeEach(function () {
    mongoose.connection.collections.user.drop();
  });

  it("El Dao debe retornar los usuarios en un array", async function () {
    const result = await this.user.findOne();
    assert.strictEqual(Array.isArray(result), true);
  });


//   it("El Dao debe agregar un usuario correctamente a la base de datos", async function () {
//     const result = await this.usersDao.save(mockUser);
//     assert.ok(result._id);
//   });

//   it("El Dao debe agregar al documento insertado un arreglo de mascotas vacio por defecto", async function () {
//     const result = await this.usersDao.save(mockUser);
//     assert.deepStrictEqual(result.pets, []);
//   });

//   it("El Dao puede obtener un usuario por email", async function () {
//     const result = await this.usersDao.save(mockUser);

//     const user = await this.usersDao.getBy({ email: result.email });
//     assert.strictEqual(typeof user, "object");
//   });
});