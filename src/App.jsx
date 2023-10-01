import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Year from './components/Year';
import ChristianCalendar from './libs/christian-calendar.ts';
import './App.css';

function App() {
  const [year, setYear] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  const navigateToYear = (increment) => {
    const newYear = (year ? year.year : new Date().getFullYear()) + increment;
    navigate(`?year=${newYear}`);
  };

  return (
   <div className={"year-demo-container"}>
     <div className={"year-nav-button-container"}>
     <button onClick={() => navigateToYear(-1)}>Previous Year</button>
     <button onClick={() => navigateToYear(1)}>Next Year</button>
     </div>
     {year ? <Year year={year} /> : <div>Loading...</div>}
   </div>
  );
}

export default App;
