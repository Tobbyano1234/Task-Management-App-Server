import authValidation from '../validations';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../../../famwork-auth/middlewares';
import { baseRouter, baseValidation } from '../../../famwork-shared/api';

const { POST, router } = baseRouter();

POST('/signup-user', [baseValidation(authValidation.signUpUser), AuthController.signUpUser]);
POST('/signup-admin', [baseValidation(authValidation.signUpAdmin), AuthController.signUpAdmin]);

POST('/signin-user', [baseValidation(authValidation.signInUser), AuthController.signInBuyer]);
POST('/signin-status', [baseValidation(authValidation.signInStatusUser), AuthController.signInStatus]);
POST('/signin-admin', [baseValidation(authValidation.signInAdmin), AuthController.signInAdmin]);

POST('/send-otp-buyer', [baseValidation(authValidation.sendOtpUser), AuthController.sendBuyerOTP]);
POST('/send-otp-admin', [baseValidation(authValidation.sendOtpAdmin), AuthController.sendAdminOTP]);

POST('/verify-otp-user', [
    baseValidation(authValidation.verifyOtpUser), /*forgotPasswordRateLimiter,*/ AuthController.verifyUserOTP]);
POST('/verify-otp-admin', [
    baseValidation(authValidation.verifyOtpAdmin), /*forgotPasswordRateLimiter,*/ AuthController.verifyAdminOTP]);

POST('/verify-password-user', [
    baseValidation(authValidation.verifyPasswordUser), AuthController.verifyUserPassword]);
POST('/verify-password-admin', [
    baseValidation(authValidation.verifyPasswordAdmin), AuthController.verifyAdminPassword]);

POST('/verify-email-user', [
    baseValidation(authValidation.verifyEmailUser), AuthController.verifyUserEmail]);
POST('/verify-email-admin', [
    baseValidation(authValidation.verifyEmailAdmin), AuthController.verifyAdminEmail]);

POST('/change-password-user', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.changePasswordUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.changeUserPassword]);
POST('/change-password-admin', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.changePasswordAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.changeAdminPassword]);

POST('/reset-password-buyer', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.resetPasswordUser), AuthController.resetUserPassword]);
POST('/reset-password-admin', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.resetPasswordAdmin), AuthController.resetAdminPassword]);

// POST('/deactivate-account-user', [ /*changePasswordRateLimiter,*/
//     baseValidation(authValidation.deactivateAccount), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.deactivateAccount]);
// POST('/suspendAccount/user/:accountID', [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.suspendUserAccount]);

export default router;
