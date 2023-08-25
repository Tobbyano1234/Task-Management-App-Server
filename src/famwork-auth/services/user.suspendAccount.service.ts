// import { UserModel } from "../../unboxd-entities";
// import { AccountStatus } from "../../typings/Account.types";
// import { UserSuspendAccountDTO } from "../DTOs/suspendAccount.DTO";
// import { getUserService } from "../../unboxd-accounts/user/services";


// export const UserSuspendAccountPipe = async ({ userID, suspend }: UserSuspendAccountDTO) => {
//   const {_id} = await getUserService({userID}, {shouldPopulate: false});
//   const data = await UserModel.findByIdAndUpdate(_id,
//     {status: suspend ? AccountStatus.SUSPENDED : AccountStatus.ACTIVE }, {new: true});
//   return { success: true, message: `user ${suspend? 'suspended': 'activated'}`, data, hookData: data };
// };
