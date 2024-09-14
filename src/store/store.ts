import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "./root-slice";
import caseReducer from "./case-slice";
import userReducer from "./user-slice";

// Create a persist configuration for the reducers you want to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["rootReducer", "caseState", "usersState"],
};

// Combine your reducers
const combinedReducers = combineReducers({
  rootState: rootReducer,
  caseState: caseReducer,
  usersState: userReducer,
});

// Wrap the combined reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

// Create the persistor instance
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
