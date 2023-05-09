import { Server } from "socket.io";
import ProductManager from "./dao/dbManagers/productdbManager.js"


const socket = {};

socket.connect = (server) => {
  const productManager = new ProductManager();

  socket.io = new Server(server);

  let { io } = socket;

  io.on("connection", async (socket) => {
    console.log(`Socket ${socket.id} is online!`);

    const products = await productManager.getProducts();
    io.emit("products", products);

  });
};
export	default socket;