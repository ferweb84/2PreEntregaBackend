import { GetProfile } from "../dao/dtos/getProfile.js";
import { userService } from "../services/user.service.js";
import { apiResponser } from "../traits/ApiResponser.js";

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        
        if(result && result.error) {
            return apiResponser.errorResponse(res, result.error, 400);
        }

        req.session.user = {
            name: `${result.first_name} ${result.last_name}`,
            email: result.email,
            age: result.age,
            rol: result.role,
            cart: result.cart
        };

        return apiResponser.successResponse(res, req.session.user);

    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function failLogin(req, res) {
    try {
        return apiResponser.errorResponse(res, `Credenciales inválidas`, 400);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function register(req, res) {
    
    const {first_name, last_name, email,password} =req.body;
    console.log(`Registering ${first_name} ${last_name}email:${email}and pwd:${password}`)
    
    try {
        return apiResponser.successResponse(res, `Usuario registrado con éxito.`);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function failRegister(req, res) {
    try {
        return apiResponser.errorResponse(res, `El usuario ya se encuentra registrado.`);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function logout(req, res) {
    try {
        req.session.destroy((error) => {
            if(error) {
                apiResponser.errorResponse(res, error);
            } else {
                res.redirect('/login');
            }
        });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function current(req, res) {
    try {
        const getProfile = new GetProfile(req.session.user);
        return apiResponser.successResponse(res, getProfile);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function github(req, res) {
    try {
        
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function githubCallback(req, res) {
    try {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            rol: req.user.role,
            cart: req.user.cart
        }
        res.redirect("/products");
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};