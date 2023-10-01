import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import objetoSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, objetoSlice);

export const store = configureStore({
  reducer: {
    reminders: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false, // Desactiva la verificación de serialización
  }),
});

export const persistor = persistStore(store);
