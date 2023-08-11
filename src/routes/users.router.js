import {Router}  from "express";
import { updateFunctionuser,updateUserDocuments,changeroleUser,updateProfile,getallTheusers,deleteForinactivity,deleteUserByCartId } from "../controllers/users.controller.js";
import { userService } from "../dao/services/user.service.js";
import passport from "passport";
import { uploader } from '../dirname.js'
import { roladm } from "../../middlewares/auth.js";
const router = Router();
// router.put("/premium/:uid",updateFunctionuser);
router.get("/",passport.authenticate("jwt",{session:false}),getallTheusers)
router.get("/:uid",passport.authenticate("jwt",{session: false}),async (req,res)=>{
    const{uid}=req.params
    let result= await userService.findbyuserid({_id:uid})
    return res.send({ status: "user successfully obtained", payload: result});
})

router.post(
  '/premium/:uid',
  passport.authenticate('jwt', { session: false }),
 
  changeroleUser
)


  router.post(
    '/:uid/documents',
    uploader.fields([
      { name: 'identification' },
      { name: 'address' },
      { name: 'statement' }
    ]),
    updateUserDocuments
  )
  router.post(
    '/:uid/profile',
    uploader.single('profile'),
    updateProfile
  )

  router.delete(
    '/inactive',
    passport.authenticate('jwt', { session: false }),roladm,
    deleteForinactivity
  )
  router.delete(
    '/:cid',
    passport.authenticate('jwt', { session: false }),
    deleteUserByCartId
  )
  

export default router