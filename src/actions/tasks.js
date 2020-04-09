import { batch } from 'react-redux';

import { db } from '../firebase';
import { setLoading, setError } from '.';
import { toggleCategoryCompletion, fetchCategories } from './categories';

export const fetchTasks = (categoryId) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    user &&
        db.collection('tasks')
            .where("user", "==", user)
            .where("categoryId", "==", categoryId)
            .orderBy("order", "asc")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot?.docs?.map(doc => ({ ...doc.data(), id: doc.id }));
                batch(() => {
                    dispatch({
                        type: "FETCH_TASKS",
                        payload: data
                    });
                    dispatch(setLoading(false));
                });

            })
            .catch(err => {
                console.error(err);
                let msg = "Unable to retrieve tasks";
                batch(() => {
                    dispatch(setError(msg));
                    dispatch(setLoading(false));
                });
            });
}

export const updateTasks = (tasks) => {
    return {
        type: "UPDATE_TASKS",
        payload: tasks
    }
}

export const selectCategory = (category) => {
    return {
        type: "SELECT_CATEGORY",
        payload: category
    }
}

export const reorderTasks = (reorderedTasks) => (dispatch, getState) => {
    const { auth, tasks } = getState();
    const { user } = auth;
    const { selectedCategory } = tasks;
    db.collection('tasks')
        .where("user", "==", user)
        .where("categoryId", "==", selectedCategory.id)
        .get()
        .then(querySnapshot => {
            let batch = db.batch();
            querySnapshot.docs.forEach(doc => {
                const docRef = db.collection('tasks').doc(doc.id);
                const item = doc.data();
                batch.update(docRef, { ...item, order: reorderedTasks.findIndex(task => task.id === doc.id) });
            });
            batch.commit();
        })
        .catch(err => {
            console.error(err);
            let msg = "Unable to reorder the tasks";
            dispatch(setError(msg));
        })
}

// @todo: Update category completion on every delete task. Write a common action

export const deleteTask = (task) => (dispatch) => {
    db.collection('tasks')
        .doc(task.id)
        .delete()
        .then(() => {
            dispatch({
                type: "DELETE_TASK",
                payload: task.id
            });
        })
        .catch((err) => {
            console.error(err);
            let msg = "Unable to delete the task";
            dispatch(setError(msg));
        });
}

export const addTask = (name) => (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth, tasks } = getState();
    const { user } = auth;
    const { data, selectedCategory } = tasks;
    const lastIndex = data[data.length - 1]?.order;
    selectedCategory &&
        db.collection('tasks')
            .doc()
            .set({
                name,
                order: lastIndex !== undefined ? lastIndex + 1 : 0,
                user,
                categoryId: selectedCategory.id,
                completed: false
            })
            .then(() => {
                db.collection("categories").doc(selectedCategory.id)
                    .set({ completed: false }, { merge: true })
                    .then(() => {
                        dispatch(fetchCategories());
                        dispatch(toggleSelectedCategory(false));
                    })
                batch(() => {
                    dispatch(fetchTasks(selectedCategory.id));
                    dispatch(setLoading(false));
                });
            })
            .catch(err => {
                console.error(err);
                let msg = "Unable to add the task";
                batch(() => {
                    dispatch(setError(msg));
                    dispatch(setLoading(false));
                });
            });
}

export const toggleTask = (tasks, task) => async dispatch => {
    db.collection("tasks")
        .doc(task.id)
        .update({ ...task, completed: !task.completed })
        .then(() => {
            toggleCategoryCompletion(tasks, !task.completed)
                .then((isCategoryComplete) => {
                    batch(() => {
                        dispatch(fetchCategories());
                        dispatch(toggleSelectedCategory(isCategoryComplete));
                    });
                });
            dispatch({
                type: "TOGGLE_TASK",
                payload: task
            });
        })
}

export const deleteAssociatedTasks = (categoryId) => {
    db.collection("tasks")
        .where("categoryId", "==", categoryId)
        .get()
        .then(querySnapshot => {
            let batch = db.batch();
            querySnapshot.docs.forEach(doc => {
                const docRef = db.collection('tasks').doc(doc.id);
                batch.delete(docRef)
            });
            batch.commit();
        })
        .catch(err => console.error(err));
}

const toggleSelectedCategory = (isComplete) => ({
    type: "TOGGLE_SELECTED_CATEGORY",
    payload: isComplete
})