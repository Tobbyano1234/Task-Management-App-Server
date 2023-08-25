import { Request } from "express";
import httpStatus from "http-status";

import { BaseController } from "../../../../famwork-shared/api";
// import { singleFileUpload } from '../../../../famwork-shared/fileUpload';
import { UpdateUserProfileDTO } from "../../DTOs/UpdateUserDTO";
import { getUserService, updateUserService } from "../../services";

export class UserController {
  static updateProfile = BaseController(async (request: Request) => {
    const UpdateUserProfileDTO = request.body as UpdateUserProfileDTO;
    const { avatar: image } = UpdateUserProfileDTO;
    UpdateUserProfileDTO.userID = request.token._id;
    UpdateUserProfileDTO.avatar = image || "";
    // UpdateUserProfileDTO.avatar = request.file ? (await singleFileUpload(request)).secure_url : image || '';
    const { message, data } = await updateUserService(UpdateUserProfileDTO);
    return { status: httpStatus.OK, message, data };
  });

  static getUser = BaseController(async (request: Request) => {
    const userID = request.params.ID;
    const user = await getUserService({ userID }, { onUserNotFound: () => {} });
    return {
      status: httpStatus.OK,
      message: "user fetched successfully",
      data: user,
    };
  });
}
