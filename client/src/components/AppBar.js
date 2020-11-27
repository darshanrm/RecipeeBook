import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./AppBar.css";
import { Button, Link, NavLink } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function BackToTop(props) {
  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <div>
            <Typography variant="h5">RecipeeBook</Typography>
          </div>
          <div className="post">
            <Button
              variant="contained"
              onClick={() => history.push("/postRecipee")}
            >
              <span className="text">Post Your Recipee</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
