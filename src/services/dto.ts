export type ApiRes<T> = {
  code: number;
  data: T;
  msg: string;
  traceId: null | number;
};

export type LoginInput = {
  code: string;
  password: string;
  username: string;
  uuid: string;
};

export type LoginOutput = {
  user: {
    id: number;
    username: string;
    nickName: null;
    sex: string;
    avatar: null;
    email: null;
    phone: string;
    enabled: true;
    adminFlag: false;
    lastPasswordResetTime: null;
    createTime: string;
    roles: [];
    deptName: null;
    positionName: null;
  };
  token: string;
};
