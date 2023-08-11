import { productService } from '../dao/services/product.service.js';
import { cartService } from '../dao/services/cart.service.js';
import { messagesService } from '../dao/services/messages.service.js';
import { ticketService } from '../dao/services/ticket.service.js';
import { userService } from '../dao/services/user.service.js';
import __dirname from '../dirname.js';
import config from "../config.js";
import jwt from "jsonwebtoken"
export async function getViewProducts(req,res){

    

    const { limit = 2, page = 1, category, usable, sort } = req.query;
    const {
        docs: products,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
      } = await productService.getProductsfilterPage(page, limit, category, usable, sort);


      res.render("products", {
      
        user:req.user,
        products,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
   
      });
}


export async function getProductwithitsid(req,res){
    const { pid } = req.params;
    console.log(req.user)
    const product = await productService.getProductsbyitsId(pid);
    res.render("product", {
      user:req.user,

      product,
      
  
    });
}
export async function getCartwithitsId(req,res){
    const { cid } = req.params;
    const cart = await cartService.getCartsbyId(cid);
    res.render("cart", {
      cart,
    });
}
export async function ticket(req,res){
  const { cid }=req.params

  const ticketFinal= await ticketService.createTickettoCart(cid)
  
  res.render("ticket",{
    ticketFinal: JSON.parse(JSON.stringify(ticketFinal)),
    user: req.user
  })

}

export function mailtorecovery(req,res){
  return res.render("formemailrecovery")
}
export async function recoverpassword(req,res){

  const { token} = req.params;

  const decodedToken = jwt.verify(token,config.sessionSecret);

  const recUser = await userService.findbyuserid({email:decodedToken.email})
  console.log(recUser.tokenExpiration);
  return res.render("recoverypassword")
}
export function loginView(req,res){

   return res.render("login");
}
export function registerView(req,res){
    return res.render("register");
}
export function getAdminview(req,res){
  return res.render("admin")
}
export function formproducts(req,res){
  return res.render("form-products")
}
export function productsInformation(req,res){
  return res.render("products", { user: req.user });
}
export const chatView = async (req, res) => {
  try {
    const messages = await messagesService.getMessages();
    res.render("chat", {
      messages,
      style: "styles.css",
      title: "Chat",
    });

    if (!messages) {
      return res.status(404).render("error", {
        message: "Error 404: Messages not found",
      
   
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: "Failed to render chat view" });
  }
};