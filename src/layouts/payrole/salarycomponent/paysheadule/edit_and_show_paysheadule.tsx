import React, { useState, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Card,
  Grid,
  Dialog,
  IconButton,
} from "@mui/material";
import MDInput from "components/MDInput";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { Field, useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
import Financialyear from "./financialyear";
function EditAndShowPaysheadule(props: any) {
  const ExistingData = props?.data[0];
  interface NextPayRun {
    month: string[];
    date: string[]; // Adjust the type as per the actual data structure
    // Other properties if present
  }
  interface sheaduledatainter {
    select_work_week: string[];
    calculate_salary_based_on: string;
    pay_your_employee_on: string;
    start_first_payroll: string;
    salary_month_willbe_paidon: string;
  }
  const [openPopup, setOpenPopup] = useState(false);
  const [nextpayrun, setNextpayrun] = useState<NextPayRun>({
    month: [],
    date: [],
  });
  const [sheaduledata, setSheaduledata] = useState<sheaduledatainter>({
    select_work_week: ExistingData.select_work_week,
    calculate_salary_based_on: ExistingData.calculate_salary_based_on,
    pay_your_employee_on: ExistingData.pay_your_employee_on,
    start_first_payroll: ExistingData.start_first_payroll,
    salary_month_willbe_paidon: ExistingData.salary_month_willbe_paidon,
  });
  const initialValues = {
    select_work_week: sheaduledata.select_work_week,
    calculate_salary_based_on: sheaduledata.calculate_salary_based_on,
    pay_your_employee_on: sheaduledata.pay_your_employee_on,
    start_first_payroll: sheaduledata.start_first_payroll,
    salary_month_willbe_paidon: sheaduledata.salary_month_willbe_paidon,
    which_day: 1,
    payemployeeon: "",
  };
  const dataTableData = {
    columns: [
      { Header: "Pay Period", accessor: "pay_period", width: "70%" },
      { Header: "Pay Date", accessor: "pay_date", width: "30%" },
    ],
    rows: nextpayrun.month.map((month: string, index) => ({
      pay_period: month,
      pay_date: nextpayrun.date[index],
    })),
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/mg_payschedule/nextpayrun`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setNextpayrun(response.data);
        }
      } catch (error) {
        // console.error(error);
        console.log("location not found");
      }
    };
    fetchData();
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values.which_day, "valuesinsideonsubmit");
        const submitVAlue = {
          select_work_week: values.select_work_week,
          calculate_salary_based_on: values.calculate_salary_based_on,
          pay_your_employee_on:
            values.payemployeeon == "days"
              ? "Day" + " " + values.which_day + " of every month"
              : values.pay_your_employee_on,
          start_first_payroll: nextpayrun.month[0],
          salary_month_willbe_paidon: values.salary_month_willbe_paidon,
        };
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/mg_payschedule`,
            submitVAlue,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            console.log("Updated Successfully");
            // window.location.reload();
            // action.resetForm();
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      },
    });

  function formatDate(inputDate: any) {
    var dateObject = new Date(inputDate);
    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1;
    if (day < 20) {
      month += 1;
    }
    var year = dateObject.getFullYear();
    var month1 = dateObject.getMonth() + 1;
    var month2 = dateObject.getMonth() + 2;
    if (day < 20) {
      var formattedDate = [day + "-" + month + "-" + year];
    }
    if (day >= 20) {
      var formattedDate = [
        day + "-" + month1 + "-" + year,
        day + "-" + month2 + "-" + year,
      ];
    }

    return formattedDate;
  }
  let salary_selected_month: any[] = [];
  if (values.start_first_payroll != "") {
    const inputDate = values.which_day + "-" + nextpayrun.month[0];
    salary_selected_month = formatDate(inputDate);
  }
  console.log(values, "valuessssss");
  return (
    <>
      <Dialog open={openPopup}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
            <Grid container spacing={3} pb={1} px={2}>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h5" pl={2}>
                  Change Pay Day
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                display="flex"
                justifyContent="flex-end"
              >
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
            <hr />
            <Grid container p={2}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h6">Pay your employees on*</MDTypography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="payemployeeon"
                  value={values.payemployeeon} // Set the value from Formik state
                  onChange={handleChange} // Ensure the onChange updates Formik state
                >
                  <FormControlLabel
                    value="The Last Working Day Of Every Month"
                    control={<Radio />}
                    label={
                      <MDTypography variant="body2">
                        The Last Working Day Of Every Month
                      </MDTypography>
                    }
                  />
                  <FormControlLabel
                    value="days"
                    control={<Radio />}
                    label={
                      <Grid container spacing={2} p={2}>
                        <MDTypography variant="body2">day</MDTypography>
                        <MDInput
                          disabled={
                            values.payemployeeon ===
                            "The Last Working Day Of Every Month"
                          }
                          name="which_day"
                          type="number"
                          value={values.which_day}
                          onChange={handleChange}
                          size="small"
                          sx={{ width: "15%" }}
                        />
                        <MDTypography variant="body2">
                          of every month
                        </MDTypography>
                      </Grid>
                    }
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h6">
                  {`Salary for the month of ${nextpayrun.month[0]} will be paid on*`}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({
                      target: { name: "salary_month_willbe_paidon", value },
                    });
                  }}
                  options={salary_selected_month}
                  renderInput={(params) => (
                    <MDInput
                      name="salary_month_willbe_paidon"
                      onChange={handleChange}
                      value={values.salary_month_willbe_paidon}
                      // label="Earning Type "
                      {...params}
                      size="small"
                      // variant="standard"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <hr />
            <Grid container spacing={3} py={1}>
              <Grid
                item
                xs={12}
                sm={12}
                display="flex"
                justifyContent="flex-end"
              >
                <Grid
                  container
                  spacing={3}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => setOpenPopup(false)}
                    >
                      {"cancel"}
                    </MDButton>
                  </Grid>
                  <Grid item px={2}>
                    <MDButton variant="gradient" color="info" type="submit">
                      {"  Save  "}
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} display="flex" justifyContent="center">
          <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
            <Grid container spacing={1} p={2}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h3">Pay Schedule</MDTypography>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} pb={2}>
                <MDTypography variant="h5">
                  This Organisation&apos;s payroll runs on this schedule.
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDTypography variant="subtitle2">Pay Frequency</MDTypography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="inherit">
                  {sheaduledata.calculate_salary_based_on}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDTypography variant="subtitle2">Working Days</MDTypography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="inherit">
                  {sheaduledata.select_work_week?.join(", ")}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDTypography variant="subtitle2">Pay Day</MDTypography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="inherit">
                  {sheaduledata.pay_your_employee_on}
                  <MDButton onClick={() => setOpenPopup(true)}>
                    {"(Change)"}
                  </MDButton>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDTypography variant="subtitle2">
                  First Pay Period
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="inherit">
                  {sheaduledata.start_first_payroll}
                </MDTypography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} display="flex" justifyContent="center">
          <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
            <DataTable
              showTotalEntries={false}
              isSorted={false}
              entriesPerPage={false}
              table={dataTableData}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default EditAndShowPaysheadule;
