import styled from "styled-components";
import Todo from "./Todo";

const TodosContainer = styled.main`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

function Todos({ todos, doneSorted, unDoneSorted, sortedBy }) {
  let sorted;
  const allSorted = todos.todos;

  if (sortedBy === "all") sorted = allSorted;
  if (sortedBy === "done") sorted = doneSorted;
  if (sortedBy === "undone") sorted = unDoneSorted;

  return (
    <TodosContainer>
      {sorted.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </TodosContainer>
  );
}

export default Todos;
