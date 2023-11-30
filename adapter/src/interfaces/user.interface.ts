export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
  email: string;
  address: string;
  role: string;
  org: string;
  id?: string;
}

export interface UserResponse {
  username: string;
  role: string;
  org: string;
}
