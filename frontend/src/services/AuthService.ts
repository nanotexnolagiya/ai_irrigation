import type { RegisterUser, Tokens, User } from "../components/types/Auth";
import api from "./api";
import type { AxiosResponse } from "axios";

export const registerUser = async (data: RegisterUser) => {
  return api.post<RegisterUser, AxiosResponse<Tokens>>("/api/auth/register/", data);
};

export const loginUser = async (data: Omit<RegisterUser, 'email'>) => {
  return api.post<Omit<RegisterUser, 'email'>, AxiosResponse<Tokens>>("/api/auth/login/", data);
};

export const getUser = async () => {
  return api.get<User>("/api/auth/me/");
};
