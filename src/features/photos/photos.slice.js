import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/search.slice";
import photos from "./photos.data.js";

const initialState = {
  photos,
};

const options = {
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift(action.payload);
    },
    removePhoto: (state, action) => {
      state.photos.splice(
        state.photos.findIndex((photo) => photo.id === action.payload),
        1
      );
    },
    toggleFavorite: (state, action) => {
      const photo = state.photos.find((photo) => photo.id === action.payload);
      if (photo) {
        photo.isFavorite = !photo.isFavorite;
      }
    },
    editPhotoCaption: (state, action) => {
      const { id, newCaption } = action.payload;
      const photo = state.photos.find((photo) => photo.id === id);
      if (photo) {
        photo.caption = newCaption;
      }
    },
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto, toggleFavorite, editPhotoCaption } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const searchTerm = selectSearchTerm(state);
  return state.photos.photos.filter((photo) =>
    photo.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );
};