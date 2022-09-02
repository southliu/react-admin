// 接口传入数据
export interface ILoginData {
  username: string;
  password: string;
}

// 用户数据
interface IUser {
  id: number;
  username: string;
  phone: string;
  email: string;
}

// 授权数据
export interface IPermissions {
  id: string;
  operation: string[];
}

// 用户权限数据
interface IRoles {
  id: string;
}

// 接口返回数据
export interface ILoginResult {
  token: string;
  user: IUser;
  permissions: IPermissions[];
  roles: IRoles[];
}