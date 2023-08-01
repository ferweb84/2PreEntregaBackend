import { Router } from "express";
import { changeRole } from "../controllers/user.controller.js";
import { authentication } from "../../middlewares/authentication.js";
import { authorize } from "../../middlewares/authorization.js";

const router = Router();

router.post('/premium/:id', authentication(), authorize(['admin']), changeRole);

// usersRouter.post(
//     '/:uid/status',
//     passport.authenticate('jwt', { session: false }),
//     currentUserStatus
//   )

// usersRouter.post('/premium/:uid',
//     passport.authenticate('jwt', { session: false }),
//     (req, res, next) => verifyRole(req, res, next, ['user', 'premium', 'admin']),
//     changeRole
//     )
  
// usersRouter.post(
//     '/:uid/documents',
//     (req, res, next) => verifyRole(req, res, next, ['user', 'premium']),
//     uploader.fields([
//         { name: 'identification' },
//         { name: 'address' },
//         { name: 'statement' }
//     ]),
//     updateUserDocumentsAndStatus
//     )
  

export default router;