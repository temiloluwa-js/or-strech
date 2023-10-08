import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const userString = sessionStorage.getItem("or_user");

export const getAllTags = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/tags/listAllTags`, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTags = async (page_no, searchTerm, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/tags/listTags?page_no=${page_no}&name=${searchTerm}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createTag = async (payload, token) => {
  const user = await JSON.parse(userString);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/tags/createTag`, payload, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateTag = async (payload, name) => {
  const user = await JSON.parse(userString);
  try {
    const headers = {
      Authorization: `Bearer ${user.account.token}`,
    };
    const response = await axios.put(
      `${BASE_URL}/tags/updateTag?name=${name}`,
      payload,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteTag = async (name) => {
  const user = await JSON.parse(userString);
  try {
    const headers = {
      Authorization: `Bearer ${user.account.token}`,
    };
    const response = await axios.delete(
      `${BASE_URL}/tags/deleteTag?name=${name}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
