import { ContactsAction, ContactsActionTypes } from "../../types/contacts";
import { Dispatch } from "redux";
import api from "../../api";

export const fetchContacts =
  () => async (dispatch: Dispatch<ContactsAction>) => {
    try {
      dispatch({ type: ContactsActionTypes.FETCH_REPOS });

      const response = await api.get(`/api/contacts`);

      dispatch({
        type: ContactsActionTypes.FETCH_REPOS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ContactsActionTypes.FETCH_REPOS_ERROR,
        payload: error.message,
      });
    }
  };

export const addContact =
  (payload: any) => async (dispatch: Dispatch<ContactsAction>) => {
    try {
      dispatch({
        type: ContactsActionTypes.ADD_CONTACT,
      });

      const response = await api.post("/api/contacts", {
        identity: {
          ...payload,
        },
      });

      response && fetchContacts();
    } catch (error) {
      dispatch({
        type: ContactsActionTypes.ADD_CONTACT_ERROR,
        payload: error.message,
      });
    }
  };
