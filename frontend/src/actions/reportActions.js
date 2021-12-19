import {
  REPORT_GENERATE_REQUEST,
  REPORT_GENERATE_SUCCESS,
  REPORT_GENERATE_FAIL,
  REPORT_DATA_REQUEST,
  REPORT_DATA_SUCCESS,
  REPORT_DATA_FAIL,
} from "../constants/reportConstants";

import { logout } from "./userActions";

import axios from "axios";

export const generateReport =
  (startDate, endDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORT_GENERATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/report/`,
        { startDate, endDate },
        config
      );

      dispatch({
        type: REPORT_GENERATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: REPORT_GENERATE_FAIL,
        payload: message,
      });
    }
  };

export const getReportData = (leadsIds) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_DATA_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/report/getdata`,
      { leadsIds },
      config
    );

    dispatch({
      type: REPORT_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REPORT_DATA_FAIL,
      payload: message,
    });
  }
};
