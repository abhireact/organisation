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
import { Icon, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");
const Variable_Pay_Earnings_report = () => {
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/report/variable_pay`,
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
            Header: "Employee Name",
            accessor: "emp_name",
            width: "25%",
          },
          {
            Header: "Amount",
            accessor: "amount",
            width: "25%",
          },
        ],
        rows: response.data.map((employee: any) => ({
          emp_name: employee.emp_name,
          amount: parseFloat(employee.amount).toFixed(2),
        })),
      });
    } catch (error: any) {
      message.error(error.response.data.detail);
    }
  };
  useEffect(() => {
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
        <MDBox>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            Mindcom
          </MDTypography>
          <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
            Variable Pay Earnings Report - Bonus
          </MDTypography>
        </MDBox>
        <DataTable table={tabledata} isSorted={false} />
      </Card>
    </DashboardLayout>
  );
};

export default Variable_Pay_Earnings_report;
