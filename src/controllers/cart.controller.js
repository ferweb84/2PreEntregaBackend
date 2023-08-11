import { ticketService } from "../dao/services/ticket.service.js";
import { cartService } from "../dao/services/cart.service.js";
import { userService } from "../dao/services/user.service.js";
import { productService } from "../dao/services/product.service.js"

export async function createCart(req, res) {
    try {
        const cart = req.body;
        const createdCart = await cartService.createCart(cart);    
      if (!createdCart) {
        return res
          .status(400)
          .send({ status: "error", message: "Error to create cart", error: "No se pudo crear el carrito" });
      }
      return res.send({ status: "success", message: "cart created", payload: createdCart});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
export async function getCartsall(req, res) {
    try {
        const consulta = await cartService.getCarts();
        return res.send({ status: "Success", payload: consulta });
    } catch (error) {
        req.logger.error(`Cannot get all the carts ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to load the carts",
        });
    }
}

export async function getCartbyId(req, res) {
    try {
        const cartId = req.params.cid;

        const cart = await cartService.getCartsbyId(cartId);

        if (!cart) {

            return res.status(404).send({
                status: "Error",
                error: "Cart was not found",
            });
        }
        return res.send({ status: "OK", message: "Cart found", payload: cart });

    } catch (error) {
        req.logger.error(`Error to get the cart ${error}`)
        return res.status(500).send({
            status: "error",
            error: "Cannot get cart with mongoose",
        });
    }
}
export async function addProductcart(req, res) {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body
        let resul = {}
        console.log(req.user)
        let prod = await productService.getProductsbyitsId(pId);
        let user=await userService.findbyuserid({_id:req.user.id})
        console.log(user)
        if (user.role === "premium" || user.role === "admin") {
            if (user.email !== prod.owner) {
                resul = await cartService.addProductCart(cId, pId, quantity);

            } else {
                return res
                    .status(500)
                    .send({ status: "error", error: "You cannot add the product because you are the owner" });
            }
        } else {
            
            resul = await cartService.addProductCart(cId, pId, quantity);
        }

        if (!resul || typeof resul === "string") {
            return res
                .status(400)
                .send({ status: "error", error: resul });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        req.logger.error(`Cannot add products to the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to add products to the cart",
        });
    }
}
export async function updatetheCart(req, res) {
    try {
        const id = req.params.cid
        const valor = req.body;
        const result = await cartService.updateCart(id, valor)
        if (!result) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be updated" });
        }
        return res.send({ status: "success", payload: result });
    } catch (error) {
        req.logger.error(`Cannot update the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to update the cart",
        });
    }
}
export async function updateProductFromtheCart(req, res) {
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        const { quantity } = req.body


        let resul = await cartService.updateProductFromCart(cId, pId, quantity);
        if (!resul) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        req.logger.error(`Cannot update the quantity of products of the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to update the quantity of products of the cart",
        });
    }
}
export async function deletetheCart(req, res) {
    try {

        const cId = req.params.cid;

        let resultado = await cartService.deleteCart(cId);
        if (!resultado) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart can not be eliminated" });
        }
        return res.send({ status: "success", payload: resultado });
    } catch (error) {
        req.logger.error(`Cannot to delete the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to delete the cart",
        });
    }
}
export async function deleteproductFromthecart(req, res) {
    try {
        const { cid, pid } = req.params



        let resul = await cartService.deleteproductfromCart(cid, pid);
        if (!resul) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: resul });

    } catch (error) {
        req.logger.error(`Cannot update the quantity of products of the cart with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to delete products from the cart",
        });
    }
}
export async function purchase(req, res) {
    try {
        const { cid } = req.params

        const response = await ticketService.createTickettoCart(cid)
        if (!response) {
            return res
                .status(400)
                .send({ status: "error", error: "The cart does not exists" });
        }
        return res.send({ status: "success", payload: response });
    } catch (error) {
        req.logger.error(`Failed to make a ticket with mongoose`);
        return res.status(500).send({
            status: "error",
            error: "Failed to make the ticket",
        });
    }

}