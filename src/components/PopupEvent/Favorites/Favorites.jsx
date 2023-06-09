import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Root, StyledIconButton, StyledTypography } from "./styles";

function Favorites() {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleIconClick() {
    setIsFavorite((prev) => !prev);
  }

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

export default Favorites;
