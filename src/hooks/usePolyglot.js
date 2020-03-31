import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getLocale,
  getPhrases,
  getPhrasesLoading,
  getPhrasesLoaded,
  getPhrasesError,
} from '../redux/selectors'
import { fetchPhrases, setLocale, setDefaultPhrases } from '../redux/actions'

const usePolyglot = ({defaultUrl, defaultLocale, useDefaultPhrases, defaultPhrases}) => {
  const locale = useSelector(getLocale)
  const phrases = useSelector(getPhrases)
  const phrasesLoading = useSelector(getPhrasesLoading)
  const phrasesLoaded = useSelector(getPhrasesLoaded)
  const phrasesError = useSelector(getPhrasesError)

  const dispatch = useDispatch()

  const handleFetchPhrases = useCallback((url) => {
    dispatch(fetchPhrases(url, defaultPhrases))
  }, [dispatch])

  const handleSetLocale = useCallback((locale) => {
    dispatch(setLocale(locale))
  }, [dispatch])

  useEffect(() => {
    if (!phrasesLoaded) {
      if (useDefaultPhrases) {
        dispatch(setDefaultPhrases(defaultPhrases))
      } else {
        handleFetchPhrases(defaultUrl, defaultPhrases)
      }
    }
  }, [phrasesLoaded, handleFetchPhrases, defaultUrl, defaultPhrases])

  useEffect(() => {
    if (phrasesLoaded) {
      handleSetLocale(defaultLocale)
    }
  }, [phrasesLoaded, handleSetLocale])

  return {
    locale,
    phrases,
    phrasesLoading,
    phrasesLoaded,
    phrasesError,
    fetchPhrases: handleFetchPhrases,
    setLocale: handleSetLocale,
  }
}

export default usePolyglot
