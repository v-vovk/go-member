export enum ContactsActionTypes {
  FETCH_REPOS = "FETCH_REPOS",
  FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS",
  FETCH_REPOS_ERROR = "FETCH_REPOS_ERROR",
  FETCH_REPOS_CLEAR = "FETCH_REPOS_CLEAR",
  ADD_CONTACT = "ADD_CONTACT",
  ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS",
  ADD_CONTACT_ERROR = "ADD_CONTACT_ERROR",
}

export interface ContactsState {
  contacts: any[];
  loading: boolean;
  error: null | string;
}

interface FetchContactsAction {
  type: ContactsActionTypes.FETCH_REPOS;
}

interface FetchContactsSuccessAction {
  type: ContactsActionTypes.FETCH_REPOS_SUCCESS;
  payload: any[];
}

interface FetchContactsErrorAction {
  type: ContactsActionTypes.FETCH_REPOS_ERROR;
  payload: string;
}

interface FetchContactsClearAction {
  type: ContactsActionTypes.FETCH_REPOS_CLEAR;
}

interface AddContactsAction {
  type: ContactsActionTypes.ADD_CONTACT;
}

interface AddContactsSuccessAction {
  type: ContactsActionTypes.ADD_CONTACT_SUCCESS;
  payload: any[];
}

interface AddContactsErrorAction {
  type: ContactsActionTypes.ADD_CONTACT_ERROR;
  payload: string;
}

export type ContactsAction =
  | FetchContactsAction
  | FetchContactsSuccessAction
  | FetchContactsErrorAction
  | FetchContactsClearAction
  | AddContactsAction
  | AddContactsSuccessAction
  | AddContactsErrorAction;
