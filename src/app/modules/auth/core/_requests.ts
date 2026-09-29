import axios from "axios";
import { AuthModel, UserModel } from "./_models";
import Utils from "../../common/Utils.tsx";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/account`;
export const LOGIN_URL = `${API_URL}/authenticate`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    username: email,
    password: Utils.hashPassword(password),
    rememberMe: false
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  phoneNumber: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    userName: email,
    email,
    firstName: firstname,
    lastName: lastname,
    phoneNumber,
    password: Utils.hashPassword(password),
    password_confirmation: Utils.hashPassword(password_confirmation),
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL);
}
