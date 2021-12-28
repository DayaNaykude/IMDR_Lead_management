import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userSendBulkEmailsReducer,
  userSendBulkSmsReducer,
  leadAddReviewReducer,
} from "./reducers/userReducers";

import {
  reportGenerateReducer,
  reportGetDataReducer,
} from "./reducers/reportReducers";

import {
  mailReadContentReducer,
  mailUpdateContentReducer,
} from "./reducers/mailReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userSendBulkEmails: userSendBulkEmailsReducer,
  userSendBulkSms: userSendBulkSmsReducer,
  leadAddReview: leadAddReviewReducer,

  reportGenerate: reportGenerateReducer,
  reportGetData: reportGetDataReducer,

  mailReadContent: mailReadContentReducer,
  mailUpdateContent: mailUpdateContentReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
