import { setLoading, setError, setSuccess } from '.';
import { toggleSelectedCategory } from './tasks';
import { batch } from 'react-redux';
import api from '../api';
import CONFIG from '../config';

export const fetchCategories = () => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    if (user) {
        const response = await api.get('/categories', { params: { user } });
        if (response.status === CONFIG.HTTP_STATUS.OK) {
            dispatch({ type: "FETCH_CATEGORIES", payload: response.data });
            dispatch(setLoading(false));
        }
        else {
            batch(() => {
                dispatch(setLoading(false));
                dispatch(setError(response.data));
            });
        }
    }
}

export const updateCategories = (categories) => {
    return {
        type: "UPDATE_CATEGORIES",
        payload: categories
    }
}

export const addCategory = (name, categories) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    const response = await api.post('/categories', { user, name })
    if (response.status === CONFIG.HTTP_STATUS.CREATED) dispatch(fetchCategories())
    else {
        dispatch(setError(response.data));
        dispatch(setLoading(false));
    }
}

export const reorderCategories = (categories) => async (dispatch, getState) => {
    const { auth } = getState();
    const { user } = auth;
    const response = await api.put('/categories/reorder', { user, categories });
    if (response.status !== CONFIG.HTTP_STATUS.OK) dispatch(setError(response.data))
}

export const deleteCategory = (category) => async (dispatch) => {
    dispatch(setLoading(true));
    const response = await api.delete('/categories/' + category.id);
    if (response.status === CONFIG.HTTP_STATUS.OK) {
        batch(() => {
            dispatch({
                type: "DELETE_CATEGORY",
                payload: category.id
            });
            dispatch(setLoading(false));
        });
    }
    else {
        batch(() => {
            dispatch(setError(response.data));
            dispatch(setLoading(false));
        })
    }
}

export const toggleCategoryCompletion = () => async (dispatch, getState) => {
    const allTasks = getState().tasks.data;
    let category = getState().tasks.selectedCategory;
    const categories = getState().categories;
    const tasks = allTasks[category?.id];

    const isCategoryComplete = tasks.length !== 0 && tasks.filter(task => task.completed === true).length === tasks.length;
    category = { ...category, completed: isCategoryComplete };

    let updatedCategories = [];
    let isAllCategoriesComplete = true;

    categories.forEach(cat => {
        const updatedCategory = cat.id === category.id ? category : cat;
        updatedCategories.push(updatedCategory);
        if (!updatedCategory.completed) isAllCategoriesComplete = false;
    });

    const response = await api.put('/categories', { category });

    if (response.status === CONFIG.HTTP_STATUS.OK) {
        batch(() => {
            dispatch(toggleSelectedCategory(isCategoryComplete));
            dispatch(updateCategories(updatedCategories));
            if (isAllCategoriesComplete) dispatch(setSuccess(CONFIG.messages.allTasksComplete))
        })
    }
    else dispatch(setError(response.data));

}