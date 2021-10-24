import { API } from "../backend.js";

//csvImport calls
export const csvImport = (formData) => {
  return fetch(`${API}/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
