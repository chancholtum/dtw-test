import styled from "styled-components";

const ProgressContainer = styled.section`
  height: 123px;
  padding: 18px 19px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #e07c7c;

  @media (max-width: 530px) {
    width: 100%;
  }
`;

const ProgressText = styled.p`
  font-size: 28px;
  font-weight: 500;
  color: #fff;
`;

const Progress = styled.div`
  width: 100%;
  height: 7.343px;
  border-radius: 999px;
  background-color: #3b3b3b;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  transition: "width 0.5s ";
  background: #fff;
  transition: all 0.5s ease-in-out;
`;

const CompletetedText = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #ebb9b8;
`;
function ProgressBar({ todos }) {
  const progress =
    (todos.filter((todo) => todo.completed === true).length / todos.length) *
    100;
  const completedNum = todos.filter((todo) => todo.completed === true).length;

  return (
    <ProgressContainer>
      <ProgressText>Progress</ProgressText>
      <Progress>
        <ProgressFill
          style={{
            width: `${progress}%`,
          }}
        ></ProgressFill>
      </Progress>
      <CompletetedText>{completedNum} completed</CompletetedText>
    </ProgressContainer>
  );
}

export default ProgressBar;
