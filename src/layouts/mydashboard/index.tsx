import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, ResponsiveChartContainer, axisClasses } from "@mui/x-charts";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import { Link } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import StraightIcon from "@mui/icons-material/Straight";
import axios from "axios";
import Cookies from "js-cookie";
import {
  storeDepartmentData,
  storeDesignationData,
  storeEmployeeData,
  storeWorkLocationData,
  updateClassName,
  storeUserProfile,
  storeMYProfileData,
  storeLeavetypeData,
} from "Redux/action/dummyDataActions";
import { useDispatch, useSelector } from "react-redux";

const dataset2 = [
  {
    bengaluru: 59,
    newdelhi: 57,
    mumbai: 86,
    lucknow: 21,
    month: "Jan",
  },
  {
    bengaluru: 50,
    newdelhi: 52,
    mumbai: 78,
    lucknow: 28,
    month: "Feb",
  },
  {
    bengaluru: 47,
    newdelhi: 53,
    mumbai: 106,
    lucknow: 41,
    month: "Mar",
  },
  {
    bengaluru: 54,
    newdelhi: 56,
    mumbai: 92,
    lucknow: 73,
    month: "Apr",
  },
  {
    bengaluru: 57,
    newdelhi: 69,
    mumbai: 92,
    lucknow: 99,
    month: "May",
  },
  {
    bengaluru: 60,
    newdelhi: 63,
    mumbai: 103,
    lucknow: 144,
    month: "June",
  },
  {
    bengaluru: 59,
    newdelhi: 60,
    mumbai: 105,
    lucknow: 119,
    month: "July",
  },
  {
    bengaluru: 65,
    newdelhi: 60,
    mumbai: 106,
    lucknow: 49,
    month: "Aug",
  },
  {
    bengaluru: 51,
    newdelhi: 51,
    mumbai: 95,
    lucknow: 131,
    month: "Sept",
  },
  {
    bengaluru: 60,
    newdelhi: 65,
    mumbai: 97,
    lucknow: 55,
    month: "Oct",
  },
  {
    bengaluru: 67,
    newdelhi: 64,
    mumbai: 76,
    lucknow: 48,
    month: "Nov",
  },
  {
    bengaluru: 61,
    newdelhi: 70,
    mumbai: 103,
    lucknow: 25,
    month: "Dec",
  },
];

const chartSetting = {
  yAxis: [
    {
      label: "Employee addition  (no.)",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};
const dataset = [
  { month: "Jan", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Feb", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Mar", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Apr", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "May", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Jun", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Jul", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Aug", Bengluru: 0, Dholakpur: 1, Lucknow: 0, Mumbai: 0 },
  { month: "Sep", Bengluru: 0, Dholakpur: 2, Lucknow: 0, Mumbai: 0 },
  { month: "Oct", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Nov", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
  { month: "Dec", Bengluru: 0, Dholakpur: 0, Lucknow: 0, Mumbai: 0 },
];

const valueFormatter = (value: number) => `${value}`;
export default function MYDashboard() {
  const token = Cookies.get("token");
  const options = [
    { label: "Diversity", value: "diversity" },
    { label: "Distribution", value: "distribution" },
    { label: "Dashboard", value: "dashboard" },
  ];
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const [employeAddition, setEmployeAddition] = useState();
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [attendancedata, setAttendancedata] = useState([]);

  // redux call

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const [data, setData] = useState({
    workLocation: {},
    department: {},
    designation: {},
    employee: {},
    leavetype: {},

    profile: {},
  });
  const [clickBtn, setClickBtn] = useState(false);
  const dispatch = useDispatch();
  const userprofileData = useSelector((state: any) => state.dummyData);

  console.log(userprofileData, "profile");
  useEffect(() => {
    dispatch(updateClassName({ name: clickBtn }));
  }, [clickBtn, dispatch]);

  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      return {};
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const workLocation = await fetchData("worklocation");
      const department = await fetchData("department");
      const designation = await fetchData("designation");
      const employee = await fetchData("employee");
      const leavetype = await fetchData("mg_leave_type");
      const profile = await fetchData("users/me_data");
      setData({
        workLocation,
        department,
        designation,
        employee,
        profile,
        leavetype,
      });
    };

    fetchAllData();
  }, [token]);
  console.log(data, "all data to be saved ");

  useEffect(() => {
    dispatch(storeWorkLocationData(data.workLocation));
    dispatch(storeDepartmentData(data.department));
    dispatch(storeDesignationData(data.designation));
    dispatch(storeEmployeeData(data.employee));
    dispatch(storeMYProfileData(data.profile));
    dispatch(storeLeavetypeData(data.leavetype));
  }, [data, dispatch]);

  // get employe addition
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/new_joining`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeAddition(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const series = Object.keys(employeAddition ? employeAddition[0] : dataset[0])
    .map((key) => {
      if (key === "month") {
        return null; // Skip 'month' key
      }

      return {
        dataKey: key,
        label: key,
        valueFormatter, // Assuming valueFormatter is defined somewhere in your code
      };
    })
    .filter((item) => item !== null);

  // get designationdata
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/designation`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDesignationData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get departmentdata
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartmentData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get locationtdata
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/location`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLocationData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // get genderdata
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/report/gender`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGenderData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // get agedata
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/employee/report/age`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAgeData(response.data);
        // setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // attendace

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/attendance/dailystatus`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAttendancedata(response?.data);
        // setTasks(response.data); //updating dialog box
        console.log(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid p={3} container>
          <Grid>
            <MDTypography variant="h4">Dashboard</MDTypography>{" "}
          </Grid>
          <Grid sm={3}></Grid>
        </Grid>
        <Divider />

        <Grid container spacing={2} p={2}>
          {/* <Grid item sm={4}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <MDTypography>Headcount & growth rate</MDTypography>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">Month (Oct) </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">YOY </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2023 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 0.00%</MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 5.88% </MDTypography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2024 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>23 | 4.55% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={4}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <MDTypography>Employee addition & growth rate</MDTypography>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">Month (Oct) </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">YOY </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2023 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 0.00% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 5.88% </MDTypography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2024 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>23 | 4.55% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={4}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <MDTypography>Employee attrition & growth rate</MDTypography>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">Month (Oct) </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">YOY </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2023 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 0.00% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>18 | 5.88% </MDTypography>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {" "}
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography variant="h6">2024 </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography>23 | 4.55% </MDTypography>
                </Grid>
                <Grid item sm={4} textAlign={"center"}>
                  {" "}
                  <MDTypography> </MDTypography>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8}>
                  {" "}
                  <MDTypography>Employee addition trend </MDTypography>
                </Grid>
                <Grid item sm={4}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/employeeadditionreports"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid sm={12} textAlign={"center"} p={1}>
                {" "}
                <BarChart
                  dataset={employeAddition ? employeAddition : dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={series}
                  margin={{
                    left: 80,
                    right: 80,
                    top: 110,
                    bottom: 80,
                  }}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Employee attrition trend </MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/page/template1/create"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <BarChart
                  dataset={employeAddition ? employeAddition : dataset}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={series}
                  margin={{
                    left: 80,
                    right: 80,
                    top: 110,
                    bottom: 80,
                  }}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid> */}
          {/* <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8}>
                  {" "}
                  <MDTypography>Employee Leave trend </MDTypography>
                </Grid>
                <Grid item sm={4}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/leavetrend"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid sm={12} textAlign={"center"} p={1}>
                {" "}
                <BarChart
                  dataset={dataset2}
                  xAxis={[{ scaleType: "band", dataKey: "month" }]}
                  series={[
                    {
                      dataKey: "bengaluru",
                      label: "Bengaluru",
                      valueFormatter,
                    },
                    { dataKey: "newdelhi", label: "New Delhi", valueFormatter },
                    { dataKey: "mumbai", label: "Mumbai", valueFormatter },
                    { dataKey: "lucknow", label: "Lucknow", valueFormatter },
                  ]}
                  {...chartSetting}
                />
              </Grid>
            </MDBox>
          </Grid> */}
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Work Location</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/distributionreport"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: locationData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          {/* <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Designations</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/distributionreport"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: designationData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid> */}
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Departments</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/distributionreport"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: departmentData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  // width={550}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Attendance</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/leavereport/detailedattendance"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: attendancedata,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Gender</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/genderdiversity"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: genderData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  // width={550}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid>
          {/* <Grid item sm={6}>
            <MDBox borderRadius="10px" border={"1px solid #F1F3F4"}>
              <Grid container spacing={3} p={2}>
                <Grid item sm={8} pb={1}>
                  {" "}
                  <MDTypography>Age.</MDTypography>
                </Grid>
                <Grid item sm={4} pb={1}>
                  {" "}
                  <MDTypography
                    component={Link}
                    to="/pages/reports/genderdiversity"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Detailed Report{" "}
                  </MDTypography>
                </Grid>
              </Grid>

              <Grid sm={12} textAlign={"center"} pb={1}>
                {" "}
                <PieChart
                  series={[
                    {
                      data: ageData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  // width={550}
                  height={200}
                />
              </Grid>
            </MDBox>
          </Grid> */}
        </Grid>
      </Card>
    </DashboardLayout>
  );
}
