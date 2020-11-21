import Cookies from 'js-cookie'
// import { parseJwt } from "../utils/formatter";

// Token Name for JWT Token
const KEY_TOKEN = '_z2lj4lY7Wn_hIz_'

// Token Name for temporary report file download
// const KEY_TOKEN_V1 = 'kHIn83Lok_as3'

// Token Name for user data
const KEY_USER = 'ijN8Lds_1nd'

export default class CookieService {
	static getToken() {
		return Cookies.get(KEY_TOKEN)
	}

	static setToken(token = '') {
		Cookies.set(KEY_TOKEN, token, { expires: 1 })
	}

	static removeToken() {
		Cookies.remove(KEY_TOKEN)
	}

	// static getTokenV1() {
	// 	return Cookies.get(KEY_TOKEN_V1)
	// }

	// static setTokenV1(token = '') {
	// 	Cookies.set(KEY_TOKEN_V1, token, { expires: 1 })
	// }

	// static removeTokenV1() {
	// 	Cookies.remove(KEY_TOKEN_V1)
	// }

	// static checkToken() {
	// 	const token = Cookies.get(KEY_TOKEN);
	// 	return !!token;
	// }

	// static getUserFromToken() {
	// 	const token = Cookies.get(KEY_TOKEN);
	// 	return parseJwt(token);
	// }

	static getUser() {
		return Cookies.get(KEY_USER)
	}

	static setUser(user) {
		Cookies.set(KEY_USER, user)
	}

	static removeUser() {
		Cookies.remove(KEY_USER)
	}
}
