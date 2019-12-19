import { url } from './url';
const endpoint = "posts/";

export class Posts {
  get() {
    return fetch(`${url}${endpoint}`)
  }

  set(post) {
    return fetch(`${url}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  update(id, post) {
    return fetch(`${url}${endpoint}${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  remove(id) {
    return fetch(`${url}${endpoint}${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default Posts
