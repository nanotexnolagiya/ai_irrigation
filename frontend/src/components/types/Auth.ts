export type User = {
  id: number;
  username: string;
  email: string;
};

export type Tokens = {
  refresh: string;
  access: string;
};

export type RegisterUser = {
  username: string;
  email: string;
  password: string;
}
