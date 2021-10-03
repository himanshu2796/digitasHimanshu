import './App.css';
import { observer } from 'mobx-react';
import HeaderFile from './Pages/HeaderFile';
import GridView from './Pages/GridView';
import CarouselView from './Pages/CarouselView';
import { Grid } from '@material-ui/core';
import gridCarouselStore from './Stores/gridCarouselStores';

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <HeaderFile></HeaderFile>
      </Grid>
      {gridCarouselStore.gridView === true?
      <Grid item xs={12}>
          <GridView></GridView>
      </Grid>:
      <Grid item xs={12}>
          <CarouselView></CarouselView>
      </Grid>
}
      </Grid>
    </div>
  );
}

export default observer(App);
