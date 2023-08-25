// import userValidation from '../validations';
// import { UserController } from '../controllers';
// import { AuthMiddleware } from '../../../../famwork-auth/services';
import { baseRouter,
    //  baseValidation
     } from '../../../../famwork-shared/api';
// import { singleFileUploadMiddleware } from '../../../../famwork-shared/fileUpload';


const { 
    // PUT,
    //  GET,
      router } = baseRouter();

// PUT('/profile', [ singleFileUploadMiddleware.single('avatar'), baseValidation(userValidation.updateProfile), AuthMiddleware.baseAuthToken, AuthMiddleware.IsUserMiddleware, UserController.updateProfile ]);
// GET('/:ID', [baseValidation(userValidation.get), UserController.getUser]);
// GET('/profile/public', [baseValidation(userValidation.getUserProfile), UserController.getUserProfile]);

export default router;
