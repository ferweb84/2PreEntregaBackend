import messagesModel from "../models/messages.js";
import socket from "../../socket.js";

export default class Message {
  constructor() {}

  createMessage = async function (message) {
    try {
      const createdMessage = await messagesModel.create(message);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };

  getMessages = async function () {
    try {
      const messages = await messagesModel.find().lean();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };
  saveMessage = async (message) => {
    try {
      const createdMessage = await messageModel.create(message);
      socket.io.emit("message_add", createdMessage);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };
}

export const messageDAO =new Message();