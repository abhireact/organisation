import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import { Icon, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");

const SalaryRegister = () => {
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const navigate = useNavigate();
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
              Header: "Earnings Name",
              accessor: "earnings_name_list",
              width: "37.5%",
            },
            {
              Header: "Monthly Amount",
              accessor: "earnings_amount_list",
              width: "37.5%",
            },
          ],
          rows: response.data.map((employee: any) => ({
            employee_email: employee.employee_email,
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
                    <li key={index}>
                      {parseFloat(earning.monthly_amount).toFixed(2)}
                    </li>
                  )
                )}
              </ul>
            ),
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto" }}>
        <Grid item xs={12} sm={12} sx={{ textAlign: "right" }} mx={4} mt={2}>
          <Icon
            onClick={() => {
              navigate(-1);
            }}
          >
            close
          </Icon>
        </Grid>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Salary Register
          </MDTypography>
        </MDBox>
        <DataTable table={tabledata} />
      </Card>
    </DashboardLayout>
  );
};

export default SalaryRegister;
