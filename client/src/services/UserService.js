import $api from '@/API/api'

class UserService {
  static async login(email, password) {
    return $api.post('user/login', {
      email, password
    })
  }

  static async registration(name, email, password) {
    return $api.post('user/registration', {
      email, password, name
    })
  }

  static async logout() {
    return $api.post('user/logout')
  }
}

export default UserService