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

import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
function ResetPassword() {
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [tokendata, setTokendata] = useState("");
  //   const dispatched = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  console.log("myname", token);
  //storing token

  console.log(data, typeof data, "academic data");

  console.log(classData, typeof classData, "academic classData");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(rememberMe, "rememrmber me");
    try {
      // Input validation using validator.js
      const errors = {};

      if (!isLength(oldPassword, { min: 8 })) {
        // errors.password = "Password must be at least 8 characters long";
        alert("Password must be at least 8 characters long");
      }
      if (!isLength(newPassword, { min: 8 })) {
        // errors.password = "Password must be at least 8 characters long";
        alert("Password must be at least 8 characters long");
      }
      if (Object.keys(errors).length > 0) {
        // Handle validation errors, e.g., display error messages to the user
        console.log(errors);
        return;
      }

      //   const sanitizedEmail = email.replace(/[<>"]/g, ""); // Remove <, >, and " characters
      const sanitizedoldPassword = oldPassword.replace(/[<>"]/g, "");
      const sanitizednewPassword = newPassword.replace(/[<>"]/g, "");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}http://122.166.211.176:8000/reset_password`,
        {
          oldPassword: sanitizedoldPassword,
          newPassword: sanitizednewPassword,
          //   ph_num: phone,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );
      console.log(res, "hubhcdasssssssssssssssl");

      if (res.data.access_token) {
        // setTokendata(res.data.access_token);
        // Cookies.set("token", res.data.access_token, { httpOnly: true });
        const token = res.data.access_token;
        Cookies.set("token", token, { expires: 7 });
        navigate("/dashboard");
        message.success("Login Successful");
      } else {
        message.error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
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
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your Old and newPassword to Reset Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Old Password"
                variant="standard"
                fullWidth
                required
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                value={oldPassword}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setOldPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="New Password"
                variant="standard"
                fullWidth
                required
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                value={newPassword}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setNewPassword(e.target.value)}
              />
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch
                required
                checked={rememberMe}
                onChange={handleSetRememberMe}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                Remember Me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                // to="/page/template1/create"
                color="info"
                fullWidth
                type="submit"
              >
                Sign In
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Donot have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/page/template1/create"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign Up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPassword;
