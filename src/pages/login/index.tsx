import * as React from "react";
import LoginService from "@/services/login";
import { Layout, Form, Input, Row, Col, Button, message } from "antd";
import "./style.less";
import { Link, RouteComponentProps } from "react-router-dom";
import { LoginOutput } from "@/services/dto";
import Cookie from "js-cookie";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

const Login = (props: RouteComponentProps) => {
  const [form] = Form.useForm();
  const [codeUrl, setCodeUrl] = React.useState();
  const [codeUuid, setCodeUuid] = React.useState();

  React.useEffect(() => {
    LoginService.getCode().then((res) => {
      setCodeUrl(res.img);
      setCodeUuid(res.uuid);
    });
  }, []);

  const handleLogin = () => {
    form
      .validateFields()
      .then((vals) => {
        return LoginService.login({
          code: vals.code.trim(),
          password: vals.password.trim(),
          username: vals.username.trim(),
          uuid: codeUuid,
        });
      })
      .then((res: LoginOutput) => {
        Cookie.set("token", res.token, { expires: 1 });
        props.history.replace("/");
      })
      .catch((reason) => {
        if (reason instanceof Error) {
          message.error(reason.message);
        }
      });
  };

  return (
    <div className="page-login">
      <div className="login-form">
        <h1>京宁物联管理系统</h1>
        <h3>用户登录</h3>
        <Form form={form} {...formItemLayout}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
            ]}
          >
            <Input placeholder="手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Row>
            <Col span={16}>
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please input your mobile!",
                  },
                ]}
              >
                <Input placeholder="验证码" />
              </Form.Item>
            </Col>
            <Col span={8}>
              {codeUrl && (
                <img src={codeUrl} style={{ height: 32, float: "right" }} />
              )}
            </Col>
          </Row>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            登录
          </Button>
          <div className="tips">
            <Link replace to="/register">
              去注册
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
