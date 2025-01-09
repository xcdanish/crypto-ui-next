'use client';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import BasicGrid from 'components/Grid/BasicGrid';
import MultipleBreakPoints from 'components/Grid/MultipleBreakPoints';
import SpacingGrid from 'components/Grid/SpacingGrid';
import ComplexGrid from 'components/Grid/ComplexGrid';
import AutoGrid from 'components/Grid/AutoGrid';
import ColumnsGrid from 'components/Grid/ColumnsGrid';
import NestedGrid from 'components/Grid/NestedGrid';
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ===============================|| GRID SYSTEM||=============================== //

const GridSystem = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12} md={6}>
      <MainCard title="Basic Grid">
        <BasicGrid />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <MainCard title="Multiple Breakpoints">
        <MultipleBreakPoints />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <MainCard title="Spacing Grid">
        <SpacingGrid />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <MainCard title="Complex Grid">
        <ComplexGrid />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <MainCard title="Auto Grid">
        <AutoGrid />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <MainCard title="Column Grid">
        <ColumnsGrid />
      </MainCard>
    </Grid>
    <Grid item xs={12}>
      <MainCard title="Nested Grid">
        <NestedGrid />
      </MainCard>
    </Grid>
  </Grid>
);

export default GridSystem;
