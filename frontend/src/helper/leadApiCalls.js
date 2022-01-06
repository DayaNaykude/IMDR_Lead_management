import { API } from "../backend.js";

//lead calls

// create a new lead manually
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

//get all active leads for a particular user
export const getAllLeads = (userId, token, page) => {
  return fetch(`${API}/leads/${userId}?page=${page}`, {
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
export const getAllLeadsFromTrash = (page) => {
  return fetch(`${API}/trashedLeads?page=${page}`, {
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

//get all leads for admin
export const getAllLeadsForAdmin = (page) => {
  return fetch(`${API}/admin/leads?page=${page}`, {
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

//get lead details
export const getLead = (userId, token, emailId) => {
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

//delete leads permanently
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

//move leads into trash
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

//reAssign leads to their respective users
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
