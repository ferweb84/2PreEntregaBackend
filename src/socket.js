import { Server } from "socket.io";
import ProductManager from "./dao/dbManagers/productdbManager.js"
import MessageManager from "./dao/dbManagers/messagedbManager.js";


const socket = {};

socket.connect = (server) => {
  const productManager = new ProductManager();
  const messageManager = new MessageManager();

  socket.io = new Server(server);

  let { io } = socket;

  io.on("connection", async (socket) => {
    console.log(`Socket ${socket.id} is online!`);

    const products = await productManager.getProducts();
    io.emit("products", products);

    socket.on("message", async (data) => {
      await messageManager.saveMessage (data);
      let messages = await messageManager.getMessages();
      io.emit("messageLogs",messages);
    });

    socket.on("user-autenticated", async (data) => {
      let messages=await messageManager.getMessages();
      io.emit ("messageLogs",messages);
      socket.broadcast.emit("user-connected", data);
      
    });
  });
};
export	default socket;