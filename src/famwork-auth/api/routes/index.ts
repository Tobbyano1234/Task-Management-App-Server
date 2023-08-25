import authValidation from '../validations';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../../../famwork-auth/middlewares';
import { baseRouter, baseValidation } from '../../../famwork-shared/api';

const { POST, router } = baseRouter();

POST('/signup-user', [baseValidation(authValidation.signUpUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.signUpUser]);
POST('/signup-admin', [baseValidation(authValidation.signUpAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.signUpAdmin]);

POST('/signin-user', [baseValidation(authValidation.signInUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.signInBuyer]);
POST('/signin-admin', [baseValidation(authValidation.signInAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.signInAdmin]);

POST('/signin-status', [baseValidation(authValidation.signInStatusUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.signInStatus]);

POST('/send-otp-buyer', [baseValidation(authValidation.sendOtpUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.sendBuyerOTP]);
POST('/send-otp-admin', [baseValidation(authValidation.sendOtpAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.sendAdminOTP]);

POST('/verify-otp-user', [
    baseValidation(authValidation.verifyOtpUser), /*forgotPasswordRateLimiter,*/ AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.verifyUserOTP]);
POST('/verify-otp-admin', [
    baseValidation(authValidation.verifyOtpAdmin), /*forgotPasswordRateLimiter,*/ AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.verifyAdminOTP]);

POST('/verify-password-user', [
    baseValidation(authValidation.verifyPasswordUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.verifyUserPassword]);
POST('/verify-password-admin', [
    baseValidation(authValidation.verifyPasswordAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.verifyAdminPassword]);

POST('/verify-email-user', [
    baseValidation(authValidation.verifyEmailUser),AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.verifyUserEmail]);
POST('/verify-email-admin', [
    baseValidation(authValidation.verifyEmailAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.verifyAdminEmail]);

POST('/change-password-user', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.changePasswordUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.changeUserPassword]);
POST('/change-password-admin', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.changePasswordAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.changeAdminPassword]);

POST('/reset-password-buyer', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.resetPasswordUser), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.resetUserPassword]);
POST('/reset-password-admin', [ /*changePasswordRateLimiter,*/
    baseValidation(authValidation.resetPasswordAdmin), AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.resetAdminPassword]);

// POST('/deactivate-account-user', [ /*changePasswordRateLimiter,*/
//     baseValidation(authValidation.deactivateAccount), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, AuthController.deactivateAccount]);
// POST('/suspendAccount/user/:accountID', [AuthMiddleware.baseAuthToken, AuthMiddleware.IsAdminMiddleware, AuthController.suspendUserAccount]);

export default router;
