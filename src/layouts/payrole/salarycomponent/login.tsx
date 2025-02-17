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
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
function CoverLogin() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
  const [data, setData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [tokendata, setTokendata] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  console.log(process.env.REACT_APP_BACKEND_URL, "process envvvvvvv ");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Input validation using validator.js
      const errors = {};

      if (!isEmail(email)) {
        // errors.email = "Invalid email address";
        alert("Invalid email address");
      }

      if (!isLength(password, { min: 8 })) {
        // errors.password = "Password must be at least 8 characters long";
        alert("Password must be at least 8 characters long");
      }

      if (Object.keys(errors).length > 0) {
        // Handle validation errors, e.g., display error messages to the user
        console.log(errors);
        return;
      }

      const sanitizedEmail = email.replace(/[<>"]/g, ""); // Remove <, >, and " characters
      const sanitizedPassword = password.replace(/[<>"]/g, "");

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          username: sanitizedEmail,
          //   email: sanitizedEmail,
          password: sanitizedPassword,
          //   ph_num: phone,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      if (res.data.access_token) {
        // setTokendata(res.data.access_token);
        // Cookies.set("token", res.data.access_token, { httpOnly: true });
        const token = res.data.access_token;
        Cookies.set("token", token, { expires: 7 });
        navigate("/dashboards/analytics");
        setTimeout(() => {
          window.location.reload();
          message.success("Login Successful");
        }, 0);
        // window.location.reload();
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
            Sign In
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                required
                placeholder="john@example.com"
                InputLabelProps={{ shrink: true }}
                value={email}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              {/* <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                required
                placeholder="************"
                InputLabelProps={{ shrink: true }}
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
              /> */}
              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
                Dont have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/page/template1/create"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default CoverLogin;
