import {
  MAIL_CONTENT_READ_REQUEST,
  MAIL_CONTENT_READ_SUCCESS,
  MAIL_CONTENT_READ_FAIL,
  MAIL_CONTENT_UPDATE_REQUEST,
  MAIL_CONTENT_UPDATE_SUCCESS,
  MAIL_CONTENT_UPDATE_FAIL,
  MAIL_CONTENT_UPDATE_RESET,
} from "../constants/mailConstants";

export const mailReadContentReducer = (state = { mailContent: {} }, action) => {
  switch (action.type) {
    case MAIL_CONTENT_READ_REQUEST:
      return { ...state, loading: true };
    case MAIL_CONTENT_READ_SUCCESS:
      return { loading: false, mailContent: action.payload };
    case MAIL_CONTENT_READ_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mailUpdateContentReducer = (state = {}, action) => {
  switch (action.type) {
    case MAIL_CONTENT_UPDATE_REQUEST:
      return { loading: true };
    case MAIL_CONTENT_UPDATE_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case MAIL_CONTENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case MAIL_CONTENT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
