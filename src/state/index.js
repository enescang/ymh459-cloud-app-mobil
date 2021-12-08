import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getNavigator } from '../navigation/navigator';
import * as auth from "./auth";
// import * as theme from "./theme";


const store = createStore(combineReducers({
    auth:auth.reducer,
    // theme:theme.reducer,
}),applyMiddleware(thunk));

const actions = {
    auth:auth.generateActions(store,getNavigator),
    // theme:theme.generateActions(store,getNavigator)
}
export {
    actions,
    store
};