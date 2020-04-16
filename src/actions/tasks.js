import { batch } from 'react-redux';

import { db } from '../firebase';
import { setLoading, setError, setBtnLoading } from '.';
import { toggleCategoryCompletion } from './categories';

const fetchTasks = (categoryId, user) => {
    const tasks = new Promise((resolve, reject) => {
        user &&
            db.collection('tasks')
                .where("user", "==", user)
                .where("categoryId", "==", categoryId)
                .orderBy("order", "asc")
                .get()
                .then(querySnapshot => {
                    const data = querySnapshot?.docs?.map(doc => ({ ...doc.data(), id: doc.id }));
                    resolve(data);
                })
                .catch(err => {
                    reject()
                });
    });
    return tasks;
}

export const fetchAllTasks = () => (dispatch, getState) => {
    dispatch(setLoading(true));
    const { categories, auth } = getState();
    const { user } = auth;
    categories.forEach((category, index) => {
        fetchTasks(category.id, user)
            .then(tasks => {
                dispatch(updateTasks(tasks, category.id));
                if (index === categories.length - 1) dispatch(setLoading(false));
            });
    });
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

export const deleteTask = (task) => (dispatch) => {
    dispatch(setLoading(true));
    db.collection('tasks')
        .doc(task.id)
        .delete()
        .then(() => {
            batch(() => {
                dispatch({
                    type: "DELETE_TASK",
                    payload: task
                });
                dispatch(toggleCategoryCompletion());
                dispatch(setLoading(false));
            });
        })
        .catch((err) => {
            console.error(err);
            let msg = "Unable to delete the task";
            dispatch(setError(msg));
            dispatch(setLoading(false));
        });
}

export const addTask = (name) => (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth, tasks } = getState();
    const { user } = auth;
    const { data, selectedCategory } = tasks;
    const lastIndex = data[data.length - 1]?.order;
    const document = {
        name,
        order: lastIndex !== undefined ? lastIndex + 1 : 0,
        user,
        categoryId: selectedCategory?.id,
        completed: false
    };
    selectedCategory &&
        db.collection('tasks')
            .add(document)
            .then((docRef) => {
                batch(() => {
                    dispatch({
                        type: "ADD_TASK",
                        payload: { ...document, id: docRef.id }
                    });
                    dispatch(toggleCategoryCompletion());
                    dispatch(setLoading(false));
                })
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
    dispatch(setBtnLoading(true));
    db.collection("tasks")
        .doc(task.id)
        .update({ ...task, completed: !task.completed })
        .then(() => {
            batch(() => {
                dispatch({
                    type: "TOGGLE_TASK",
                    payload: task
                });
                dispatch(toggleCategoryCompletion());
                dispatch(setBtnLoading(false));
            })
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

export const toggleSelectedCategory = (isComplete) => ({
    type: "TOGGLE_SELECTED_CATEGORY",
    payload: isComplete
})