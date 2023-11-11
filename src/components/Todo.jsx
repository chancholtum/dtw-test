import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { deleteTodo, editTodo, toggleCompleted } from "../slice/todosSlice";
import { useState } from "react";
import Checkbox from "./Checkbox";

const TodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-radius: 9999px;
  background-color: #ffffff;
  height: 46px;
  position: relative;

  @media (max-width: 530px) {
    width: 100%;
  }
`;

const TodoLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const TodoEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const CustomCheckBox = styled.div`
  position: relative;
`;

const TodoText = styled.p`
  color: #2e2e2e;
  font-size: 16px;

  ${(props) =>
    props.type === "true" &&
    css`
      text-decoration: line-through;
      color: #a9a9a9;
    `}
`;

const DropDown = styled.div`
  position: relative;
`;

const DropDownMenu = styled.ul`
  width: 111px;
  position: absolute;
  right: 0;
  border-radius: 10px;
  top: calc(100% + 1px);
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 17px 22px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: start;
`;

const BtnList = styled.li`
  list-style: none;
`;

const Btn = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
  color: #2e2e2e;
  font-size: 14px;
  width: 100%;

  &:hover {
    color: red;
  }
`;

const SaveBtn = styled.button`
  width: 64px;
  height: 36px;
  border-radius: 999px;
  background: #585292;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  border: none;
  position: absolute;
  right: 6px;
  top: 5px;
  cursor: pointer;
`;

const Form = styled.form``;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
`;

function Todo({ todo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [editValue, setEditValue] = useState("");
  const dispatch = useDispatch();

  const { id, title, completed } = todo;

  function handleCompletedTodo() {
    dispatch(toggleCompleted({ id: id, completed: !completed }));
  }

  function handleDeleteTodo() {
    dispatch(deleteTodo(id));
  }

  function handleEditTodo() {
    setIsEdit(!isEdit);
  }

  function handleSaveEditTodo(e) {
    e.preventDefault();

    if (!editValue) return;

    const newTodo = {
      title: editValue,
      id: id,
    };

    dispatch(editTodo(newTodo));

    setIsEdit(!isEdit);
    setIsToggle(!isToggle);
  }

  function handleToggle() {
    setIsToggle(!isToggle);
  }

  return (
    <>
      {isEdit ? (
        <TodoContainer>
          <TodoEditContainer>
            <Form>
              <Input
                type="text"
                defaultValue={title}
                autoFocus={true}
                onChange={(e) => setEditValue(e.target.value)}
              ></Input>
              <SaveBtn onClick={handleSaveEditTodo}>Save</SaveBtn>
            </Form>
          </TodoEditContainer>
        </TodoContainer>
      ) : (
        <TodoContainer>
          <TodoLeftContainer>
            <CustomCheckBox onClick={handleCompletedTodo}>
              <Checkbox checked={completed} />
            </CustomCheckBox>
            <TodoText type={completed.toString()}>{title}</TodoText>
          </TodoLeftContainer>
          <div>
            <DropDown>
              <Btn type="menus" onClick={handleToggle}>
                <img src="dots 1.svg" alt="dot1" />
              </Btn>
              {isToggle && (
                <DropDownMenu>
                  <BtnList>
                    <Btn onClick={handleEditTodo}>Edit</Btn>
                  </BtnList>
                  <BtnList>
                    <Btn onClick={handleDeleteTodo}>Delete</Btn>
                  </BtnList>
                </DropDownMenu>
              )}
            </DropDown>
          </div>
        </TodoContainer>
      )}
    </>
  );
}

export default Todo;
