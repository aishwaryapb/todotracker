import { batch } from 'react-redux';

import { setLoading, setError, setBtnLoading } from '.';
import { toggleCategoryCompletion } from './categories';
import api from '../api';
import CONFIG from '../config';

export const fetchAllTasks = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    const response = await api.get("/tasks", { params: { user } })
    if (response.status === CONFIG.HTTP_STATUS.OK) {
        dispatch({
            type: "FETCH_ALL_TASKS",
            payload: response.data || {}
        });
    }
    else dispatch(setError(response.data));

    dispatch(setLoading(false))

}

export const updateTasks = (tasks, categoryId) => {
    const tasksObj = { [categoryId || tasks[0]?.categoryId]: tasks };
    return {
        type: "UPDATE_TASKS",
        payload: tasksObj
    }
}

export const selectCategory = (category) => {
    return {
        type: "SELECT_CATEGORY",
        payload: category
    }
}

export const reorderTasks = (reorderedTasks) => async (dispatch, getState) => {
    const { auth, tasks } = getState();
    const { user } = auth;
    const { selectedCategory } = tasks;

    const response = await api.put('/tasks/reorder/', {
        tasks: reorderedTasks,
        categoryId: selectedCategory.id,
        user
    });

    if (response.status !== CONFIG.HTTP_STATUS.OK) dispatch(setError(response.data));
}

export const deleteTask = (task) => async (dispatch) => {
    dispatch(setLoading(true));
    const response = await api.delete('/tasks/' + task.id)
    if (response.status === CONFIG.HTTP_STATUS.OK) {
        batch(() => {
            dispatch({
                type: "DELETE_TASK",
                payload: task
            });
            dispatch(toggleCategoryCompletion());
        });
    }
    else dispatch(setError(response.data))

    dispatch(setLoading(false));
}

export const addTask = (name) => async (dispatch, getState) => {
    dispatch(setLoading(true));

    const { auth, tasks } = getState();
    const { user } = auth;
    const { selectedCategory } = tasks;

    const response = await api.post('/tasks', {
        name,
        user,
        categoryId: selectedCategory.id
    })

    if (response.status === CONFIG.HTTP_STATUS.CREATED) {
        batch(() => {
            dispatch({
                type: "ADD_TASK",
                payload: response.data
            });
            dispatch(toggleCategoryCompletion());
        })
    }
    else dispatch(setError(response.data))

    dispatch(setLoading(false));
}

export const toggleTask = (task) => async dispatch => {
    dispatch(setBtnLoading(true));

    const response = await api.put('/tasks', {
        task: { ...task, completed: !task.completed }
    });

    if (response.status === CONFIG.HTTP_STATUS.OK) {
        batch(() => {
            dispatch({
                type: "TOGGLE_TASK",
                payload: task
            });
            dispatch(toggleCategoryCompletion());
        })
    }
    else dispatch(setError(response.data));

    dispatch(setBtnLoading(false));
}

export const toggleSelectedCategory = (isComplete) => ({
    type: "TOGGLE_SELECTED_CATEGORY",
    payload: isComplete
})