import * as React from "react";
import LoginService from "@/services/login";
import { Layout, Form, Input, Row, Col, Button, message } from "antd";
import "./style.less";
import { Link } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

const Login = () => {
  const [form] = Form.useForm();

  const [timeCounting, setTimeCounting] = React.useState(false);
  const [time, setTime] = React.useState<null | number>(null);
  const tmpTime = React.useRef();

  const timer = React.useRef();

  // 发送验证码
  const handleSendCode = () => {
    if (timeCounting) return;
    if (time > 0) return;
    const mobile = form.getFieldValue("mobile");
    if (!mobile) return;
    form
      .validateFields(["mobile"])
      .then((v) => {
        LoginService.getMobileCode(mobile.trim())
          .then(() => {
            setTimeCounting(true);
            setTime(60);
            tmpTime.current = 60;
            timer.current = setInterval(() => {
              if (tmpTime.current === 0) {
                setTimeCounting(false);
                setTime(null);
                tmpTime.current = null;
                clearInterval(timer.current);
              } else {
                setTime(tmpTime.current - 1);
                tmpTime.current = tmpTime.current - 1;
              }
            }, 1000);
          })
          .catch((reason) => {
            // message.error(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderSendCodeBtn = () => {
    if (timeCounting) {
      return (
        <Button style={{ float: "right" }} type="link" disabled>
          {tmpTime.current}
        </Button>
      );
    } else {
      return (
        <Button style={{ float: "right" }} type="link" onClick={handleSendCode}>
          获取验证码
        </Button>
      );
    }
  };

  // 注册
  const handleRegister = () => {
    form
      .validateFields()
      .then((vals) => {
        return LoginService.register({
          code: vals.code.trim(),
          mobile: vals.mobile.trim(),
          password: vals.paddword.trim(),
        });
      })
      .then(() => {
        props.history.replae("login");
      })
      .catch((reason) => {
        if (reason instanceof Error) {
          message.error(reason.message);
        }
      });
  };

  return (
    <div className="page-registor">
      <div className="registor-form">
        <h1>京宁物联管理系统</h1>
        <h3>用户注册</h3>
        <Form form={form} {...formItemLayout}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "Please input your mobile!",
              },
              {
                validator: (rule, value) =>
                  /^[1-9]{1}[0-9]{10}$/.test(value)
                    ? Promise.resolve()
                    : Promise.reject("手机号不正确"),
              },
            ]}
          >
            <Input placeholder="手机号" />
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
                  {
                    validator: (value) =>
                      /^\d{1,}$/.test(value)
                        ? Promise.resolve()
                        : Promise.reject("验证码不正确"),
                  },
                ]}
              >
                <Input placeholder="验证码" />
              </Form.Item>
            </Col>
            <Col span={8}>{renderSendCodeBtn()}</Col>
          </Row>
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

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" />
          </Form.Item>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={handleRegister}
          >
            注册
          </Button>
          <div className="tips">
            <Link replace to="/login">
              已有账户？去登陆
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
