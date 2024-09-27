import axios from 'axios';
import { toast } from 'react-toastify';
import {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess,
} from '../reducers/todoReducer';

const API_URL = `http://localhost:5000/api/todos`;


export const fetchTodos = () => async (dispatch) => {
  dispatch(fetchTodosStart());
  try {
    const response = await axios.get(API_URL);
    dispatch(fetchTodosSuccess(response.data));
  } catch (error) {
    dispatch(fetchTodosFailure(error.message));
    toast.error('Failed to fetch todos');
  }
};

export const addTodo = (todo) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, todo);
    dispatch(addTodoSuccess(response.data));
    toast.success('Todo added successfully');
  } catch (error) {
    dispatch(fetchTodosFailure(error.message));
    toast.error('Failed to add todo');
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    dispatch(updateTodoSuccess(response.data));
    toast.success('Todo updated successfully');
  } catch (error) {
    dispatch(fetchTodosFailure(error.message));
    toast.error('Failed to update todo');
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteTodoSuccess(id));
    toast.success('Todo deleted successfully');
  } catch (error) {
    dispatch(fetchTodosFailure(error.message));
    toast.error('Failed to delete todo');
  }
};