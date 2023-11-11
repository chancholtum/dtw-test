import { useState } from "react";
import styled from "styled-components";

const HeadTasksContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
`;

const TasksText = styled.p`
  color: #000;
  font-size: 24px;
  font-weight: 500;
`;

const DropDown = styled.ul`
  position: relative;
`;

const DropDownMenu = styled.li`
  list-style: none;
  padding: 5px 6px;
  color: #2e2e2e;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-radius: 8px;
    background: #585292;
    color: #fff;
  }
`;

const SelectContainerDropDown = styled.div`
  width: 110px;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 10px 6px;
  top: calc(100% + 5px);
  position: absolute;
  z-index: 100;
`;

const SelectContainerDefault = styled.div`
  width: 110px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 8px 7px 10px;
  height: 29px;
  cursor: pointer;

  &:focus {
    & + ${SelectContainerDropDown} {
      /* opacity: 1; */
      display: block;
      z-index: 100;
    }
  }
`;

const SelectText = styled.p`
  color: #000;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ArrowImg = styled.img`
  width: 14px;
  height: 14px;
`;

function HeadTasks({ setSortBy }) {
  const [isToggle, setIsToggle] = useState(false);
  function handleAllSorted() {
    setSortBy("all");
    setIsToggle(!isToggle);
  }
  function handleDoneSorted() {
    setSortBy("done");
    setIsToggle(!isToggle);
  }
  function handleUnDoneSorted() {
    setSortBy("undone");
    setIsToggle(!isToggle);
  }

  function handleToggle() {
    setIsToggle(!isToggle);
  }

  return (
    <HeadTasksContainer>
      <TasksText>Tasks</TasksText>
      <DropDown>
        <SelectContainerDefault onClick={handleToggle}>
          <SelectText>All</SelectText>
          <ArrowImg src="chev-down.svg" />
        </SelectContainerDefault>
        {isToggle && (
          <SelectContainerDropDown>
            <DropDownMenu onClick={handleAllSorted}>All</DropDownMenu>
            <DropDownMenu onClick={handleDoneSorted}>Done</DropDownMenu>
            <DropDownMenu onClick={handleUnDoneSorted}>Undone</DropDownMenu>
          </SelectContainerDropDown>
        )}
      </DropDown>
    </HeadTasksContainer>
  );
}

export default HeadTasks;
