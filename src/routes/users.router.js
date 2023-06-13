import { Router } from "express";
import { getUsers, getUsersById, createUser } from "../controllers/users.controller.js";
import { generateUser } from "../utils.js";


const router = Router();

router.get ("/",getUsers );
router.get ("/:uid",getUsersById );
router.post ("/",createUser);

//router Faker
let users =[];
router.get("/users",(req,res)=>{
    for (let i=0; i<100; i++){
        users.push(generateUser());
    }
    res.send({status:"success", payload: users});


});

export default router;