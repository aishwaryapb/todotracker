import { db } from '../firebase';
import { setLoading, setError, setSuccess } from '.';
import { deleteAssociatedTasks, toggleSelectedCategory } from './tasks';
import { batch } from 'react-redux';

export const fetchCategories = () => (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    user &&
        db.collection('categories')
            .where("user", "==", user)
            .orderBy("order", "asc")
            .get()
            .then(querySnapshot => {
                const data = querySnapshot?.docs?.map(doc => ({ ...doc.data(), id: doc.id }));
                batch(() => {
                    dispatch({ type: "FETCH_CATEGORIES", payload: data });
                    dispatch(setLoading(false));
                });
            })
            .catch(err => {
                console.error(err);
                let msg = "Unable to retrieve categories";
                batch(() => {
                    dispatch(setLoading(false));
                    dispatch(setError(msg));
                });
            });
}

export const updateCategories = (categories) => {
    return {
        type: "UPDATE_CATEGORIES",
        payload: categories
    }
}

export const addCategory = (name, categories) => (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    const lastIndex = categories[categories.length - 1]?.order;
    db.collection('categories')
        .doc()
        .set({ name, order: lastIndex !== undefined ? lastIndex + 1 : 0, user, completed: false })
        .then(() => {
            dispatch(fetchCategories());
        })
        .catch(err => {
            console.error(err);
            let msg = "Unable to create category";
            batch(() => {
                dispatch(setError(msg));
                dispatch(setLoading(false));
            });
        });
}

export const reorderCategories = (categories) => (dispatch, getState) => {
    const { auth } = getState();
    const { user } = auth;
    db.collection('categories')
        .where("user", "==", user)
        .get()
        .then(querySnapshot => {
            let batch = db.batch();
            querySnapshot.docs.forEach(doc => {
                const docRef = db.collection('categories').doc(doc.id);
                const item = doc.data();
                batch.update(docRef, { ...item, order: categories.findIndex(category => category.id === doc.id) });
            });
            batch.commit();
        })
        .catch(err => {
            console.error(err);
            let msg = "Unable to reorder the categories";
            dispatch(setError(msg));
        })
}

export const deleteCategory = (category) => (dispatch) => {
    db.collection('categories')
        .doc(category.id)
        .delete()
        .then(() => {
            dispatch({
                type: "DELETE_CATEGORY",
                payload: category.id
            });
            deleteAssociatedTasks(category.id);
        })
        .catch(err => {
            console.error(err);
            let msg = "Unable to delete the category";
            dispatch(setError(msg));
        })
}

export const toggleCategoryCompletion = () => (dispatch, getState) => {
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

    db.collection("categories")
        .doc(category.id)
        .set({ completed: isCategoryComplete }, { merge: true })
        .then(() => {
            batch(() => {
                dispatch(toggleSelectedCategory(isCategoryComplete));
                dispatch(updateCategories(updatedCategories));
                if (isAllCategoriesComplete) dispatch(setSuccess("Congratulations! You have completed all your tasks 🎉"))
            })
        });

}