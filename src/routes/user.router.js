import { Router } from "express";
import { changeRole } from "../controllers/user.controller.js";
import { authentication } from "../../middlewares/authentication.js";
import { authorize } from "../../middlewares/authorization.js";

const router = Router();

router.post('/premium/:id', authentication(), authorize(['admin']), changeRole);

export default router;