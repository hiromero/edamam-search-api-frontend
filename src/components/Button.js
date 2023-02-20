import React, { useState } from 'react';

function Button() {
  const [btnState, setBtnState] = useState(false);

  function favoriteClick() {
    setBtnState(btnState => !btnState);
  }

  let toggleFavorite = btnState ? 'favorite' : 'unfavorite';

  return (
    <span className={toggleFavorite} onClick={favoriteClick}> Favorite
    </span>
  )
}

export default Button
