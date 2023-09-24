import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Year from './components/Year';
import ChristianCalendar from './libs/christian-calendar.ts';
import './App.css';

function App() {
  const [year, setYear] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const yearParam = params.get('year');

    console.log("URL Year Param:", yearParam); // Debug log 1

    let effectiveYear;
    if (yearParam && !isNaN(yearParam)) {
      effectiveYear = Math.max(parseInt(yearParam), 1876);
    } else {
      let date = new Date();
      console.log("Date Object:", date); // Debug log 1.5
      effectiveYear = ChristianCalendar.yearFor(date);
      console.log("Effective Year:", effectiveYear); // Debug log 1.75
    }

    console.log("Effective Year:", effectiveYear); // Debug log 2

    const newYear = new ChristianCalendar.Year(effectiveYear);
    console.log("ChristianCalendar.Year Object:", newYear); // Debug log 3

    setYear(newYear);
  }, [location.search]);

  console.log("Current Year State:", year); // Debug log 4

  return year ? <Year year={year} /> : <div>Loading...</div>;
}

export default App;
