import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

type Props = {};

export const Layout = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          xs=8
          <Button variant='contained'>hhhh</Button>
        </Grid>
        <Grid xs={4}>hhh</Grid>
        <Grid xs={4}>hhh</Grid>
        <Grid xs={8}>hhh</Grid>
      </Grid>
    </Box>
  );
};
