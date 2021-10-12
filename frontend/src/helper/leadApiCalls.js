import { API } from "../backend.js";

//lead calls

// create a lead
export const createLead = (userId, token, lead) => {
  return fetch(`${API}/lead/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lead),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all leads
export const getAllLeads = (userId, token) => {
  console.log(API);

  return fetch(`${API}/leads/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a lead details
export const getLead = (userId, token,emailId) => {
  console.log(API);

  return fetch(`${API}/lead/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(emailId),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
