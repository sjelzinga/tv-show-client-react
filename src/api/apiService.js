import authService from "../authService";
import api from "./api";

class ApiService {
  //#region User Api Calls
  createNewUser = async user => {
    const response = await api.post("/users", user).catch(err => err);
    return response;
  };

  addTVShowToUserTVShows = async showId => {
    const response = await api
      .put("/users/me/addshow", { id: showId }, this.getConfig())
      .catch(err => err);
    return response;
  };

  removeTVShowFromUserTVShows = async id => {
    const response = await api
      .delete(`/users/me/shows/${id}`, this.getConfig())
      .catch(err => err);
    return response;
  };

  getUserTVShows = async () => {
    const response = await api
      .get("/users/me/shows", this.getConfig())
      .catch(err => err);
    return response;
  };
  //#endregion

  //#region TV Show Api Calls
  fetchTVShows = async () => {
    return await api.get("/shows");
  };

  fetchTVShow = async showId => {
    return await api.get(`/shows/${showId}`);
  };

  addUserRatingToTVShow = async (tvShowId, reviewId, reviewRating) => {
    const response = await api.put(
      `/shows/${tvShowId}/review`,
      { reviewId, rating: reviewRating },
      this.getConfig()
    );
    return response;
  };

  deleteUserRatingFromTVShow = async (showId, reviewId) => {
    const response = await api.patch(
      `/shows/${showId}/review`,
      { reviewId },
      this.getConfig()
    );
    return response;
  };
  //#endregion

  //#region Review Api Calls
  fetchReviews = async showId => {
    return await api.get(`/shows/${showId}/reviews`);
  };
  postReview = async review => {
    return await api.post("/reviews", review, this.getConfig());
  };
  deleteReview = async reviewId => {
    return await api.delete(`/reviews/${reviewId}`, this.getConfig());
  };
  //#endregion

  getConfig = () => {
    const token = authService.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return config;
  };
}
export default new ApiService();
