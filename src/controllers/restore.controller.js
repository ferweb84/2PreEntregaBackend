import { apiResponser } from "../traits/ApiResponser.js";
import { restoreService } from "../services/index.js";

export async function restore(req, res) {
    try {
        const { email } = req.body;

        await restoreService.createRestore(email);

        return apiResponser.successResponse(res, `Se ha enviado un correo para restablecer la contraseña`, 200);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function changePassword(req, res) {
    try {
        const { newPassword } = req.body;
        const { token } = req.query;
        const changePassword = await restoreService.changePassword(token, newPassword);

        return apiResponser.successResponse(res, changePassword);

    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}