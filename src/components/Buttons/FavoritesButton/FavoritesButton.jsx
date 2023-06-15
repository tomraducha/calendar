/* BTIB */
import { Root, StyledIconButton, StyledTypography } from "./styles";
/* Libs & plugins */
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function FavoritesButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleIconClick() {
    setIsFavorite((prev) => !prev);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <Root>
      <StyledTypography>Favoris</StyledTypography>
      <StyledIconButton onClick={handleIconClick}>
        {isFavorite ? (
          <FavoriteIcon fontSize="large" />
        ) : (
          <FavoriteBorderIcon fontSize="large" />
        )}
      </StyledIconButton>
    </Root>
  );
}

export default FavoritesButton;
