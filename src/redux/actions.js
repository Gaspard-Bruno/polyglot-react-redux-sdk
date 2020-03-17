import * as actionTypes from './actionTypes'

export const setLocale = (locale) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_LOCALE,
      payload: { locale },
    })
  }
)

export const fetchPhrases = (url) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_PHRASES })

  
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: actionTypes.FETCH_PHRASES_SUCCESS, payload: { phrases: data } })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_PHRASES_FAIL, payload: { error } })
    })
}
