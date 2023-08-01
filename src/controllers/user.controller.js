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

// export const currentUserStatus = async (req, res) => {
//     try {
//       const { uid: cid } = req.params
  
//       if (!cid) {
//         return res.status(400).send({
//           status: 'error',
//           error: 'Failed to get cart ID'
//         })
//       }
  
//       const { documents } = await userService.getUserByCartId(cid)
  
//       if (!documents) {
//         return res.status(404).send({
//           status: 'error',
//           error: 'Failed to get user status'
//         })
//       }
  
//       const userStatus = userService.filterUserDocs(documents)
  
//       res.status(200).send({ status: 'success', payload: userStatus })
//     } catch (error) {
//       req.logger.error(`Cannot get user status with error: ${error}`)
//       return res.status(500).send({
//         status: 'error',
//         error: 'Failed to get user status'
//       })
//     }
//   }