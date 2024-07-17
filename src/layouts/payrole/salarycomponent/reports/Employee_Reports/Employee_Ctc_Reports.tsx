import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
// Variable_Pay_Earnings_report 
const Employee_Ctc_Reports = () => {
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTableData({
          columns: [
            {
              Header: "Employee Email",
              accessor: "employee_email",
              width: "25%",
            },
            {
              Header: "Annual CTC",
              accessor: "annual_ctc",
              width: "25%",
            },
            {
              Header: "Earnings Name",
              accessor: "earnings_name_list",
              width: "37.5%",
            },
            {
              Header: "Earnings Amount",
              accessor: "earnings_amount_list",
              width: "37.5%",
            },
            {
              Header: "Pre Tax NAme",
              accessor: "pre_tax_name_name",
              width: "37.5%",
            },
            {
              Header: "Pre Tax Calculation type",
              accessor: "pre_tax_calculation_type",
              width: "37.5%",
            },
            {
              Header: "Pre Tax Monthly Amount",
              accessor: "pre_tax_monthly_amount",
              width: "37.5%",
            },
          ],
          rows: response.data.map((employee: any) => ({
            employee_email: employee.employee_email,
            annual_ctc: employee.annual_ctc,
            earnings_name_list: (
              <ul>
                {employee.earnings_type_name.map(
                  (earning: any, index: number) => (
                    <li key={index}>{earning.earnings_name}</li>
                  )
                )}
              </ul>
            ),
            earnings_amount_list: (
              <ul>
                {employee.earnings_type_name.map(
                  (earning: any, index: number) => (
                    <li key={index}>{earning.monthly_amount}</li>
                  )
                )}
              </ul>
            ),

            pre_tax_name_name: (
              <ul>
                {employee.pre_tax_name.map((earning: any, index: number) => (
                  <li key={index}>{earning.pre_tax_name}</li>
                ))}
              </ul>
            ),
            pre_tax_calculation_type: (
              <ul>
                {employee.pre_tax_name.map((earning: any, index: number) => (
                  <li key={index}>{earning.calculation_type}</li>
                ))}
              </ul>
            ),
            pre_tax_monthly_amount: (
              <ul>
                {employee.pre_tax_name.map((earning: any, index: number) => (
                  <li key={index}>{earning.monthly_amount}</li>
                ))}
              </ul>
            ),
          })),
        });
      } catch (error: any) {
        message.error(error.response.data.detail);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto" }}>
        <MDBox>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Employees' CTC Details
          </MDTypography>
        </MDBox>
        <DataTable table={tabledata} />
      </Card>
    </DashboardLayout>
  );
};

export default Employee_Ctc_Reports;
