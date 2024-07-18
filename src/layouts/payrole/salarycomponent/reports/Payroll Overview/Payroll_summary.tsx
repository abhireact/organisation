import { Card, Grid, Icon } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MDInput from "components/MDInput";
import { useFormik } from "formik";
import { message } from "antd";
import MDButton from "components/MDButton";
const token = Cookies.get("token");
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object().shape({
  year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});
function Payroll_summary(): JSX.Element {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        department: [],
        designation: [],
        location: [],
        from_date: "",
        to_date: "",
        year: "",
      },
      validationSchema,
      enableReinitialize: true,
      onSubmit: async () => {
        console.log(values, "some info ");
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/report/pay_summary`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            // message.success(response.data.message);
            console.log(response.data);
            setData(response.data);
            setShowReport(true);
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      },
    });

  const WorkLocation = useSelector(
    (state: any) => state.dummyData.workLocationData
  );
  // console.log("WorkLocation", WorkLocation);

  const location_name = [];

  if (WorkLocation && WorkLocation.length > 0) {
    const uniqueLocationNames = new Set();

    for (let i = 0; i < WorkLocation.length; i++) {
      const locationName = WorkLocation[i]["location_name"];
      uniqueLocationNames.add(locationName);
    }

    // Convert the Set to an array if needed
    location_name.push(...uniqueLocationNames);
  }

  // console.log(location_name, "location");

  const Department = useSelector(
    (state: any) => state.dummyData.departmentData
  );
  // console.log("Department", Department);
  const dept_name = [];

  if (Department && Department.length > 0) {
    const uniqueDepartmentNames = new Set();

    for (let i = 0; i < Department.length; i++) {
      const departmentName = Department[i]["dept_name"];
      uniqueDepartmentNames.add(departmentName);
    }

    // Convert the Set to an array if needed
    dept_name.push(...uniqueDepartmentNames);
  }

  // console.log(dept_name, "departmentName");
  const Designation = useSelector(
    (state: any) => state.dummyData.designationData
  );
  // console.log("Designation", Designation);
  const des_name = [];

  if (Designation && Designation.length > 0) {
    const uniqueDesignationNames = new Set();

    for (let i = 0; i < Designation.length; i++) {
      const DesignationName = Designation[i]["des_name"];
      uniqueDesignationNames.add(DesignationName);
    }

    // Convert the Set to an array if needed
    des_name.push(...uniqueDesignationNames);
  }

  // console.log(des_name, "DesignationName");
  const [showReport, setShowReport] = useState(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      {showReport ? (
        <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
          <Grid item xs={12} sm={4} sx={{ textAlign: "right" }} mx={4} mt={2}>
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
              MindCom
            </MDTypography>
            <MDTypography variant="h6" sx={{ textAlign: "center" }}>
              Payroll Summary
            </MDTypography>
            <MDTypography variant="h6" sx={{ textAlign: "center" }}>
              {values.year.split("-")[0]} to {values.year.split("-")[1]}
            </MDTypography>

            <Divider />
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">PAY COMPONENTS</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">AMOUNT(₹)</MDTypography>
              </Grid>
            </Grid>
            <Divider />

            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Earnings</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  ₹{data?.earnings["Total Gross Pay"]}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Statutories</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No statutories were included during this period
              </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  ₹{data?.statutories["Total statutory"]}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Donations</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No deductions were applied in this period
              </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  {" "}
                  ₹{data?.donations["Total donations"] || 0}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Deductions</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No deductions were applied in this period
              </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  ₹{data?.deductions["Total deductions"] || 0}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Taxes</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display </MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  ₹{data?.taxes["Total taxes"]}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />

            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Reimbursements</MDTypography>
              </Grid>
              {/* <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display</MDTypography>
            </Grid> */}
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  ₹{data?.reimbursements["Total reimbursement"]}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />

            <Grid container>
              <Grid item xs={12} sm={8}>
                <MDTypography variant="h6">Net Pay</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                <MDTypography variant="button">
                  ₹
                  {data?.reimbursements["Total reimbursement"] +
                    data?.taxes["Total taxes"] +
                    data?.deductions["Total deductions"] +
                    data?.donations["Total donations"] +
                    data?.statutories["Total statutory"] +
                    data?.earnings["Total Gross Pay"]}
                </MDTypography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              sm={3}
              py={2}
              display="flex"
              justifyContent="flex-end"
            >
              <MDButton
                variant="gradient"
                color="dark"
                onClick={() => setShowReport(false)}
              >
                {"back"}
              </MDButton>
            </Grid>
          </MDBox>
        </Card>
      ) : (
        <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
          <Grid item xs={12} sm={4} sx={{ textAlign: "right" }} mx={4} mt={2}>
            <Icon
              onClick={() => {
                navigate(-1);
              }}
            >
              close
            </Icon>
          </Grid>
          <form onSubmit={handleSubmit}>
            <MDBox p={4} pt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h5" sx={{ textAlign: "center" }}>
                    Payroll Summary
                  </MDTypography>
                </Grid>

                {/* <Grid item xs={12} sm={6}>
                <MDInput
                  label={"From Date"}
                  InputLabelProps={{ shrink: true }}
                  type="month"
                  // required
                  name="from_date"
                  sx={{ width: "70%" }}
                  onChange={handleChange}
                  value={values.from_date}
                  onBlur={handleBlur}
                  error={errors.from_date && touched.from_date}
                  success={!errors.from_date}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={"To Date"}
                  InputLabelProps={{ shrink: true }}
                  type="month"
                  // required
                  name="to_date"
                  sx={{ width: "70%" }}
                  onChange={handleChange}
                  value={values.to_date}
                  onBlur={handleBlur}
                  error={errors.to_date && touched.to_date}
                  success={!errors.to_date}
                  variant="standard"
                />
              </Grid> */}
                <Grid item xs={12} sm={6}>
                  <MDInput
                    label={"Year"}
                    // InputLabelProps={{ shrink: true }}
                    type="year"
                    required
                    name="year"
                    placeholder="eg. 2021-2022"
                    sx={{ width: "70%" }}
                    onChange={handleChange}
                    value={values.year}
                    onBlur={handleBlur}
                    error={errors.year && touched.year}
                    success={!errors.year}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "department", value },
                      });
                    }}
                    options={dept_name}
                    renderInput={(params) => (
                      <MDInput
                        label={"Department"}
                        sx={{ width: "70%" }}
                        InputLabelProps={{ shrink: true }}
                        name="department"
                        onChange={handleChange}
                        value={values.department}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                  {errors.department && touched.department ? (
                    // <p className="form-error">{errors.name}</p>
                    <MDTypography
                      variant="caption"
                      fontWeight="regular"
                      color="error"
                    >
                      {errors.department}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "designation", value },
                      });
                    }}
                    options={des_name}
                    renderInput={(params) => (
                      <MDInput
                        label={"Designation"}
                        sx={{ width: "70%" }}
                        InputLabelProps={{ shrink: true }}
                        name="designation"
                        onChange={handleChange}
                        value={values.designation}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                  {errors.designation && touched.designation ? (
                    // <p className="form-error">{errors.name}</p>
                    <MDTypography
                      variant="caption"
                      fontWeight="regular"
                      color="error"
                    >
                      {errors.designation}
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    sx={{ width: "70%" }}
                    multiple
                    disableClearable
                    onChange={(event: any, value: any) => {
                      handleChange({ target: { name: "location", value } });
                    }}
                    value={values.location}
                    // onChange={handleMainFieldChange}
                    options={location_name}
                    renderInput={(params: any) => (
                      <MDInput
                        label={"Location"}
                        InputLabelProps={{ shrink: true }}
                        name="location"
                        placeholder="Enter Your location"
                        //onChange={handleChange}
                        value={values.location}
                        {...params}
                        onBlur={handleBlur}
                        error={errors.location && touched.location}
                        variant="standard"
                      />
                    )}
                  />
                  {errors.designation && touched.designation ? (
                    // <p className="form-error">{errors.name}</p>
                    <MDTypography
                      variant="caption"
                      fontWeight="regular"
                      color="error"
                    >
                      {errors.designation}
                    </MDTypography>
                  ) : null}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                py={2}
                display="flex"
                justifyContent="flex-end"
              >
                <MDButton variant="gradient" color="info" type="submit">
                  {"Show"}
                </MDButton>
              </Grid>
            </MDBox>
          </form>
        </Card>
      )}
    </DashboardLayout>
  );
}
export default Payroll_summary;
