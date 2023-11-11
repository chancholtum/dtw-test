import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addTodo } from "../slice/todosSlice";

const InputFormContainer = styled.div`
  width: 518px;
  margin-top: 16px;
  border-radius: 9999px;
  background: #fff;
  padding: 14px 20px;
  height: 46px;

  @media (max-width: 530px) {
    width: 100%;
  }
`;

const Form = styled.form``;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: #bcbcbc;
  }
`;
function InputForm() {
  const dispatch = useDispatch();
  const [todoValue, setTodoValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!todoValue) return;

    const newTodo = {
      id: crypto.randomUUID(),
      title: todoValue,
      completed: false,
    };

    dispatch(addTodo(newTodo));

    setTodoValue("");
  }

  return (
    <InputFormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Add your todo..."
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          autoFocus={true}
        />
      </Form>
    </InputFormContainer>
  );
}

export default InputForm;
