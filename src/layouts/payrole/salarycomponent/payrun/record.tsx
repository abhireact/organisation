import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
// import "./weekday.css";
import {
  FormControlLabel,
  Card,
  Grid,
  Dialog,
  IconButton,
  Link,
  Autocomplete,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import Divider from "@mui/material/Divider";
// import CancelIcon from '@mui/icons-material/Cancel';
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import MDInput from "components/MDInput";
import { message } from "antd";
const token = Cookies.get("token");
const initialValues = {
  esi_number: "",
  deduction_cycle: "",
  employees_contribution: "",
  employers_contribution: "",
  include_employers_contribution_in_the_ctc: true,
  payment_method: "",
  paid_date: "",
};
interface PayrunData {
  month: string; // Replace 'string' with the actual type of 'month'
  status: string; // Replace 'string' with the actual type of 'status'
  net_pay: number;
  no_of_emp: number; // Replace 'string' with the actual type of 'net_pay'
  date: string;
  emp_salary: [];
}
interface PopupData {
  name?: string;
  net_pay?: number;
  lop?: number;
  status?: string;
  num_of_days?: number;
  earnings?: { earnings_name: any; monthly_amount: number }[];
  pre_tax?: { earnings_name: any; monthly_amount: number }[];
  earning_amt?: number;
  pre_tax_amt?: number;
  tax_amt?: number;
  epf_amt?: number;
  lop_amt?: number;
}
function PayrunRecoed(props: any) {
  const [openPopup, setOpenPopup] = useState(false);
  const [recordpaymentpopup, setRecordpaymentpopup] = useState(false);
  const [approved, setApproved] = useState(false);
  const [employeeSalary, SetEmployeeSalary] = useState([]);
  const [allData, SetAllData] = useState<PayrunData | null>(null);
  const [popupData, setPupupData] = useState<PopupData>({});
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      console.log("values", values);
      action.resetForm();
    },
  });
  useEffect(() => {
    const searchData = props.data;

    if (searchData) {
      try {
        SetAllData(searchData);
        SetEmployeeSalary(searchData?.emp_salary);
        console.log(searchData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);
  function payslippopup(indexno: number) {
    setOpenPopup(true);
    setPupupData(employeeSalary[indexno]);
  }
  async function editStatus(status: string) {
    const statusValues = {
      status: status,
      month: allData?.month,
      payment_mood: status == "PAID" ? values.payment_method : "",
      payment_date: status == "PAID" ? values.paid_date : "",
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/salarydetails/generatepayreport/changestate`,
        statusValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Created Employee Basic Successfully");
        handleClose();
        message.success("Successfully Done");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "e_name" },
      { Header: "Total Days", accessor: "paid_days" },
      { Header: "NET PAY", accessor: "net_pay" },
      { Header: "PAYSLIP", accessor: "payslip" },
      // { Header: "TDS SHEET", accessor: "tds_sheet" },
      { Header: "LOP", accessor: "lop" },
      { Header: "PAYMENT STATUS", accessor: "payment_status" },
      // { Header: "ACTION", accessor: "action" },
    ],
    rows: employeeSalary?.map((data, index) => ({
      e_name: data.name,
      paid_days: data.num_of_days,
      net_pay: data.net_pay,
      payslip: <MDButton onClick={() => payslippopup(index)}>View</MDButton>,
      lop: data.lop,
      payment_status: allData.status,
      // action: <EditIcon />,
    })),
  };
  const handleClose = () => {
    setOpenPopup(false);
    setRecordpaymentpopup(false);
    setApproved(false);
    props.onSuccess();
  };
  const handleClickOpen = (stats: any) => {
    if (stats == "APPROVED") {
      setApproved(true);
    } else if (stats == "RECORD") {
      setRecordpaymentpopup(true);
    }
  };
  return (
    <>
      <Dialog open={recordpaymentpopup} onClose={handleClose}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} p={2}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "payment_method", value } });
                }}
                options={["Check", "Bank Transfer", "Inhand"]}
                // onChange={(e: any) => setearning_type_name(e.target.value)}
                renderInput={(params) => (
                  <FormField
                    required
                    name="earning_type_name"
                    onChange={handleChange}
                    value={values.payment_method}
                    label="Earning Type "
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <FormField
                type="date"
                label="paid date"
                name="paid_date"
                variant="standard"
                value={values.paid_date}
                onChange={handleChange}
                onBlur={handleBlur}
              /> */}

              <FormField
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Paid Date"
                name="paid_date"
                required
                value={values.paid_date}
                placeholder="Enter Your Date of Birth"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
              <MDButton
                color="info"
                onClick={() => editStatus("PAID")}
                // onClick={handleClickOpen}
              >
                RECORD
              </MDButton>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
      <Dialog open={approved} onClose={handleClose}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} p={2}>
              Are You Sure To Approved
            </Grid>
            <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
              <MDButton color="info" onClick={handleClose}>
                cancel
              </MDButton>
              <MDButton color="info" onClick={() => editStatus("APPROVED")}>
                APPROVE
              </MDButton>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
      <Dialog open={openPopup}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h6" pl={2}>
                PAYSLIP
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenPopup(false)}
              >
                <Icon fontSize="small">close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <MDBox>
            <Grid container spacing={1} p={2}>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{popupData?.name}</MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography variant="button">Net Pay</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2"></MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography variant="h6">{popupData?.net_pay}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h6" color="success" bgcolor="success">
                  {popupData?.status}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2">Payable Days</MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography variant="body2">
                  {popupData.num_of_days}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="body2">LOP</MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography variant="body2">{popupData.lop}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography
                  variant="button"
                  fontWeight="bold"
                  color="success"
                >
                  EARNINGS
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography variant="button" fontWeight="bold">
                  AMOUNT{" "}
                </MDTypography>
              </Grid>
              {/* employeeSalary?.map((data, index) => ({
      e_name: data.name,
      // paid_days: "24",
      net_pay: data.net_pay,
      payslip: <MDButton onClick={() => payslippopup(index)}>View</MDButton>,
      tds_sheet: "View",
      payment_status: allData.status,
      action: <EditIcon />,
    })), */}
              {popupData.earnings?.map((earningData: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={9}>
                    <MDTypography variant="button">
                      {earningData.earnings_name}
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <MDTypography variant="button">
                      {earningData.monthly_amount}
                    </MDTypography>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12} sm={9}>
                <MDTypography
                  variant="button"
                  color="warning"
                  fontWeight="bold"
                >
                  DEDUCTIONS
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography variant="button" fontWeight="bold">
                  AMOUNT
                </MDTypography>
              </Grid>
              {popupData.pre_tax?.map((earningData: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={9}>
                    <MDTypography variant="button">
                      {earningData.earnings_name}
                    </MDTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <MDTypography variant="button">
                      {earningData.monthly_amount}
                    </MDTypography>
                  </Grid>
                </React.Fragment>
              ))}
              {/* <Grid item xs={12} sm={12}>
                <MDTypography variant="button">TAXES</MDTypography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="button">Income Tax</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDTypography variant="button">₹0.00</MDTypography>
              </Grid> */}
              <Grid item xs={12} sm={9}>
                <MDTypography variant="subtitle2" fontWeight="bold">
                  NET PAY
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
                <MDTypography
                  variant="subtitle2"
                  fontWeight="bold"
                ></MDTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDButton color="info" onClick={() => setOpenPopup(true)}>
                  Download Payslip
                </MDButton>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                justifyContent="flex-end"
              >
                <MDButton
                  color="secondary"
                  variant="outlined"
                  onClick={() => setOpenPopup(false)}
                >
                  Send Payslip
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <MDBox p={3}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h4">
                  Process Pay Run for {allData?.month}
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                display="flex"
                justifyContent="flex-end"
              >
                <MDButton
                  color="info"
                  // onClick={() => editStatus(allData?.status === "READY" ? "PAID" : "PAID")}
                  onClick={() =>
                    handleClickOpen(
                      allData?.status === "READY"
                        ? "APPROVED"
                        : allData?.status === "APPROVED"
                        ? "RECORD"
                        : null
                    )
                  }
                >
                  {allData?.status === "READY"
                    ? "APPROVE"
                    : allData?.status === "APPROVED"
                    ? "RECORD"
                    : null}
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox px={3}>
            <DataTable
              table={dataTableData}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
            />
          </MDBox>
        </Card>
      </form>
    </>
  );
}

export default PayrunRecoed;
