/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Mindcom Group (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// types
interface Types {
  labels: string[];
  datasets: {
    label: string;
    color:
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "light"
      | "dark";
    data: number[];
  }[];
}

const horizontalBarChartData: Types = {
  labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
  datasets: [
    {
      label: "Sales by age",
      color: "dark",
      data: [15, 20, 12, 60, 20, 15],
    },
  ],
};

export default horizontalBarChartData;
