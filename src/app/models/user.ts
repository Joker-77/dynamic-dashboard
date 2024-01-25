export interface IUser {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
}
export interface ISupport {
  text: string;
  url: string;
}

export interface ISingleUserResponse {
  data: IUser;
  support: ISupport;
}
