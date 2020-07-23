import { AxiosResponse } from "axios";
import { ApiRes, LoginOutput, LoginInput } from "./dto";
import { httpGet, httpPost } from "./http";

export default class LoginService {
  static getCode() {
    return httpGet("/admin/api/login/code").then(
      (
        res: AxiosResponse<
          ApiRes<{
            img: string;
            uuid: string;
          }>
        >
      ) => res.data.data
    );
  }

  static getMobileCode(mobile) {
    return httpGet(`/admin/api/login/getCodeToLogin?mobile=${mobile}`).then(
      (res: AxiosResponse<ApiRes<any>>) => res.data.data
    );
  }

  static register(data: { code: string; mobile: string; password: string }) {
    return httpPost("/admin/api/login/register", data);
  }

  static login(data: LoginInput) {
    return httpPost("/admin/api/login/login", data).then(
      (res: AxiosResponse<ApiRes<LoginOutput>>) => res.data.data
    );
  }
}
