import axios from 'axios'
// import Cookies from 'js-cookie'
import route from './config/route'

let stringformat = require('stringformat');
// let token = Cookies.get('token');

const config = {
  baseURL: route,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // "Authorization": `Bearer ${token}`
  }
};

class Api {
  static get(url, formatArray) {
    let string = this.urlFormat(url, formatArray)
    return this.server.get(string).catch(err => err)
  }

  static delete(url, formatArray) {
    let string = this.urlFormat(url, formatArray)
    this.server.delete(string).catch(err => err)
  }

  static put(url, data) {
    return this.server.put(url, data).catch(err => err)
  }

  static post(url, data) {
    return this.server.post(url, data).catch(err => err)
  }

  static urlFormat(url, formatArray) {
    if (formatArray) {
      let array = [url, ...formatArray]
      let urls = stringformat.apply(this, array)
      return urls
    } else {
      return url
    }
  }

}

export class Http extends Api {
  static server = axios.create(config);
}


