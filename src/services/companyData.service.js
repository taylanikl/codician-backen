import http from "../http-common";

class CompanyDataService {
  getAll() {
    return http.get("/company");
  }

  get(id) {
    return http.get(`/company/${id}`);
  }

  create(data) {
    return http.post("/company", data);
  }

  update(id, data) {
    return http.put(`/company/${id}`, data);
  }

  delete(id) {
    return http.delete(`/company/${id}`);
  }

  deleteAll() {
    return http.delete(`/company`);
  }

  findByTitle(title) {
    return http.get(`/company?title=${title}`);
  }
}

export default new CompanyDataService();
