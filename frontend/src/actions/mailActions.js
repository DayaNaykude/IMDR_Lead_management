import {
  MAIL_CONTENT_READ_REQUEST,
  MAIL_CONTENT_READ_SUCCESS,
  MAIL_CONTENT_READ_FAIL,
  MAIL_CONTENT_UPDATE_REQUEST,
  MAIL_CONTENT_UPDATE_SUCCESS,
  MAIL_CONTENT_UPDATE_FAIL,
} from "../constants/mailConstants";

import axios from "axios";

export const readMailContent = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MAIL_CONTENT_READ_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/mails/mailcontent`, config);

    dispatch({
      type: MAIL_CONTENT_READ_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MAIL_CONTENT_READ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMailContent =
  (mailContent) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MAIL_CONTENT_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/mails/mailcontent`,
        { mailContent },
        config
      );

      dispatch({
        type: MAIL_CONTENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MAIL_CONTENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
