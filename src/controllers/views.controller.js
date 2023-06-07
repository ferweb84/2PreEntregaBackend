import { productService } from "../services/products.service.js";
import { cartService } from "../services/cart.service.js";
import { ticketService } from "../services/ticket.service.js";
import { apiResponser } from "../traits/ApiResponser.js";
import { GetProfile } from "../dao/dtos/getProfile.js";

export async function home(req, res) {
    try {
        const { limit = 10, page = 1, query = "{}", sort = null } = req.query;
        const { category, status } = JSON.parse(query);

        const filters = {};
        if (category) filters.category = category;
        if (status) filters.status = status;
        
        const options = { limit, page };
        if (sort) options.sort = sort;

        const result = await productService.findAll(page, filters, options);
        const totalPages = result.totalPages;
        const prevPage = result.hasPrevPage ? result.prevPage : null;
        const nextPage = result.hasNextPage ? result.nextPage : null;
        const hasPrevPage = result.hasPrevPage;
        const hasNextPage = result.hasNextPage;
        const prevLink = prevPage ? `/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null;
        const nextLink = nextPage ? `/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null;
        const payload = JSON.parse(JSON.stringify(result.docs));
        if (result && result.error) {
            return apiResponser.errorResponse(res, result.error, 400); 
        }

        res.render('home', {
            payload,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            user: req.session.user
        });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function getProducts(req, res) {
    try {
        const { limit = 10, page = 1, query = "{}", sort = null } = req.query;
        const { category, status } = JSON.parse(query);

        const filters = {};
        if (category) filters.category = category;
        if (status) filters.status = status;
        
        const options = { limit, page };
        if (sort) options.sort = sort;

        const result = await productService.findAll(page, filters, options);
        const totalPages = result.totalPages;
        const prevPage = result.hasPrevPage ? result.prevPage : null;
        const nextPage = result.hasNextPage ? result.nextPage : null;
        const hasPrevPage = result.hasPrevPage;
        const hasNextPage = result.hasNextPage;
        const prevLink = prevPage ? `/products?limit=${limit}&page=${prevPage}&query=${query}&sort=${sort}` : null;
        const nextLink = nextPage ? `/products?limit=${limit}&page=${nextPage}&query=${query}&sort=${sort}` : null;
        const payload = JSON.parse(JSON.stringify(result.docs));
        if (result && result.error) {
            return apiResponser.errorResponse(res, result.error, 400); 
        }

        res.render("products", {
            payload,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
            user: req.session.user
        });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function viewProduct(req, res) {
    try {
        const { productId } = req.params;
        const result = await productService.findOne(productId);
        if(result && result.error) {
            return apiResponser.errorResponse(res, result.error, 400);
        }
        res.render('product', {
            product: JSON.parse(JSON.stringify(result)),
            user: req.session.user
        });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function viewCart(req, res) {
    try {
        const { cartId } = req.params;
        const result = await cartService.findOne(cartId);
        if(result && result.error) {
            return apiResponser.errorResponse(res, result.error);
        }
        res.render('cart', {
            cart: JSON.parse(JSON.stringify(result)),
            user: req.session.user
        });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function purchase(req, res) {
    try {
        const { cartId } = req.params;
        const result = await ticketService.createTicket(cartId);
        
        res.render('purchase', {
            ticket: JSON.parse(JSON.stringify(result)),
            user: req.session.user
        });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function register(req, res) {
    try {
        res.render('register');      
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function login(req, res) {
    try {
        res.render('login');      
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function profile(req, res) {
    try {
        const getProfile = new GetProfile(req.session.user);
        res.render('profile', { user: getProfile });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};