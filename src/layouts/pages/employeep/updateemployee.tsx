import MDBox from "components/MDBox";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { organisationSchema } from "./schema";
import axios from "axios";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";
import Autocomplete from "@mui/material/Autocomplete";
import MDButton from "components/MDButton";
import Cookies from "js-cookie";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import { useLocation } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import MDInput from "components/MDInput";
import { useDispatch, useSelector } from "react-redux";
import { storeEmployeeData, storeRoleseData } from "Redux/action/dummyDataActions";
import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
// const initialValues = {
//   department: "",
//   annual_ctc: 12000,
//   template_name: "A+",
//   percentofctc: 50,
//   percentofbasic: 50,
//   monthlybasicsalary: 0,
//   convinienceallownce: 0,
//   designation: "",
//   email: "",
//   first_name: "",
//   last_name: "",
//   nick_name: "",
//   location: "",
//   role: "",
//   manager: "",
//   gender: "",
//   employee_type: "",
//   source_of_hire: "",
//   joining_date: "",
//   dob: "",
//   about_me: "",
//   Expertise: "",
//   uan: "",
//   pan: "",
//   aadhaar: "",
//   ph_num: "",
//   person_ph_num: "",
//   personalemail_id: "",
//   seating_location: "",
//   Tags: "",
//   presentaddress: "",
//   permanentaddress: "",
//   company_name: "",
//   job_title: "",
//   from_date: "",
//   to_date: "",
//   job_description: "",
//   institute_name: "",
//   degree: "",
//   specialization: "",
//   date_of_completion: "",
//   name: "",
//   relationship: "",
//   ddob: "",
//   education_details: [] as object[],
//   dependent_details: [] as object[],
//   marital_status: [] as string[],
//   work_experience: [] as object[],
// };
interface Values {
  annual_ctc: number;
  percentofctc: number;
}
const location_name: any[] = [];
const EmployeeUpdation = () => {
  const dispatched = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [employee, setEmployee] = React.useState({});
  const [roles, setRoles] = React.useState([]);
  const [selectedlocation, setSelectedlocation] = React.useState({});
  const WorkLocation = useSelector((state: any) => state.dummyData.workLocationData);
  const location_name = [];
  const initialValues = {
    department: state?.department || "",
    annual_ctc: 12000,
    template_name: "A+",
    percentofctc: 50,
    percentofbasic: 50,
    monthlybasicsalary: 0,
    convinienceallownce: 0,
    designation: state?.designation || "",
    email: state?.email || "",
    first_name: state?.first_name || "",
    last_name: state?.last_name || "",
    nick_name: state?.nick_name || "",
    location: state?.location || "",
    role: state?.role || "",
    manager: state?.manager || "",
    gender: state?.gender || "",
    employee_type: state?.employee_type || "",
    source_of_hire: state?.source_of_hire || "",
    joining_date: state?.joining_date || "",
    dob: state?.dob || "",
    about_me: state?.about_me || "",
    Expertise: state?.Expertise || "",
    uan: state?.uan || "",
    pan: state?.department || "",
    aadhaar: state?.pan || "",
    ph_num: state?.department || "",
    person_ph_num: state?.department || "",
    personalemail_id: state?.department || "",
    seating_location: state?.department || "",
    Tags: state?.department || "",
    presentaddress: state?.department || "",
    permanentaddress: state?.department || "",
    company_name: state?.department || "",
    job_title: state?.department || "",
    from_date: state?.department || "",
    to_date: state?.department || "",
    job_description: state?.department || "",
    institute_name: state?.department || "",
    degree: state?.department || "",
    specialization: state?.department || "",
    date_of_completion: state?.department || "",
    name: state?.department || "",
    relationship: state?.department || "",
    ddob: state?.department || "",
    education_details: [] as object[],
    dependent_details: [] as object[],
    marital_status: "",
    work_experience: [] as object[],
  };
  if (WorkLocation && WorkLocation.length > 0) {
    const uniqueLocationNames = new Set();

    for (let i = 0; i < WorkLocation.length; i++) {
      const locationName = WorkLocation[i]["location_name"];
      uniqueLocationNames.add(locationName);
    }

    // Convert the Set to an array if needed
    location_name.push(...uniqueLocationNames);
  }

  const Department = useSelector((state: any) => state.dummyData.departmentData);
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

  console.log(dept_name, "departmentName");
  const Designation = useSelector((state: any) => state.dummyData.designationData);
  console.log("Designation", Designation);
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

  console.log(des_name, "DesignationName");
  // rolesstoration
  const role_display_name = [];

  if (roles && roles.length > 0) {
    const uniquerolesNames = new Set();

    for (let i = 0; i < roles.length; i++) {
      const rolesName = roles[i]["role_display_name"];
      console.log(rolesName, "rolesName");

      uniquerolesNames.add(rolesName);
    }

    // Convert the Set to an array if needed
    role_display_name.push(...uniquerolesNames);
  }

  console.log(role_display_name, "role_display_name");

  const EmployeeData = useSelector((state: any) => state.dummyData.employeeData);
  console.log("EmployeeDatagggggggg", EmployeeData);
  const emoployee_name = [];
  // const manager_name = [];
  const employees = [];
  if (EmployeeData && EmployeeData.length > 0) {
    const uniqueEmployeeDataNames = new Set();

    for (let i = 0; i < EmployeeData.length; i++) {
      const { first_name, last_name } = EmployeeData[i];
      // const employeeObject = { first_name, last_name, full_name: `${first_name} ${last_name}` };
      // manager_name.push(employeeObject);
      const fullName = last_name ? `${first_name} ${last_name}` : first_name;
      employees.push({ label: fullName, value: { first_name, last_name } });
      uniqueEmployeeDataNames.add(fullName);
    }

    // Convert the Set to an array if needed
    emoployee_name.push(...uniqueEmployeeDataNames);
  }
  console.log(emoployee_name, "EmployeeDataName");
  // manager_name.push(emoployee_name?.full_name);
  // console.log(manager_name, "manager_name");
  // Fetch Roles

  const fetchRoles = async (location_name: undefined) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/mg_roles/get_roles_by_location`,
        { location_name }, // Send the location as part of the request body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response, "response");

      const roles = await response.data;
      console.log(roles, typeof roles);
      setRoles(roles);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeRoleseData(roles));
  }, [dispatched, roles]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: organisationSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });
  const token = Cookies.get("token");

  const handleFormSubmit = async () => {
    try {
      console.log(values, "formdata");

      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/employee`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        console.log(" Updated Employee Successfully");
        message.success(" Updated Employee Successfully");
        // setIsSubmit(true);
        navigate("/pages/employee/showemployee");
        // setDataSubmitted(true);
        // console.log(dataSubmitted, isSubmit, "hj wdjkdx");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  // feching employee
  useEffect(() => {
    fetchEmployee(); // Fetch data from API on component mount
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const employee = await response.json();
      console.log(employee, typeof employee);
      setEmployee(employee);
    } catch (error) {
      console.log("Error fetching classdata:", error);
    }
  };
  React.useEffect(() => {
    dispatched(storeEmployeeData(employee));
  }, [dispatched, employee]);

  // calculating basicctcmothly%
  const ctcbasic =
    values.annual_ctc && values.percentofctc
      ? ((values.percentofctc / 100) * values.annual_ctc) / 12
      : 0;
  // calculating housingrentmothly%
  const housingrent = values.percentofbasic ? (values.percentofbasic / 100) * ctcbasic : 0;

  const fixedallownce =
    values.annual_ctc / 12 - (ctcbasic + housingrent + values.convinienceallownce);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h5">{"Update Employee Details"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info" type="submit" onClick={handleFormSubmit}>
                  {"Save"}
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Basic Details"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4} mt={-3}>
                <FormField
                  type="name"
                  label="First name"
                  name="first_name"
                  required
                  value={values.first_name}
                  placeholder="Enter Your First name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.first_name && touched.first_name}
                  success={values.first_name.length && !errors.first_name}
                />
                {errors.first_name && touched.first_name ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.first_name}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} mt={-3}>
                <FormField
                  type="name"
                  label="Last Name"
                  name="last_name"
                  required
                  value={values.last_name}
                  placeholder="Enter Your Last Name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.last_name && touched.last_name}
                  success={values.last_name.length && !errors.last_name}
                />
                {errors.last_name && touched.last_name ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.last_name}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} mt={-3}>
                <FormField
                  type="name"
                  label="Email"
                  name="email"
                  required
                  value={values.email}
                  placeholder="Enter Your  Email "
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  success={values.email.length && !errors.email}
                />
                {errors.email && touched.email ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.email}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Work Information"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  defaultValue={state?.department}
                  // multiple
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
                      onChange={handleChange}
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
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.department}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  defaultValue={state?.designation}
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "designation", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={des_name}
                  renderInput={(params: any) => (
                    <FormField
                      required
                      label={"Designation"}
                      InputLabelProps={{ shrink: true }}
                      name="designation"
                      placeholder="Enter Your designation"
                      onChange={handleChange}
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
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.designation}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "location", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={location_name}
                  //   options={["v", "gfr"]}
                  renderInput={(params: any) => (
                    <FormField
                      label={"Location"}
                      InputLabelProps={{ shrink: true }}
                      name="location"
                      placeholder="Enter Your location"
                      onChange={handleChange}
                      value={values.location}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.location && touched.location}
                      success={!errors.location}
                      variant="standard"
                    />
                  )}
                /> */}
                <Autocomplete
                  sx={{ width: "70%" }}
                  defaultValue={state?.location}
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "location", value } });
                    // Call fetchRoles function with the selected location value
                    fetchRoles(value);
                  }}
                  options={location_name}
                  renderInput={(params: any) => (
                    <FormField
                      required
                      label={"Location"}
                      InputLabelProps={{ shrink: true }}
                      name="location"
                      placeholder="Enter Your location"
                      onChange={handleChange}
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
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.location}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  defaultValue={state?.role}
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "role", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={role_display_name}
                  renderInput={(params: any) => (
                    <FormField
                      label={"Role"}
                      required
                      InputLabelProps={{ shrink: true }}
                      name="role"
                      placeholder="Enter Your role"
                      onChange={handleChange}
                      value={values.role}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.role && touched.role}
                      success={!errors.role}
                      variant="standard"
                    />
                  )}
                />
                {errors.role && touched.role ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.role}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  defaultValue={state?.employee_type}
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "employee_type", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={["Permanent", "Temporary"]}
                  renderInput={(params: any) => (
                    <FormField
                      required
                      label={"Employee Type"}
                      InputLabelProps={{ shrink: true }}
                      name="employee_type"
                      placeholder="Enter Your employee_type"
                      onChange={handleChange}
                      value={values.employee_type}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.employee_type && touched.employee_type}
                      success={!errors.employee_type}
                      variant="standard"
                    />
                  )}
                />
                {errors.employee_type && touched.employee_type ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.employee_type}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  defaultValue={state?.source_of_hire}
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "source_of_hire", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={["Direct", "Referral", "Web"]}
                  renderInput={(params: any) => (
                    <FormField
                      label={"Source Of Hire"}
                      InputLabelProps={{ shrink: true }}
                      name="source_of_hire"
                      placeholder="Enter Your source_of_hire"
                      onChange={handleChange}
                      value={values.source_of_hire}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.source_of_hire && touched.source_of_hire}
                      success={!errors.source_of_hire}
                      variant="standard"
                    />
                  )}
                />
                {errors.source_of_hire && touched.source_of_hire ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.source_of_hire}
                  </MDTypography>
                ) : null}
              </Grid>
              {/* <Grid item xs={12} sm={4} >
                                <Autocomplete
                                    sx={{ width: "70%" }}
                                    // multiple
                                    onChange={(event: any, value: any) => {
                                        handleChange({ target: { name: "joining_date", value } });
                                    }}
                                    // value={department}
                                    // onChange={handleMainFieldChange}
                                    options={["v", "gfr"]}
                                    renderInput={(params: any) => (
                                        <FormField
                                            label={""}
                                            InputLabelProps={{ shrink: true }}
                                            name="joining_date"
                                            placeholder="Enter Your joining_date"
                                            onChange={handleChange}
                                            value={values.joining_date}
                                            {...params}
                                            onBlur={handleBlur}
                                            error={errors.joining_date && touched.joining_date}
                                            success={!errors.joining_date}
                                            variant="standard"
                                        />
                                    )}
                                />
                                {errors.joining_date && touched.joining_date ? (
                                    // <p className="form-error">{errors.name}</p>
                                    <MDTypography variant="caption" fontWeight="regular" color="error">
                                        {errors.joining_date}
                                    </MDTypography>
                                ) : null}
                            </Grid> */}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Joining Date"
                  name="joining_date"
                  required
                  value={values.joining_date}
                  placeholder="Enter Your Joining Date"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.joining_date && touched.joining_date}
                  success={values.joining_date.length && !errors.joining_date}
                />
                {errors.joining_date && touched.joining_date ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.joining_date}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Hierarchy Information"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "manager", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={emoployee_name}
                  renderInput={(params: any) => (
                    <FormField
                      label={"Manager"}
                      InputLabelProps={{ shrink: true }}
                      name="manager"
                      placeholder="Enter Your manager"
                      onChange={handleChange}
                      value={values.manager}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.manager && touched.manager}
                      success={!errors.manager}
                      variant="standard"
                    />
                  )}
                />
                {errors.manager && touched.manager ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.manager}
                  </MDTypography>
                ) : null} */}
                <Autocomplete
                  sx={{ width: "70%" }}
                  options={employees}
                  defaultValue={state?.manager}
                  getOptionLabel={(option) => option.label} // Display employee's full name in the options
                  onChange={(event, value) => {
                    if (value) {
                      const managerObject = value.value; // Extract manager's name in object format
                      handleChange({ target: { name: "manager", value: managerObject } });
                    } else {
                      handleChange({ target: { name: "manager", value: null } });
                    }
                  }}
                  renderInput={(params) => (
                    <FormField
                      required
                      label={"Manager"}
                      InputLabelProps={{ shrink: true }}
                      name="manager"
                      placeholder="Enter Your manager"
                      onChange={handleChange}
                      value={values.manager}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.manager && touched.manager}
                      success={!errors.manager}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Personal Details"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Date of Birth"
                  name="dob"
                  required
                  value={values.dob}
                  placeholder="Enter Your Date of Birth"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.dob && touched.dob}
                  success={values.dob.length && !errors.dob}
                />
                {errors.dob && touched.dob ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.dob}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={9} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  defaultValue={state?.gender}
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "gender", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={["female", "male"]}
                  renderInput={(params: any) => (
                    <FormField
                      label={"Gender"}
                      InputLabelProps={{ shrink: true }}
                      name="gender"
                      placeholder="Enter Your gender"
                      onChange={handleChange}
                      value={values.gender}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.gender && touched.gender}
                      success={!errors.gender}
                      variant="standard"
                    />
                  )}
                />
                {errors.gender && touched.gender ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.gender}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="About Me "
                  name="about_me"
                  value={values.about_me}
                  placeholder="Enter Your About Me"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.about_me && touched.about_me}
                  success={values.about_me.length && !errors.about_me}
                />
                {errors.about_me && touched.about_me ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.about_me}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="Expertise"
                  name="Expertise"
                  value={values.Expertise}
                  placeholder="Enter Your Expertise"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.Expertise && touched.Expertise}
                  success={values.Expertise.length && !errors.Expertise}
                />
                {errors.Expertise && touched.Expertise ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.Expertise}
                  </MDTypography>
                ) : null}
              </Grid>
              {/* <Grid item xs={9} sm={5} container>
                <Grid item xs={12} sm={6}>
                  {" "}
                  <MDTypography> Marital Status:</MDTypography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {" "}
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Single" // Set default selected option here
                      row
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Single"
                        control={
                          <Radio
                            // defaultChecked (This line is not needed anymore)
                            checked={values.marital_status.includes("Single")}
                            onChange={handleChange}
                            name="marital_status"
                            value="Single"
                          />
                        }
                        label={
                          <>
                            <MDTypography variant="body2">Single</MDTypography>
                          </>
                        }
                      />
                      <FormControlLabel
                        value="Married"
                        control={
                          <Radio
                            checked={values.marital_status.includes("Married")}
                            onChange={handleChange}
                            name="marital_status"
                            value="Married"
                          />
                        }
                        label={<MDTypography variant="body2"> Married</MDTypography>}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Identity Information"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="uan"
                  name="uan"
                  value={values.uan}
                  placeholder="Enter Your uan"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.uan && touched.uan}
                  success={values.uan.length && !errors.uan}
                />
                {errors.uan && touched.uan ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.uan}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="pan"
                  name="pan"
                  value={values.pan}
                  placeholder="Enter Your pan"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.pan && touched.pan}
                  success={values.pan.length && !errors.pan}
                />
                {errors.pan && touched.pan ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.pan}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="aadhaar"
                  name="aadhaar"
                  value={values.aadhaar}
                  placeholder="Enter Your aadhaar"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.aadhaar && touched.aadhaar}
                  success={values.aadhaar.length && !errors.aadhaar}
                />
                {errors.aadhaar && touched.aadhaar ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.aadhaar}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Contact Details"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="Work phone no"
                  name="ph_num"
                  value={values.ph_num}
                  placeholder="Enter Your ph_num"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.ph_num && touched.ph_num}
                  success={values.ph_num.length && !errors.ph_num}
                />
                {errors.ph_num && touched.ph_num ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.ph_num}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="person_ph_num"
                  name="person_ph_num"
                  value={values.person_ph_num}
                  placeholder="Enter Your person_ph_num"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.person_ph_num && touched.person_ph_num}
                  success={values.person_ph_num.length && !errors.person_ph_num}
                />
                {errors.person_ph_num && touched.person_ph_num ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.person_ph_num}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="personalemail_id"
                  name="personalemail_id"
                  value={values.personalemail_id}
                  placeholder="Enter Your personalemail_id"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.personalemail_id && touched.personalemail_id}
                  success={values.personalemail_id.length && !errors.personalemail_id}
                />
                {errors.personalemail_id && touched.personalemail_id ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.personalemail_id}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="seating_location"
                  name="seating_location"
                  value={values.seating_location}
                  placeholder="Enter Your seating_location"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.seating_location && touched.seating_location}
                  success={values.seating_location.length && !errors.seating_location}
                />
                {errors.seating_location && touched.seating_location ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.seating_location}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="Tags"
                  name="Tags"
                  value={values.Tags}
                  placeholder="Enter Your Tags"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.Tags && touched.Tags}
                  success={values.Tags.length && !errors.Tags}
                />
                {errors.Tags && touched.Tags ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.Tags}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="presentaddress"
                  name="presentaddress"
                  value={values.presentaddress}
                  placeholder="Enter Your presentaddress"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.presentaddress && touched.presentaddress}
                  success={values.presentaddress.length && !errors.presentaddress}
                />
                {errors.presentaddress && touched.presentaddress ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.presentaddress}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="permanentaddress"
                  name="permanentaddress"
                  value={values.permanentaddress}
                  placeholder="Enter Your permanentaddress"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.permanentaddress && touched.permanentaddress}
                  success={values.permanentaddress.length && !errors.permanentaddress}
                />
                {errors.permanentaddress && touched.permanentaddress ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.permanentaddress}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Work Experience"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="company_name"
                  name="company_name"
                  value={values.company_name}
                  placeholder="Enter Your company_name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.company_name && touched.company_name}
                  success={values.company_name.length && !errors.company_name}
                />
                {errors.company_name && touched.company_name ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.company_name}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="job_title"
                  name="job_title"
                  value={values.job_title}
                  placeholder="Enter Your job_title"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.job_title && touched.job_title}
                  success={values.job_title.length && !errors.job_title}
                />
                {errors.job_title && touched.job_title ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.job_title}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="from_date"
                  name="from_date"
                  value={values.from_date}
                  placeholder="Enter Your from_date"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.from_date && touched.from_date}
                  success={values.from_date.length && !errors.from_date}
                />
                {errors.from_date && touched.from_date ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.from_date}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="to_date"
                  name="to_date"
                  value={values.to_date}
                  placeholder="Enter Your to_date"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.to_date && touched.to_date}
                  success={values.to_date.length && !errors.to_date}
                />
                {errors.to_date && touched.to_date ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.to_date}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="job_description"
                  name="job_description"
                  value={values.job_description}
                  placeholder="Enter Your job_description"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.job_description && touched.job_description}
                  success={values.job_description.length && !errors.job_description}
                />
                {errors.job_description && touched.job_description ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.job_description}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Education Details"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="institute_name"
                  name="institute_name"
                  value={values.institute_name}
                  placeholder="Enter Your institute_name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.institute_name && touched.institute_name}
                  success={values.institute_name.length && !errors.institute_name}
                />
                {errors.institute_name && touched.institute_name ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.institute_name}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="degree"
                  name="degree"
                  value={values.degree}
                  placeholder="Enter Your degree"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.degree && touched.degree}
                  success={values.degree.length && !errors.degree}
                />
                {errors.degree && touched.degree ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.degree}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="specialization"
                  name="specialization"
                  value={values.specialization}
                  placeholder="Enter Your specialization"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.specialization && touched.specialization}
                  success={values.specialization.length && !errors.specialization}
                />
                {errors.specialization && touched.specialization ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.specialization}
                  </MDTypography>
                ) : null}
              </Grid>{" "}
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="date_of_completion"
                  name="date_of_completion"
                  value={values.date_of_completion}
                  placeholder="Enter Your date_of_completion"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.date_of_completion && touched.date_of_completion}
                  success={values.date_of_completion.length && !errors.date_of_completion}
                />
                {errors.date_of_completion && touched.date_of_completion ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.date_of_completion}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={9}>
                <MDTypography variant="h6">{"Dependent Details"}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="name"
                  name="name"
                  value={values.name}
                  placeholder="Enter Your name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name}
                  success={values.name.length && !errors.name}
                />
                {errors.name && touched.name ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.name}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={9} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  // multiple
                  onChange={(event: any, value: any) => {
                    handleChange({ target: { name: "relationship", value } });
                  }}
                  // value={department}
                  // onChange={handleMainFieldChange}
                  options={["B", "S", "F"]}
                  renderInput={(params: any) => (
                    <FormField
                      label={""}
                      InputLabelProps={{ shrink: true }}
                      name="relationship"
                      placeholder="Enter Your relationship"
                      onChange={handleChange}
                      value={values.relationship}
                      {...params}
                      onBlur={handleBlur}
                      error={errors.relationship && touched.relationship}
                      success={!errors.relationship}
                      variant="standard"
                    />
                  )}
                />
                {errors.relationship && touched.relationship ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.relationship}
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormField
                  type="name"
                  label="date_of_birth"
                  name="ddob"
                  value={values.ddob}
                  placeholder="Enter Your ddob"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.ddob && touched.ddob}
                  success={values.ddob.length && !errors.ddob}
                />
                {errors.ddob && touched.ddob ? (
                  // <p className="form-error">{errors.name}</p>
                  <MDTypography variant="caption" fontWeight="regular" color="error">
                    {errors.ddob}
                  </MDTypography>
                ) : null}
              </Grid> */}
            </Grid>
          </MDBox>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default EmployeeUpdation;
