import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'

import { reducers } from './store'

export function renderWithRouter(
  ui,
  { initialEntries = ['/'], route = '/' } = {}
) {
  return {
    ...render(
      <Router initialEntries={initialEntries} initialIndex={0}>
        <Routes>
          <Route path={route} element={ui} />
        </Routes>
      </Router>
    ),
  }
}

export function renderWithRedux(
  ui,
  {
    initialEntries = ['/'],
    route = '/',
    initialState,
    store = configureStore({ reducer: reducers, preloadedState: initialState }),
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router initialEntries={initialEntries} initialIndex={0}>
          <Routes>
            <Route path={route} element={ui} />
          </Routes>
        </Router>
      </Provider>
    ),
    store,
  }
}
