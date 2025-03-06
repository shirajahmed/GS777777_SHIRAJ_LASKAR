// add all typs for data

import axios from "axios";
import { Store } from "../types";

const API_BASE_URL = "https://dummydata-9wt5.onrender.com";

export const fetchStores = async () => {
  const response = await axios.get(`${API_BASE_URL}/stores`);
  return response.data;
};

export const createStore = async (store: Omit<Store, "Seq No.">) => {
  const response = await axios.post(`${API_BASE_URL}/stores`, store);
  return response.data;
};

export const updateStore = async (
  id: string,
  store: Omit<Store, "Seq No.">
) => {
  const response = await axios.put(`${API_BASE_URL}/stores/${id}`, store);
  return response.data;
};

export const deleteStore = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/stores/${id}`);
  return response.data;
};
