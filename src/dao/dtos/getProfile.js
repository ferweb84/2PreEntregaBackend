export class GetProfile {
  constructor(user) {
      this.name = user.name;
      this.email = user.email;
      this.age = user.age;
      this.rol = user.rol;
      this.cart = user.cart;
  }
}