import React from "react";
import "./PostRecipee.css";
import Background from "./Background";
import FormikForm from './FormikForm';

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function PostRecipee() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4}>
        <Background />
      </Grid>
      <Grid item xs={12} sm={12} md={8} className="form">
        <FormikForm />
      </Grid>
    </Grid>
  );
}

export default PostRecipee;
