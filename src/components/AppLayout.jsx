import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../slice/todosSlice";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import HeadTasks from "./HeadTasks";
import Todos from "./Todos";
import InputForm from "./InputForm";

const Container = styled.section`
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 42px auto 0;
  border-radius: 20px;
  background-color: #f5f5f5;

  @media (max-width: 530px) {
    width: 100%;
    margin: 0 auto;
    border-radius: 0;
  }
`;

const AppContainer = styled.section`
  max-width: 518px;
  padding: 61px 0;
  position: relative;
  margin: 0 20px;

  @media (max-width: 530px) {
    width: 100%;
    padding: 40px 10px;
  }
`;

function AppLayout() {
  const [sortedBy, setSortBy] = useState("all");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const doneSorted = todos.todos.filter((todo) => todo.completed === true);

  const unDoneSorted = todos.todos.filter((todo) => todo.completed !== true);

  return (
    <>
      {todos.loading && <div>Loading...</div>}
      {!todos.loading && todos.error ? <div>Error : {todos.error}</div> : null}
      {!todos.loading && todos.todos.length ? (
        <Container>
          <AppContainer>
            <ProgressBar todos={todos.todos} />
            <HeadTasks setSortBy={setSortBy} />
            <Todos
              todos={todos}
              doneSorted={doneSorted}
              unDoneSorted={unDoneSorted}
              sortedBy={sortedBy}
            />
            <InputForm />
          </AppContainer>
        </Container>
      ) : null}
    </>
  );
}

export default AppLayout;
