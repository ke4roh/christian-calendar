import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Year from './components/Year';
import { Year as CalendarYear, yearFor } from './libs/christian-calendar';
import './App.css';

function App() {
  const [year, setYear] = useState<CalendarYear | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const yearParam = params.get('year');

    let effectiveYear: number;
    if (yearParam && !isNaN(Number(yearParam))) {
      effectiveYear = Math.max(parseInt(yearParam, 10), 1876);
    } else {
      let date = new Date();
      effectiveYear = yearFor(date);
    }


    const newYear = new CalendarYear(effectiveYear);

    setYear(newYear);
  }, [location.search]);

  const navigateToYear = (increment: number) => {
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
