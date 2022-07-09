import Axios from 'axios';

Axios.defaults.baseURL = '/api';

export class Http {
  static async get(url: string) {
    return Axios.get(url)
  }

  static async post(url: string, data: any) {
    return Axios.post(url, data)
  }
}