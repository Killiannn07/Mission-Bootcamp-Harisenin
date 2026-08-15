import api from "./api";

export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    // Save token ke localStorage
    if (res.data.data.token) {
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
    }
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
