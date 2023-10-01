import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objects: [],
};

const objetoSlice = createSlice({

  name: "objectsReminder",
  initialState,
  reducers: {
    agregarObjeto: (state, action) => {
      state.objects.push(action.payload);
    },
    eliminarObjeto: (state, action) => {
      const indice = action.payload;
      state.objects.splice(indice, 1);
    },
  },
});

export const { agregarObjeto, eliminarObjeto } = objetoSlice.actions;
export const selectObject = state => state.objectsReminder.objects;
export default objetoSlice.reducer;
