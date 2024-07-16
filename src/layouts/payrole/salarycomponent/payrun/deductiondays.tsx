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

import MDTypography from "components/MDTypography";
import { message } from "antd";
import Cookies from "js-cookie";
import { Checkbox, FormControlLabel } from "@mui/material";
const token = Cookies.get("token");
const initialValues = {
  month: "",
  attendance: false,
};
export default function DeductionDays() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee      `, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const setdata = response.data.map((item: any) => ({
          ...item,
          leavedays: 0,
        }));
        setData(setdata);
        console.log(setdata, "response data");
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
            employee_email: item.email,
            deducted_days: item.leavedays,
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
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/mg_employee_payable`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [values.month]);
  useEffect(() => {
    if (values.month == "") {
    } else {
      fetchData();
    }
  }, [values.month]);
  const handleInputChange = (e: any, index: any) => {
    const { value } = e.target;
    const updatedRows = [...data];
    updatedRows[index].leavedays = value;
    setData(updatedRows);
  };
  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "emp_name" },
      { Header: "EMAIL ADDRESS", accessor: "email_id" },
      { Header: "DEPARTMENT", accessor: "department" },
      { Header: "Absent Days", accessor: "absent_days" },
    ],

    rows: data.map((row, index) => ({
      emp_name: `${row.first_name} ${row.last_name}`,
      email_id: <MDTypography variant="p">{row.email}</MDTypography>,
      department: <MDTypography variant="p">{row.department}</MDTypography>,
      absent_days: (
        <MDInput
          variant="outlined"
          size="small"
          name={`leavedays[${index}]`}
          onChange={(e: any) => handleInputChange(e, index)}
          value={row.leavedays}
          type="number"
          sx={{ width: "90px" }}
        />
      ),
    })),
  };
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
                  />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="attendance"
                        value="true"
                      />
                    }
                    label="Take Data Into Attendace"
                  />
                </Grid> */}
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
