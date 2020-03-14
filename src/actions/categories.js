import { db } from '../firebase';
import { setLoading } from '.';

export const fetchCategories = () => (dispatch, getState) => {
    dispatch(setLoading(true));
    const { auth } = getState();
    const { user } = auth;
    user &&
        db.collection('categories')
            .orderBy("order", "asc")
            .where("user", "==", user)

            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                dispatch({ type: "FETCH_CATEGORIES", payload: data });
                dispatch(setLoading(false));
            })
            .catch(err => {
                console.error(err);
                let msg = "Unable to retrieve categories";
                dispatch({ type: "CATEGORIES_ERROR", payload: msg })
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
        .set({ name, order: lastIndex !== undefined ? lastIndex + 1 : 0, user })
        .then(() => {
            dispatch(fetchCategories());
        })
        .catch(err => {
            console.error(err);
            let msg = "Unable to create category";
            dispatch({ type: "CATEGORIES_ERROR", payload: msg });
            dispatch(setLoading(false));
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
        });
}