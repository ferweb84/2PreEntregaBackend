import { userService } from "../services/index.js";
import { apiResponser } from "../traits/ApiResponser.js";

export async function changeRole(req, res) {
    try {
        const { id } = req.params;
        const result = await userService.changeRole(id);
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}