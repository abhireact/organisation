import React from "react";

interface MonthYear {
  month: string;
  year: number;
}

function getCurrentFinancialYearMonths(): MonthYear[] {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Determine the start month of the financial year (e.g., April)
  const financialYearStartMonth = 3; // April (0-indexed)
  const startMonth =
    currentMonth >= financialYearStartMonth ? financialYearStartMonth : financialYearStartMonth - 1;

  // Calculate the start year of the financial year
  const startYear = currentMonth >= financialYearStartMonth ? currentYear : currentYear - 1;

  const months: MonthYear[] = [];
  for (let i = 0; i < 12; i++) {
    const month = (startMonth + i) % 12;
    const year = startYear + Math.floor((startMonth + i) / 12);
    months.push({ month: month < 9 ? `0${month + 1}` : `${month + 1}`, year });
    if (month === 2 && i !== 0) break; // Break the loop when March is reached
  }

  return months;
}

const FinancialYearMonths: React.FC = () => {
  const financialYearMonths = getCurrentFinancialYearMonths();

  return (
    <div>
      <h2>Financial Year Months</h2>
      <ul>
        {financialYearMonths.map(({ month, year }, index) => (
          <li key={index}>
            {month}-{year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialYearMonths;
