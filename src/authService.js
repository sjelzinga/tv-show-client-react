import api from "./api/api";

class AuthService {
  async login(user) {
    const response = await api.post("/users/login", user);
    return response;
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  async fetchUser() {
    const token = this.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await api
      .get("/users/me", config)
      .catch(error => error.response);
    const { data, status } = response;
    return { data, status };
  }

  async logout() {
    const token = this.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    await api
      .post("/users/logout", null, config)
      .catch(error => error.response);
    localStorage.removeItem("token");
  }
}

export default new AuthService();
