class Api {
    constructor(options) {
      // constructor body
      this.baseUrl = options.baseUrl
      this.headers = options.headers
    }

    async makeRequest(endpoint, method = "GET", body = {}) {
        let res;

        if (method === "PATCH" || method === "POST") {
            res = await fetch(this.baseUrl + endpoint, {
                method: method,
                headers: this.headers,
                body: JSON.stringify(body)
            });
        }
        else {
            res = await fetch(this.baseUrl + endpoint, {
                headers: this.headers,
                method: method
            });
        }
        
        if (res.ok) {
            return res.json();
        }
        
        return await Promise.reject(`Error: ${res.status}`);
    }

    
    // other methods for working with the API
    async getUserInformation() {
        return this.makeRequest('/users/me')
    }

    async getInitialCards() {
        return this.makeRequest('/cards')
    }
    
    async updateProfileInformation(data) {
        return this.makeRequest('/users/me', "PATCH", data)
    }

    async addNewCard(data) {
        return this.makeRequest('/cards', "POST", data)
    }

    async deleteCard(id) {
        return this.makeRequest(`/cards/${id}`, "DELETE")
    }

    async likeCard(id) {
        return this.makeRequest(`/cards/${id}/likes`, "PUT")
    }

    async unlikeCard(id) {
        return this.makeRequest(`/cards/${id}/likes`, "DELETE")
    }

    async editAvatar(data) {
        return this.makeRequest('/users/me/avatar', "PATCH", data)
    }
  }


export default Api