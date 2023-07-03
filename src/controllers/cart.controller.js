import { apiResponser } from "../traits/ApiResponser.js";
import { cartService,ticketService } from "../services/index.js";

export async function findAll(req, res) {
    try {
        const result = await cartService.findAll();
        return apiResponser.successResponse(res, result);

    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function findOne(req, res) {
    try {
        const { cartId } = req.params; 

        const result = await cartService.findOne(cartId);

        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);       
    }
};

export async function createCart(req, res) {
    try {
        const cart = {
            products: []
        }; 

        const result = await cartService.createCart(cart);

        return apiResponser.successResponse(res, {id: result._id, message: `Carrito creado.`});

    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function addProductToCart(req, res) {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const result = await cartService.addProductToCart(cartId, productId, quantity, req.session.user.id);


        return apiResponser.successResponse(res, result);

    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function deleteProductFromCart(req, res) {
    try {
        const { cartId, productId } = req.params;

        const result = await cartService.deleteProductFromCart(cartId, productId);

        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error);
    }
};

export async function deleteAllProductsFromCart(req, res) {
    try {
        const { cartId } = req.params;

        const result = await cartService.deleteAllProductsFromCart(cartId);
        
        return apiResponser.successResponse(res, result);

    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function putManyProductsInCart(req, res) {
    try {
        const { cartId } = req.params;
        const { products } = req.body;

        const result = await cartService.putManyProductsInCart(cartId, products);

        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function updateQuantityOfProduct(req, res) {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;

        const result = await cartService.updateQuantityOfProduct(cartId, productId, quantity);
        
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function purchase(req, res) {
    try {
        const { cartId } = req.params;
        const result = await ticketService.createTicket(cartId);
        
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}