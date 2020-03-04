import { db } from '../firebase';

export const fetchCategories = () => (dispatch, getState) => {
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
            })
            .catch(err => {
                console.error(err);
                let msg = "Unable to retrieve categories";
                dispatch({ type: "CATEGORIES_ERROR", payload: msg })
            });
}

export const addCategory = (name, order, user) => (dispatch) => {
    db.collection('categories')
        .doc()
        .set({ name, order, user })
        .then(() => dispatch({ type: 'CATEGORY_CREATED' }))
        .catch(err => {
            console.error(err);
            let msg = "Unable to create category";
            dispatch({ type: "CATEGORIES_ERROR", payload: msg })
        });
}