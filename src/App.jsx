import React from 'react';
import Year from './components/Year';
import ChristianCalendar from './libs/christian-calendar.ts';

const year = new ChristianCalendar.Year(ChristianCalendar.yearFor(new Date()));

function App() {
  return <Year year={year} />;
}

export default App;

