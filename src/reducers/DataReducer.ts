/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux'

const INITIAL_STATE = {
  loaded: false,
  country: null,
  data: {}
}

const dataReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_LOADED':
      return { ...state, loaded: action.payload }
    case 'SET_COUNTRY':
      return { ...state, country: action.payload }
    case 'UPDATE_DATA':
      return { ...state, data: action.payload }
    default:
      return state
  }
}

export default combineReducers({
  data: dataReducer
})

export const setLoaded = (loaded: string) => (
  {
    type: 'SET_LOADED',
    payload: loaded
  }
)

export const setCountry = (country: string) => (
  {
    type: 'SET_COUNTRY',
    payload: country
  }
)

export const updateData = (data: any) => (
  {
    type: 'UPDATE_DATA',
    payload: data
  }
)
