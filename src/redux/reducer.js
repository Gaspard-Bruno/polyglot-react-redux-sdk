import produce from 'immer'

import * as actionTypes from './actionTypes'

const initialState = {
  locale: undefined,
  phrases: undefined,
  phrasesLoading: false,
  phrasesLoaded: false,
  phrasesError: undefined,
}

const reducer = (state = initialState, action = {}) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.SET_LOCALE:
        draft.locale = action.payload.locale
        break

      case actionTypes.FETCH_PHRASES:
        draft.phrasesLoading = true
        break
      case actionTypes.FETCH_PHRASES_SUCCESS:
        draft.phrasesLoading = false
        draft.phrasesLoaded = true
        draft.phrasesError = undefined
        draft.phrases = action.payload.phrases
        break
      case actionTypes.FETCH_PHRASES_FAIL:
        draft.phrasesLoading = false
        draft.phrasesLoaded = false
        draft.phrasesError = { status: action && action.error && action.error.status || 'Error fetching phrases' }
        break
      case actionTypes.SET_DEFAULT_PHRASES:
        draft.phrases = { ...draft.phrases, default: action && action.payload && action.payload.defaultPhrases || undefined}
        draft.phrasesLoaded = true
        break
      default:
        break
    }
  })
}

export default reducer;
