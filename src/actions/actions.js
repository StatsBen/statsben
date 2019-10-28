import firestore from "../authentication/firebase";

export const defaultOffs = [
  "projects",
  "certifications",
  "publications",
  "work"
];

export const actionTypes = {
  LOAD_FIVE_MORE_REQUEST: "loadfivemore",
  LOAD_FIVE_MORE_SUCCESS: "loadfivemoresuccess",
  LOAD_FIVE_MORE_FAILURE: "loadfivemorefail",
  SELECT_NEW_FILTER_REQUEST: "selectfilter",
  SELECT_NEW_FILTER_SUCCESS: "selectfiltersuccess",
  SELECT_NEW_FILTER_FAILURE: "selectfilterfail"
};

export const fetchFiveMore = () => {
  return (dispatch, state) => {
    dispatch({ type: actionTypes.LOAD_FIVE_MORE_REQUEST });

    let q = firestore.collection("entries");
    if (state.lastLoaded) {
      q = q.orderBy("date", "desc");
      q = q.startAfter(state.lastLoaded);
      q = q.limit(5);
    } else {
      q = q.orderBy("date", "desc");
      q = q.limit(5);
    }

    defaultOffs.map(type => {
      if (state.activeFilters.includes(type)) return;
      q = q.where(`types.${type}`, "==", false);
    });

    if (state.activeFilters.length) {
      state.activeFilters.map(type => {
        q = q.where(`types.${type}`, "==", true);
      });
    }

    q.get()
      .then(snapshot => {
        if (snapshot.empty) {
          dispatch(addEntriesToList([], null, false));
        } else {
          const entries = snapshot.docs.map(doc => doc.data());
          const lastLoaded = snapshot.docs[snapshot.docs.length - 1];
          const moreToLoad = this.state.limit == snapshot.docs.length;
          dispatch(addEntriesToList(entries, lastLoaded, moreToLoad));
        }
      })
      .catch(err => {
        console.error("Firestore error!");
        console.error(err);
        dispatch(handleGetEntriesFailure(err));
      });
  };
};

export const setStateToWaiting = () => ({
  type: actionTypes.LOAD_FIVE_MORE_REQUEST,
  payload: null
});

export const addEntriesToList = (entries, lastLoaded, moreToLoad) => ({
  type: actionTypes.LOAD_FIVE_MORE_SUCCESS,
  payload: { entries, lastLoaded, moreToLoad }
});

export const handleGetEntriesFailure = err => ({
  type: actionTypes.LOAD_FIVE_MORE_FAILURE,
  payload: { err }
});

// export const selectFilterAction = newType => ({
//   type: actionTypes.LOAD_FIVE_MORE,
//   payload: { newType }
// });
