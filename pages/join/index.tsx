import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import LoginForm from "./login-form";

const Join = () => {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h3" align="center">
            Log in or sign up to create a commonplace book!
          </Typography>
        </Grid>
        <Grid item md={6}>
          <LoginForm />
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </Container>
  );
};

export default Join;
