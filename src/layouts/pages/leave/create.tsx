import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


import { useDispatch } from "react-redux";
import {
  updateClassName,
  storeWorkLocationData,
  storeDepartmentData,
  storeDesignationData,
  storeEmployeeData,
} from "../../../Redux/action/dummyDataActions";

import MainCreateLeavePage from "./mainCreate";
import Cookies from "js-cookie";
function CreateLeavePage() {
  const token = Cookies.get("token");
  // const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // const [data, setData] = useState({
  //   workLocation: {},
  //   department: {},
  //   designation: {},
  //   employee: {},
  // });
  // const [clickBtn, setClickBtn] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(updateClassName({ name: clickBtn }));
  // }, [clickBtn, dispatch]);

  // const fetchData = async (endpoint: string) => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return await response.json();
  //   } catch (error) {
  //     console.error(`Error fetching ${endpoint} data:`, error);
  //     return {};
  //   }
  // };

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     const workLocation = await fetchData('worklocation');
  //     const department = await fetchData('department');
  //     const designation = await fetchData('designation');
  //     const employee = await fetchData('employee');

  //     setData({ workLocation, department, designation, employee });
  //   };

  //   fetchAllData();
  // }, [token]);

  // useEffect(() => {
  //   dispatch(storeWorkLocationData(data.workLocation));
  //   dispatch(storeDepartmentData(data.department));
  //   dispatch(storeDesignationData(data.designation));
  //   dispatch(storeEmployeeData(data.employee));
  // }, [data, dispatch]);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ width: "100%", margin: "auto", mt: "2%" }}>
        {/* <CreateLeave />
        <CreateLeaveTable /> */}
        <MainCreateLeavePage />
        {/* <CreateApplicableType />  */}
        {/* <RestrictionTable /> */}
        {/* <EntitlementTable />
   
        {/* <LeaveGrant /> */}
        {/* <CompensatoryrequestSchedular /> */}
        {/* <CalenderSetting /> */}
        {/* <WorkingDay /> */}

        {/* <PayPeriodSetting />  */}
        {/* <CustomFilterPanelContent /> */}

        {/* <MDButton onClick={() => setClickbtn(true)}>save all the data</MDButton> */}
      </Card>
    </DashboardLayout>
  );
}

export default CreateLeavePage;
