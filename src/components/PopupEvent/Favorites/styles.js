import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  iconButton: {
    color: theme.palette.primary.main,
    fontSize: "3rem",
  },
}));
