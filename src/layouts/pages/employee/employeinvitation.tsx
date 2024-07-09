import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
// import { isEmail, isLength } from "validator";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import Cookies from "js-cookie";
import { message } from "antd";

import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
// import {
//   updateAcademicName,
//   updateClassName,
//   updateName,
//   updateSectionName,
// } from "../../Redux/action/dummyDataActions";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FormField from "../account/components/FormField";
// import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  email: "",
  otp: "",
  // username: "",
  password: "",
  // ph_num:""
};
function EmployeeInvitation() {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: organisationSchema,
    enableReinitialize: true,
    onSubmit: (values: any, action: { resetForm: () => void }) => {
      console.log(" ~ file: Registration.jsx ~ line 11 ~ Registration ~ values", values);
      action.resetForm();
    },
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [tokendata, setTokendata] = useState("");
  //   const dispatched = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log("myname", token);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleFormSubmit = async () => {
    console.log(values, "formdata");
    try {
      const response = await axios.post("http://122.166.211.176:8000/employeeotp", values, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        navigate("/pages");
        console.log(" Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and OTP to Verify
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            {/* <MDBox mb={2}>

               <FormField
              type="name"
              label="username"
              name="username"
              value={values.username}
              placeholder="Enter Your username"
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username && touched.username}
              success={values.username.length && !errors.username}
            />
            {errors.username && touched.username ? (
              // <p className="form-error">{errors.name}</p>
              <MDTypography variant="caption" fontWeight="regular" color="error">
                {errors.username}
              </MDTypography>
            ) : null}
            </MDBox> */}
            <MDBox mb={2}>
              <FormField
                type="email"
                label="email"
                name="email"
                value={values.email}
                placeholder="Enter Your email"
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
            </MDBox>
            <MDBox mb={2}>
              <FormField
                type="name"
                label="otp"
                name="otp"
                value={values.otp}
                placeholder="Enter Your otp"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.otp && touched.otp}
                success={values.otp.length && !errors.otp}
              />
              {errors.otp && touched.otp ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.otp}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox mb={2}>
              <FormField
                type="name"
                label="password"
                name="password"
                value={values.password}
                placeholder="Set Your password"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                success={values.password.length && !errors.password}
              />
              {errors.password && touched.password ? (
                // <p className="form-error">{errors.name}</p>
                <MDTypography variant="caption" fontWeight="regular" color="error">
                  {errors.password}
                </MDTypography>
              ) : null}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch required checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                I agree the Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                // to="/page/template1/create"
                onClick={handleFormSubmit}
                color="info"
                fullWidth
                type="submit"
              >
                Verify
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/page/template1/create"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  // textGradient
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default EmployeeInvitation;
