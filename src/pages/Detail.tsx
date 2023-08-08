import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Button, Input } from "antd";
import { useParams } from "react-router-dom";

const Detail: React.FC<any> = () => {
  const [data, setData] = useState<{
    email: string;
    contents: string;
    isDeleted: boolean;
    id: number;
  }>({
    email: "",
    contents: "",
    isDeleted: false,
    id: 0,
  });

  const [comments, setComments] = useState<string>("");
  const [temp, setTemp] = useState([]);

  const { id: itemId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/boards?isDeleted=${false}&id=${itemId}`
      );

      const commentsResponse = await axios.get(
        `http://localhost:4000/comments?isDeleted=${false}&boardId=${itemId}`
      );

      console.log("commentsResponse", commentsResponse);

      setData(response.data[0]);
      setTemp(commentsResponse.data);
    } catch (error) {
      alert("데이터를 불러오는데 오류가 발생하였습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEnterButtonClick = async () => {
    // axios 통신
    // setState("")

    try {
      await axios.post(`http://localhost:4000/comments`, {
        boardId: itemId,
        comments: comments,
        email: localStorage.getItem("email"),
        isDeleted: false,
      });

      window.location.reload();
    } catch (error) {}
  };

  return (
    <MainWrapper>
      <h1>상세페이지</h1>
      <ListWrapper>
        {data && (
          <div>
            <h3>내용 : {data.contents}</h3>
            <h3>작성자 : {data.email}</h3>
            {localStorage.getItem("email") === data.email && (
              <Button>삭제</Button>
            )}
          </div>
        )}
      </ListWrapper>
      <StyledInput
        placeholder="댓글을 입력해주세요."
        value={comments}
        onChange={(e: any) => {
          setComments(e.target.value);
        }}
      />
      {temp.map((comment: any) => {
        return <div key={comment.id}>{comment.comments}</div>;
      })}
      <Button onClick={handleEnterButtonClick}>입력</Button>
    </MainWrapper>
  );
};

export default Detail;

const StyledInput = styled(Input)`
  width: 50%;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;
