// Imports: Dependencies
import { combineReducers } from 'redux'

// importing reducers
import DataReducer from './DataReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
  dataReducer: DataReducer
})

export default rootReducer
