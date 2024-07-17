import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
const token = Cookies.get("token");
function Payroll_summary(): JSX.Element {
  const [earnings, setEarnings] = useState([]);

  const value = 90;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        department: "",
        designation: "",
        location: "",
        from_date: "",
        to_date: "",
      },

      enableReinitialize: true,
      onSubmit: async (values: any) => {},
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={4}>
          {" "}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.department}
                disableClearable
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "department", value } });
                }}
                // value={department}
                // onChange={handleMainFieldChange}
                options={dept_name}
                renderInput={(params: any) => (
                  <FormField
                    label={"Department"}
                    // InputLabelProps={{ shrink: true }}
                    required
                    name="department"
                    placeholder="Enter Your department"
                    //onChange={handleChange}
                    value={values.department}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.department && touched.department}
                    success={!errors.department}
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
            <Grid item xs={12} sm={12}>
              <Autocomplete
                sx={{ width: "70%" }}
                // multiple
                disableClearable
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "designation", value } });
                }}
                value={values.designation}
                // onChange={handleMainFieldChange}
                options={des_name}
                renderInput={(params: any) => (
                  <FormField
                    required
                    label={"Designation"}
                    InputLabelProps={{ shrink: true }}
                    name="designation"
                    placeholder="Enter Your designation"
                    //onChange={handleChange}
                    value={values.designation}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.designation && touched.designation}
                    success={!errors.designation}
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
            <Grid item xs={12} sm={12}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.location}
                disableClearable
                onChange={(event: any, value: any) => {
                  handleChange({ target: { name: "location", value } });
                }}
                options={location_name}
                renderInput={(params: any) => (
                  <FormField
                    required
                    label={"Location"}
                    InputLabelProps={{ shrink: true }}
                    name="location"
                    placeholder="Enter Your location"
                    //onChange={handleChange}
                    value={values.location}
                    {...params}
                    onBlur={handleBlur}
                    error={errors.location && touched.location}
                    success={!errors.location}
                    variant="standard"
                  />
                )}
              />

              {errors.location && touched.location ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography
                  variant="caption"
                  fontWeight="regular"
                  color="error"
                >
                  {errors.location}
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
        </MDBox>
      </Card>
      <Card sx={{ width: "80%", margin: "auto", mt: "4%" }}>
        <MDBox p={5}>
          <MDTypography variant="h5" sx={{ textAlign: "center" }}>
            MindCom
          </MDTypography>
          <MDTypography variant="h6" sx={{ textAlign: "center" }}>
            Payroll Summary
          </MDTypography>
          <MDTypography variant="h6" sx={{ textAlign: "center" }}>
            01/04/2023 to 31/03/2024
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
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Earnings</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                {earnings[0]?.earning_name}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">{value}</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Statutories</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No statutories were included during this period
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Deductions</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">
                No deductions were applied in this period
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Taxes</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6">Reimbursements</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="button">No data to display</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="h6">Net Pay</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="button">₹0.00</MDTypography>
            </Grid>
          </Grid>
          <Divider />
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default Payroll_summary;
