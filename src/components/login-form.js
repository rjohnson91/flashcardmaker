import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Typography } from "antd";

const { Title, Text } = Typography;

import { login } from "../redux/actions/auth";

const LoginForm = (props) => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleLogin = ({ username, password }) => {
    setLoading(true);

    dispatch(login(username, password))
      .then(() => {
        props.history.push("/");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-container">
      <Title level={2}>Sign in</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username or email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {message && (
          <div className="login-form-error">
            <Text type="danger"> {message}</Text>
          </div>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            {loading ? "Logging in" : "Log in"}
          </Button>
          Or <Link to="/register">Register</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;