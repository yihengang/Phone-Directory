import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(`${baseUrl}`);
};

const create = (personObject) => {
  return axios.post(`${baseUrl}`, personObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, updatedPersonObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedPersonObject);
};

export default {
  getAll,
  create,
  remove,
  update,
};
