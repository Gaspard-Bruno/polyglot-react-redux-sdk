# Polyglot SDK for React+Redux

SDK for a React and Redux app architecture to easily connect to a [Polyglot](https://polyglot.gaspardbruno.com) project.

## Getting started

`yarn add polyglot-react-redux-sdk`

### Requirements

* [React](https://reactjs.org) is a dependency for this package.
* [Redux](https://redux.js.org) is a dependency for this package.
* A kind of redux thunk middleware is needed for the async actions to work (e.g. [redux-thunk](https://github.com/reduxjs/redux-thunk))

## Usage
The following modules can be imported

### reducer
The polyglot reducer that should be combined with the existing app reducers

### actionTypes
The reducer action types:

* `SET_LOCALE`
* `FETCH_PHRASES`
* `FETCH_PHRASES_SUCCESS`
* `FETCH_PHRASES_FAIL`

### actions
The reducer actions:

* `setLocale(locale)`
* `fetchPhrases(url)`

### selectors
The reducer selectors:

* `getLocale`
* `getPhrases`
* `getPhrasesLoading`
* `getPhrasesLoaded`
* `getPhrasesError`

### usePolyglot
React hook to manage the phrases. It will fetch from the url if it's passed as an argument.

```js
const {
  locale,
  phrases,
  phrasesLoading,
  phrasesLoaded,
  phrasesError,
  fetchPhrases,
  setLocale,
} = usePolyglot(polyglotConfig)
```

### polyglotConfig
A configration object to be consumed by the usePolyglot hook when starting the app
```ts
{
  defaultUrl: string // URL with the translation data to be consumed by polyglot
  defaultLocale: string //  ISO-639-1 Code
  defaultPhrases: object // translation data to be used as a fallback or in development
  useDefaultPhrases: boolean // force usage of defaultPhrases bypassing fetching translation data from the defaultUrl,
}
```

### useTranslate
React hook to expose the a function to get a string (uses the [polyglot.js](https://github.com/airbnb/polyglot.js) counterpart under the hood). It can be used with or without a prefix.

```js
const t = useTranslate()
<h1>{t('home.title')}</h1>

const t = useTranslate('home')
<h1>{t('title')}</h1>
```

## Example
```js
/*  store.js */

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer as polyglotReducer } from 'polyglot-react-redux-sdk'

const rootReducer = combineReducers({
  ...
  polyglot: polyglotReducer,
  ...
})

const initializeStore = () => (
  createStore(rootReducer, applyMiddleware(thunk));
)

export default initializeStore
...
```

```js
/*  App.js */

import React from 'react'
import { usePolyglot } from 'polyglot-react-redux-sdk'

import Home from 'pages/Home'

const polyglotProjectUrl = 'https://d8wn722pvlrac.cloudfront.net/c81e728d1124862c/all.json'

const App = () => {
  const { phrasesLoaded } = usePolyglot(polyglotConfig)

  return (
    phrasesLoaded ?
      <Home />
      :
      <h1>Phrases loading...</h1>
  );
}

export default App
```

```js
/*  Home.js */

import React from 'react'

import { useTranslate } from 'polyglot-react-redux-sdk'

const Home = () => {
  const t = useTranslate('home')

  return (
    <div className="home-page">
	<h1 className="title">{t('title')}</h1>
    </div>
  )
}

export default Home

```

## Credits
This is an adaptation of [node-polyglot](https://github.com/ricardobeat/node-polyglot) inspired by [redux-polyglot](https://github.com/Tiqa/redux-polyglot). Thanks to both!

## License

MIT
