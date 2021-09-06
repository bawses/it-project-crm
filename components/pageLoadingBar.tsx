import React from 'react';
import { COLORS } from "../src/colors";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function PageLoadingBar() {
  return (
    <div>
      <LinearProgress color="secondary"/>
      <LinearProgress color="secondary"/>
      <LinearProgress color="secondary"/>
      <LinearProgress color="secondary" />
    </div>
  );
}