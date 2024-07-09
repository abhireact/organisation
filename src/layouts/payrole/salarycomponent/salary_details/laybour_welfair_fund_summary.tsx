import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
function LabourWelfairFudStructure() {
  const [pagestatus, setPageStatus] = useState("create");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/mg_payschedule/by_name`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data, "all earning data");
          // setEarnings(response.data);
          setPageStatus("edit");
        }
      } catch (error) {
        // console.error(error);
        console.log("location not found");
      }
    };
    fetchData();
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>LabourWelfairFudStructure</h1>
    </DashboardLayout>
  );
}

export default LabourWelfairFudStructure;
