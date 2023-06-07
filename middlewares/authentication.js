import { apiResponser } from "../src/traits/ApiResponser.js";

export function authentication(redirect = false) {
    return (req, res, next) => {
        if(redirect && req.session.user === undefined) return res.redirect('/login');
        if(req.session.user === undefined) return apiResponser.errorResponse(res, `Unauthenticated`, 401);

        next();
    }
}