import { useState, useEffect } from "react";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import MDTypography from "components/MDTypography";
const token = Cookies.get("token");

function Salary_details() {
  const [payslipData, setPayslipData] = useState([]);
  console.log(payslipData, "payslipdata");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/history_current_employee`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setPayslipData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleButtonClick = (data: any, index: any) => {
    navigate(`/payslip?data=${encodeURIComponent(JSON.stringify(data))}`, {
      state: payslipData[index],
    });
  };

  const dataTableData = {
    columns: [
      { Header: "Month", accessor: "month" },
      { Header: "Gross Pay", accessor: "gross_pay" },
      { Header: "Deductions", accessor: "deductions" },
      { Header: "Take Home", accessor: "take_home" },
      { Header: "Payslip", accessor: "payslip" },
    ],
    rows: payslipData.map((data, index) => ({
      month: (
        <span
          style={{
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          {data.month}
        </span>
      ),
      gross_pay: data.gross_pay,
      deductions: data.deductions,
      take_home: data.net_pay,
      payslip: (
        <MDButton
          variant="text"
          color="info"
          type="submit"
          onClick={() => {
            handleButtonClick(data, index);
          }}
        >
          SHOW
          <FileDownloadOutlinedIcon />
        </MDButton>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {payslipData.length > 0 ? (
        <Card sx={{ width: "100%", margin: "auto", mt: "4%" }}>
          <DataTable table={dataTableData} />
        </Card>
      ) : (
        <MDTypography variant="h4" color="secondary" fontWeight="bold">
          Not Get Salary....
        </MDTypography>
      )}
    </DashboardLayout>
  );
}

export default Salary_details;
