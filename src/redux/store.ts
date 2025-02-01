import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use local storage as default
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { authReducer } from "./authReducer/reducer";

// Configure persist settings
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"], // Only persist the counter state
};

// Combine reducers
const rootReducer = combineReducers({
    // counter: counterReducer, // Add your reducers here
    auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Persistor for persisting state
export const persistor = persistStore(store);

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch & selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
