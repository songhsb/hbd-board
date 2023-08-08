import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      alert("토큰 또는 이메일이 없습니다. 로그인해주세요.");

      localStorage.removeItem("token");
      localStorage.removeItem("email");

      navigate("/auth");
    }
  }, [navigate]);

  const handleLogoutButtonClick = () => {
    const isConfirmed = window.confirm("로그아웃하시겠습니까?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      alert("로그아웃이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/auth");
    }
  };

  return (
    <>
      <StyledHeaderBox>
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      </StyledHeaderBox>
      <Outlet />
    </>
  );
};

export default AuthLayout;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`;
