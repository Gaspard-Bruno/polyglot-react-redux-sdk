import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Polyglot from 'node-polyglot'

import { getLocale, getPhrases } from '../redux/selectors'

const useTranslate = (prefix) => {
  const locale = useSelector(getLocale)
  const phrases = useSelector(getPhrases)

  const translate = useMemo(() => {
    const p = new Polyglot({ phrases: phrases[locale] || phrases.default || {} })

    return (key, ...args) => p.t(key, ...args)
  }, [phrases, locale])

  const t = useMemo(() => (
    (key, ...args) => translate([prefix, key].filter(s => s).join('.'), ...args)
  ), [prefix, translate])

  return t
}

export default useTranslate
