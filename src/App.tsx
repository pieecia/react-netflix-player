import * as React from 'react';
import Player from './Player/Player';
import { Grid } from '@mui/material';

const App: React.FC = () => {
  return (
    <Grid container alignContent="center" justifyContent="center" spacing={2} height="100vh">
      <Grid item xs={5}>
        <Player
          url={
            'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
          }
          light={
            'https://images.unsplash.com/photo-1655601597743-7ddd6fdc2903?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80'
          }
        />
      </Grid>
    </Grid>
  );
};

export default App;
