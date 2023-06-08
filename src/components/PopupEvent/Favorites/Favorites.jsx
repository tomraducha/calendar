import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStyles } from "./styles";

function Favorites() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton className={classes.iconButton}>
        <FavoriteIcon fontSize="" />
      </IconButton>
    </div>
  );
}

export default Favorites;
