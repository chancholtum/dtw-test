import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

const BASE_URL = "http://localhost:9000";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch(`${BASE_URL}/todos`);
  const data = await res.json();
  return data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    toggleCompleted(state, action) {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      state.todos[index].completed = action.payload.completed;
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo(state, action) {
      const { title, id } = action.payload;

      const currentTodo = state.todos.find((todo) => todo.id === id);

      if (currentTodo) {
        currentTodo.title = title;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.error.message;
    });
  },
});
export const { addTodo, toggleCompleted, deleteTodo, editTodo } =
  todosSlice.actions;
export default todosSlice.reducer;

export const getDoneSorted = (state) =>
  state.todos.todos.filter((todo) => todo.completed === true);

export const getUnDoneSorted = (state) =>
  state.todos.todos.filter((todo) => todo.completed !== true);
