import axios from 'axios';
import { base } from './config';

const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// CRUD

export const getAll = function request({ path, params = {} }) {
  return axios.get(`${base}/${path}`, { params }, header);
};
export const getOne = function request({ path, params }) {
  return axios.get(`${base}/${path}/${params.id}`, { params }, header);
};
export const add = function request({ path, params }) {
  return axios.post(`${base}/${path}`, params, header);
};
export const edit = function request({ path, params }) {
  return axios.put(`${base}/${path}/${params.id}`, params, header);
};
export const remove = function request({ path, params }) {
  return axios.delete(`${base}/${path}/${params.id}`, { params }, header);
};
