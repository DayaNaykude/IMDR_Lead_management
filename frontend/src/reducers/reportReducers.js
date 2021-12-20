import {
  REPORT_GENERATE_REQUEST,
  REPORT_GENERATE_SUCCESS,
  REPORT_GENERATE_FAIL,
  REPORT_DATA_REQUEST,
  REPORT_DATA_SUCCESS,
  REPORT_DATA_FAIL,
  REPORT_DATA_RESET,
} from "../constants/reportConstants";

export const reportGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_GENERATE_REQUEST:
      return { loading: true };
    case REPORT_GENERATE_SUCCESS:
      return { loading: false, report: action.payload };
    case REPORT_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reportGetDataReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_DATA_REQUEST:
      return { loading: true };
    case REPORT_DATA_SUCCESS:
      return { loading: false, reportData: action.payload };
    case REPORT_DATA_FAIL:
      return { loading: false, error: action.payload };
    case REPORT_DATA_RESET:
      return { users: [] };
    default:
      return state;
  }
};
