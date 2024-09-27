import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoSuccess: (state, action) => {
      state.todos.unshift(action.payload);
    },
    updateTodoSuccess: (state, action) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodoSuccess: (state, action) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    },
  },
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess,
} = todoSlice.actions;

export default todoSlice.reducer;