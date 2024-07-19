import { configureStore } from '@reduxjs/toolkit';
import sportclubReducer from '../redux/feature/sportclub/SportClubSlice';
import mapSlices from './feature/mapSlice/MapSlices';
import hoverandCountSlcie  from './feature/HoverOnMapSlcie';

export const store = configureStore({
  reducer: {
    sportclubs: sportclubReducer,
    map: mapSlices,
    countAndHovers: hoverandCountSlcie,
  },
});
