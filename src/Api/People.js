import { url } from './url';
const rout = {
  users: "people/",
  login: "people/login"
};

export class People {
  get() {
    return fetch(`${url}${rout.users}`)
  }

  getById(id) {
    return fetch(`${url}${rout.users}${id}`)
      .then(res => res.json())
  }

  getUserPosts(id) {
    return fetch(`${url}${rout.users}${id}/posts`)
  }

  postLogin(user) {
    return fetch(`${url}${rout.login}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  postRegister(user) {
    return fetch(`${url}${rout.users}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default People
