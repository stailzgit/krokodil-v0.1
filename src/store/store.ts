import { combineReducers, createStore } from "@reduxjs/toolkit";
import playersReducer from './reducers/PlayerSlice'
import cardsReducer from './reducers/CardSlice'
import { configureStore } from '@reduxjs/toolkit';
import {loadState, saveState} from "../utils/local-storage";
import settingsSlice from './reducers/SettingsSlice';


const rootReducer = combineReducers({
    playersReducer,
    cardsReducer,
    settingsSlice,
})

// export const store = createStore(rootReducer, loadState())

// const setupStore = () => {
//     return configureStore({
//         reducer: rootReducer,
//         preloadedState: loadState(),
//         // middleware: (getDefaultMiddleware) =>
//         //     getDefaultMiddleware().concat(postAPI.middleware)
//     })
// }

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
})

store.subscribe(() => {
    saveState({
        playersReducer: store.getState().playersReducer,
        cardsReducer: store.getState().cardsReducer,
        settingsSlice: store.getState().settingsSlice,
    });
});



export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']