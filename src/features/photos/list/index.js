import { useSelector, useDispatch } from 'react-redux';
import {
  removePhoto,
  selectFilteredPhotos,
  toggleFavorite,
  editPhotoCaption
} from '../photos.slice';
import './list.css';

export default function PhotosList() {
  const photos = useSelector(selectFilteredPhotos);
  const dispatch = useDispatch();
  function handleDeleteButtonClick(id) {
    dispatch(removePhoto(id));
    
  }

  function handleToggleFavorite(id) {
    console.log('Toggling favorite for photo with id:', id);
    dispatch(toggleFavorite(id));
  }

  function handleEditCaption(id, newCaption) {
    dispatch(editPhotoCaption({ id, newCaption }));
  }

  const photosListItems = photos.map(({ id, caption, imageUrl, isFavorite }) => (
    <li key={id}>
      <img alt={caption} src={imageUrl} />
      <div>
        <p>{caption}</p>
        <button
          data-testid={`${id}-favorite-button`}
          onClick={() => handleToggleFavorite(id)}>
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <button
          data-testid={`${id}-edit-button`}
          onClick={() => {
            const newCaption = window.prompt('Enter new caption:', caption);
            if (newCaption) {
              handleEditCaption(id, newCaption);
            }
          }}>
          Edit Caption
        </button>
        <button
          data-testid={`${id}-delete-button`}
          onClick={() => handleDeleteButtonClick(id)}>
          Delete
        </button>
      </div>
    </li>
  ));

  return photosListItems.length > 0 ? (
    <ul>{photosListItems}</ul>
  ) : (
    <h3>No doggies to display...</h3>
  );

}
