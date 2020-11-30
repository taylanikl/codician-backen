import http from "../http-common";

class AddressDataService {
  getAll() {
    return http.get("/address");
  }

  getAddress(id) {
    return http.get(`/address/getAddress/${id}`);
  }

  get(id) {
    return http.get(`/address/${id}`);
  }

  create(data) {
    return http.post("/address", data);
  }

  update(id, data) {
    return http.put(`/address/${id}`, data);
  }

  delete(id) {
    return http.delete(`/address/${id}`);
  }

  deleteAll() {
    return http.delete(`/address`);
  }
}

export default new AddressDataService();
