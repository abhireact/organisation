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
function EditAndShowPaysheadule() {
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
  const [nextpayrun, setNextpayrun] = useState<NextPayRun>({ month: [], date: [] });
  const [sheaduledata, setSheaduledata] = useState<sheaduledatainter>({
    select_work_week: [],
    calculate_salary_based_on: "",
    pay_your_employee_on: "",
    start_first_payroll: "",
    salary_month_willbe_paidon: "",
  });
  const initialValues = {
    select_work_week: sheaduledata.select_work_week,
    calculate_salary_based_on: sheaduledata.calculate_salary_based_on,
    pay_your_employee_on: sheaduledata.pay_your_employee_on,
    start_first_payroll: sheaduledata.start_first_payroll,
    salary_month_willbe_paidon: sheaduledata.salary_month_willbe_paidon,
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mg_payschedule`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.status === 200) {
  //         console.log(response.data, "all earning data");
  //         setSheaduledata(response.data[0]);
  //         // setPageStatus("edit");
  //       }
  //     } catch (error) {
  //       // console.error(error);
  //       console.log("location not found");
  //     }
  //   };
  //   fetchData();
  // }, []);
  console.log(nextpayrun, "nextpayrunsssssssssssssssssssssssssss");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/mg_payschedule`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Updated Successfully");
          history.go(0);
          action.resetForm();
        }
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
  });

  console.log(Financialyear, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={openPopup}>
        <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
          <Grid container spacing={3} pb={1} px={2}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h5" pl={2}>
                Change Pay Day
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
          <hr />
          <Grid container p={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Pay your employees on*</MDTypography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="The last working day of every month"
                name="payemployeeon"
              >
                <FormControlLabel
                  value="The last working day of every month"
                  control={
                    <Radio
                      // checked={values.payemployeeon.includes("The last working day of every month")}
                      // onChange={handleChange}
                      name="payemployeeon"
                      value="The last working day of every month"
                    />
                  }
                  label={
                    <MDTypography variant="body2">The last working day of every month</MDTypography>
                  }
                />
                <FormControlLabel
                  //   value="female"
                  control={
                    <Radio
                      // checked={values.payemployeeon.includes("days")}
                      // onChange={handleChange}
                      name="payemployeeon"
                      value="days"
                    />
                  }
                  label={
                    <>
                      <Grid container spacing={2} p={2}>
                        <MDTypography variant="body2">day</MDTypography>
                        <MDInput
                          px={2}
                          // disabled
                          name="whichday"
                          type="number"
                          // value={values.whichday}
                          // onChange={handleChange}
                          size="small"
                          sx={{ width: "15%" }}
                        />
                        <MDTypography variant="body2">of every month</MDTypography>
                      </Grid>
                    </>
                  }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">
                Salary for the month of November-2023 will be paid on*
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                // onChange={(_event, value) => {
                //   handleChange({ target: { name: "earning_type_name", value } });
                // }}
                options={["24/11/2023", "25/12/2023"]}
                //   onChange={(e: any) => setearning_type_name(e.target.value)}
                renderInput={(params) => (
                  <MDInput
                    name="earning_type_name"
                    // onChange={handleChange}
                    // value={values.earning_type_name}
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
            <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
              <Grid container spacing={3} display="flex" justifyContent="flex-end">
                <Grid item>
                  <MDButton variant="outlined" color="secondary">
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
      </Dialog>
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
            <MDTypography variant="inherit">{sheaduledata.calculate_salary_based_on}</MDTypography>
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
              <MDButton onClick={() => setOpenPopup(true)}>{"(Change)"}</MDButton>
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="subtitle2">First Pay Period</MDTypography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDTypography variant="inherit">{sheaduledata.start_first_payroll}</MDTypography>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ width: "80%", margin: "auto", mt: "2%" }}>
        <DataTable table={dataTableData} />
      </Card>
    </form>
  );
}

export default EditAndShowPaysheadule;
