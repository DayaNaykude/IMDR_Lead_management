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

//get all active leads
export const getAllLeads = (userId, token) => {
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

//get all leads from trash
export const getAllLeadsFromTrash = () => {
  return fetch(`${API}/trashedLeads`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a lead details
export const getLead = (userId, token, emailId) => {
  console.log(API,emailId);

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

// update lead
export const updateLead = (userId, token, updateInfo) => {
  console.log(API);

  return fetch(`${API}/lead/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete leads
export const deleteLeads = (userId, token, leads) => {
  return fetch(`${API}deleteLeads/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: leads,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//move into trash
export const moveIntoTrash = (userId, token, leads) => {
  return fetch(`${API}/lead/moveIntoTrash/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: leads,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//reAssign lead
export const reAssignLeads = (userId, token, leads) => {
  return fetch(`${API}/lead/reAssign/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: leads,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update lead status
export const updateStatus = (userId, token, updateInfo) => {
  console.log(API);

  return fetch(`${API}/lead/updateStatus/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
