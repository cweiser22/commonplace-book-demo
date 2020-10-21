import {
  AppBar,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { GetStaticProps, NextPageContext } from "next";
import React from "react";
import NextLink from "next/link";
import { demoEntries } from "../../utils/sample-data";

const DemoBlog: React.FC<{ entries: any[] }> = ({ entries }) => {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Cooper Weiser's Commonplace Book</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: "15%" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h2" align="center">
              Welcome to Cooper Weiser's Commonplace Book
            </Typography>
            <Typography variant="body1" align="center">
              Here is a compilation of my readings and reflections from Kresge
              1.
            </Typography>
          </Grid>
          <Grid item md={3} />
          <Grid item md={6} xs={12}>
            <List>
              {entries.map((e, i) => {
                return (
                  <Link href={`demo-blog/${e.id}`}>
                    <div>
                      <Typography>{e.name}</Typography>
                    </div>
                  </Link>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DemoBlog;

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
  return {
    props: {
      entries: demoEntries,
    },
  };
};
