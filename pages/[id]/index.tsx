import {
  Container,
  Grid,
  Link,
  List,
  ListItemText,
  ListItem,
  Typography,
} from "@material-ui/core";
import { GetStaticProps } from "next";
import React from "react";
import { demoEntries } from "../../utils/sample-data";
import ReactMarkdown from "react-markdown";

const ShowEntry: React.FC<{ recentEntries: any[]; entry: any }> = ({
  entry,
  recentEntries,
}) => {
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item md={3}>
          <List>
            {recentEntries.map((e, i) => {
              return (
                <Link href={`${e.id}`}>
                  <ListItem key={i}>
                    <ListItemText>{e.name}</ListItemText>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Grid>
        <Grid item md={9} style={{ marginTop: "1rem" }}>
          <Typography variant="subtitle2">{entry.name}</Typography>
          <Typography>
            <ReactMarkdown source={entry.body} />
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } }, // See the "paths" section below
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
    ],
    fallback: false, // See the "fallback" section below
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  let strId = context.params!.id || "1";
  let id: number = +strId;
  let entry = demoEntries[id - 1];
  return {
    props: {
      recentEntries: demoEntries,
      entry: entry,
    },
  };
};

export default ShowEntry;
