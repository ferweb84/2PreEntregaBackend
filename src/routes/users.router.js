import { Router } from "express";
import { getUsers, getUsersById, createUser } from "../controllers/users.controller.js";

const router = Router();

router.get ("/",getUsers );
router.get ("/:uid",getUsersById );
router.post ("/",createUser);


export default router;