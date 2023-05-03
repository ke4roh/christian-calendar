import React from 'react';
import Year from './components/Year';
import ChristianCalendar from './libs/christian-calendar.ts';

const year = ChristianCalendar.Year(2023) 

function App() {
  return <Year year={year} />;
}

export default App;

