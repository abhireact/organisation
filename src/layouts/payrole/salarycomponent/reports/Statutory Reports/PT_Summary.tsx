import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

const dataTableData = {
  columns: [
    { Header: "EMPLOYEE ID", accessor: "employee_id" },
    { Header: "EMPLOYEE NAME", accessor: "employee_name" },
    { Header: "PT AMOUNT", accessor: "pt_amount" },
  ],
  rows: [
    {
      employee_id: "co founder",
      employee_name: "Lara Puleque",
      pt_amount: 8776,
    },
    {
      employee_id: "founder",
      employee_name: "Puleque",
      pt_amount: 98722,
    },
    {
      employee_id: "leader",
      employee_name: "leque",
      pt_amount: 987232,
    },
    {
      employee_id: "designer",
      employee_name: "leoo",
      pt_amount: 7232,
    },
  ],
};
const PT_Summary = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            PT Summary
          </MDTypography>
          <MDTypography variant="body2" sx={{ textAlign: "center" }}>
            Contribution period from 01/09/2023 to 30/09/2023
          </MDTypography>
        </MDBox>
        <DataTable table={dataTableData} />
      </Card>
    </DashboardLayout>
  );
};

export default PT_Summary;
