import { createSelector } from 'reselect'
import Polyglot from 'node-polyglot'

export const getLocale = createSelector(
  (state) => state.polyglot.locale,
  (locale) => locale
)

export const getPhrases = createSelector(
  (state) => state.polyglot.phrases,
  (phrases) => phrases
)

export const getPhrasesLoading = createSelector(
  (state) => state.polyglot.phrasesLoading,
  (phrasesLoading) => phrasesLoading
)

export const getPhrasesLoaded = createSelector(
  (state) => state.polyglot.phrasesLoaded,
  (phrasesLoaded) => phrasesLoaded
)

export const getPhrasesError = createSelector(
  (state) => state.polyglot.phrasesError,
  (phrasesError) => phrasesError
)
