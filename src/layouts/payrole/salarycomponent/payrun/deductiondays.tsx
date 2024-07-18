import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";
import MDButton from "components/MDButton";
import axios from "axios";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DataTable from "examples/Tables/DataTable";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "components/MDTypography";
import { message } from "antd";
import Cookies from "js-cookie";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
const token = Cookies.get("token");
const initialValues = {
  month: "",
  attendance: "Take Data Into Attendace",
};
export default function DeductionDays() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/mg_employee_payable/filter`,
        {
          date: values.month,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values: any, action: { resetForm: () => void }) => {
        const submit_value = data
          .filter((item) => item.leavedays != 0)
          .map((item) => ({
            employee_email: item.emp_email,
            deducted_days: item.deducted_days,
            month: values.month,
          }));
        console.log(submit_value, "submit value");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/mg_employee_payable/manually `,
            submit_value,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            message.success("Successfully Done");
            action.resetForm();
            setData([]);
          })
          .catch((error) => {
            const submit_value = data
              .filter((item) => item.leavedays != 0)
              .map((item) => ({
                month: values.month,
                emp_email: item.emp_email,
                deducted_days: item.deducted_days,
                total_working_days: 0,
                present_days: 0,
                absent_days: 0,
                paid_leave_days: 0,
                unpaid_leave_days: 0,
              }));
            axios
              .put(
                `${process.env.REACT_APP_BACKEND_URL}/mg_employee_payable`,
                submit_value,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                message.success("Successfully Done");
                action.resetForm();
                setData([]);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          });
      },
    });
  useEffect(() => {
    if (values.month != "" && values.attendance == "Manually Enter") {
      fetchData();
    } else {
      setData([]);
    }
  }, [values.month, values.attendance]);
  const handleInputChange = (e: any, index: any) => {
    const { value } = e.target;
    const updatedRows = [...data];
    updatedRows[index].deducted_days = value;
    setData(updatedRows);
  };
  const takeDataIntoAttendance = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/mg_employee_payable`,
        { month: values.month },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success(response.data.message);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
        console.log(error, "posterror");
      });
  };
  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "emp_name" },
      { Header: "EMAIL ADDRESS", accessor: "email_id" },
      { Header: "DEPARTMENT", accessor: "department" },
      { Header: "Absent Days", accessor: "absent_days" },
    ],

    rows: data.map((row, index) => ({
      emp_name: <MDTypography variant="p">{row.employee_name}</MDTypography>,
      email_id: <MDTypography variant="p">{row.emp_email}</MDTypography>,
      department: <MDTypography variant="p">{row.department}</MDTypography>,
      absent_days: (
        <MDInput
          variant="outlined"
          size="small"
          name={`deducted_days[${index}]`}
          onChange={(e: any) => handleInputChange(e, index)}
          value={row.deducted_days}
          type="number"
          sx={{ width: "90px" }}
        />
      ),
    })),
  };
  const currentDate = new Date();

  // Calculate the last past month
  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1
  );
  const maxDate = `${lastMonth.getFullYear()}-${(lastMonth.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container spacing={3} p={2}>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    required
                    type="month"
                    InputLabelProps={{ shrink: true }}
                    label="Select Month"
                    sx={{ width: "100%" }}
                    name="month"
                    value={values.month}
                    variant="standard"
                    onChange={handleChange}
                    inputProps={{
                      max: maxDate,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      onChange={handleChange}
                      name="attendance"
                      value={values.attendance}
                    >
                      <FormControlLabel
                        value="Manually Enter"
                        control={<Radio />}
                        label="Manually Enter"
                      />
                      <FormControlLabel
                        value="Take Data Into Attendace"
                        control={<Radio />}
                        label="Take Data Into Attendace"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {values.attendance === "Take Data Into Attendace" && (
                    <MDButton
                      color="info"
                      variant="contained"
                      onClick={takeDataIntoAttendance}
                    >
                      Save
                    </MDButton>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {data.length > 0 && (
            <Grid item container xs={12} sm={12}>
              <Grid item xs={12} sm={12}>
                <Card>
                  <Grid item xs={12} sm={12}>
                    <DataTable table={dataTableData} canSearch />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                    pb={2}
                    pr={10}
                  >
                    <MDButton color="info" variant="contained" type="submit">
                      Save
                    </MDButton>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </DashboardLayout>
  );
}
