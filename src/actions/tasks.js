import { db } from '../firebase';
import {setLoading, setError} from '.';

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
                const data = querySnapshot?.docs?.map(doc => ({...doc.data(), id: doc.id}));
                dispatch({
                    type: "FETCH_TASKS",
                    payload: data
                });
                dispatch(setLoading(false))
            })
            .catch(err => {
                console.error(err);
                let msg = "Unable to retrieve tasks";
                dispatch(setError(msg))
                dispatch(setLoading(false))
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
    const { auth, tasks} = getState();
    const { user } = auth;
    const {selectedCategory} = tasks;
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

//@todo: Fix the error thrown in console after delete
export const deleteTask = (taskId) => (dispatch) => {
    db.collection('tasks')
        .doc(taskId)
        .delete()
        .then(() =>
            dispatch({
                type: "DELETE_TASK",
                payload: taskId
            })
        )
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
    const {data, selectedCategory} = tasks;
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
            dispatch(fetchTasks(selectedCategory.id));
        })
        .catch(err => {
            console.error(err);
            let msg = "Unable to add the task";
            dispatch(setError(msg));
            dispatch(setLoading(false));
        });
}

export const toggleTask = (task) => dispatch => {
    db.collection("tasks")
        .doc(task.id)
        .update({...task, completed: !task.completed})
        .then(() => {
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