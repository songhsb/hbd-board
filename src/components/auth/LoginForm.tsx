import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import axios from "axios";
import shortid from "shortid";
import { useNavigate } from "react-router-dom";

const FormWrapper = styled(Form)`
  width: 300px;
`;

const LoginForm: React.FC = () => {
  const naviagte = useNavigate();

  const handleLogin = async (values: any) => {
    // 로그인 로직을 여기에 구현
    const response = await axios.get(
      `http://localhost:4000/users?email=${values.email}&password=${values.password}`
    );
    console.log("response", response);
    if (response.data.length <= 0) {
      alert("없음...!");
      return false;
    } else {
      alert("로그인에 성공하였습니다. 메인 페이지로 이동합니다.");
      localStorage.setItem("token", shortid.generate());
      localStorage.setItem("email", values.email);
      naviagte("/");
    }
  };

  return (
    <FormWrapper onFinish={handleLogin}>
      <Form.Item
        label="이메일"
        name="email"
        rules={[{ required: true, message: "이메일을 입력해주세요." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default LoginForm;
