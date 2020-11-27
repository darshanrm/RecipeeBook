import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BgImage from "./HomeBackground.jpg";

const useStyles = makeStyles((theme) => ({
  homeImg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${BgImage})`,
    height: "700px",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    fontSize: "4rem",
    display: "flex",
    alignItems: "center",
    backgroundPosition: "center",
    position: "relative",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
}));

function Background() {
  const classes = useStyles();
  return (
    <Box className={classes.homeImg}>
      <Box>RecipeeBook</Box>
    </Box>
  );
}

export default Background;
