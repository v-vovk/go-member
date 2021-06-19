import {
  ContactsAction,
  ContactsState,
  ContactsActionTypes,
} from "../../types/contacts";

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactsReducer = (
  state = initialState,
  action: ContactsAction
): ContactsState => {
  switch (action.type) {
    case ContactsActionTypes.FETCH_REPOS:
      return { ...state, loading: true, error: null };
    case ContactsActionTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };

    case ContactsActionTypes.FETCH_REPOS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ContactsActionTypes.FETCH_REPOS_CLEAR:
      return { ...state, loading: false, contacts: [] };

    default:
      return state;
  }
};
