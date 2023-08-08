import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";
import axios from "axios";

const FormWrapper = styled(Form)`
  width: 300px;
`;

const SignupForm: React.FC<any> = ({ setIsLogin }) => {
  const handleSignup = async (values: any) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users?email=${values.email}`
      );

      if (response.data.length > 0) {
        alert("이미 존재 유저");
        return false;
      }

      // 회원가입 로직을 여기에 구현
      await axios.post("http://localhost:4000/users", {
        email: values.email,
        password: values.password,
      });

      alert(
        "회원가입이 성공적으로 처리되었습니다. 로그인 페이지로 이동합니다."
      );
      setIsLogin(true);
    } catch (error) {
      alert("처리중 오류가 발생하였습니다. 다시 시도해주세요.");
      return false;
    }
  };

  return (
    <FormWrapper onFinish={handleSignup}>
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
      <Form.Item
        label="비밀번호 확인"
        name="confirmPassword"
        rules={[
          { required: true, message: "비밀번호 확인을 입력해주세요." },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다."));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="agreed"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("고객정보 이용동의에 체크해주세요.")
                  ),
          },
        ]}
      >
        <Checkbox>고객정보 이용동의</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default SignupForm;
