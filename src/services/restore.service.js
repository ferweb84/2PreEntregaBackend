import { calculateExpirationDate, createHash, generateUniqueToken } from "../utils.js";
import { restoreRepository, userRepository } from "./../repositories/index.js";
import { sendMail } from "../sendMail.js";
import CustomError from "../../errors/CustomError.js";
import { ErrorsCause, ErrorsMessage, ErrorsName } from "../../errors/error.enum.js";
import { restorePasswordTemplate } from "../emails/restore.password.js";

export class RestoreService {
    constructor() {
        this.repository = restoreRepository;
        this.userRepository = userRepository;
    }

    createRestore = async (email) => {
        try {
            const userExists = await this.userRepository.findByEmail(email);

            if(!userExists) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.USER_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.USER_EMAIL_NOT_EXISTS_CAUSE,
                });
            }

            const token = generateUniqueToken();
            const expiredAt = calculateExpirationDate();

            const restoreData = {
                email: userExists.email,
                token,
                created_at: new Date(),
                expired_at: expiredAt
            };

            const restore = await this.repository.create(restoreData);

            if(!restore) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.RESTORE_NOT_CREATED_MESSAGE,
                    cause: ErrorsCause.RESTORE_NOT_CREATED_CAUSE
                });
            } else {
                const subject = "Restablecimiento de la contraseña";
                const message = restorePasswordTemplate(token);

                await sendMail(email, subject, message);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    restorePassword = async (token) => {
        try {
          const restore = await this.repository.findByToken(token);
          if (!restore) {
            return null;
          }
      
          const actualDatetime = new Date();
          const expirationDatetime = new Date(restore.expired_at);
      
          if (actualDatetime.getTime() > expirationDatetime.getTime()) {
            return null;
          }
      
          return restore;
        } catch (error) {
          throw new Error(error);
        }
    };      

    changePassword = async (token, newPassword) => {
        try {
            const restore = await this.repository.findByToken(token);
            if(!restore) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.RESTORE_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.RETORE_NOT_FOUND_CAUSE
                });
            }
            const user = await this.userRepository.findByEmail(restore.email);
            if(!user) {
                CustomError.generateCustomError({
                    name: ErrorsName.GENERAL_ERROR_NAME,
                    message: ErrorsMessage.USER_NOT_FOUND_MESSAGE,
                    cause: ErrorsCause.USER_EMAIL_NOT_EXISTS_CAUSE,
                });
            }

            await this.repository.setRestored(restore._id);

            user.password = createHash(newPassword);
            return await this.userRepository.saveUser(user);
        } catch (error) {
            throw new Error(error);
        }
    }
}