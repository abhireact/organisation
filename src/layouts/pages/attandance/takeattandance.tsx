import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { Drawer } from "antd";
import Importattandance from "./importattandance";
import { Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const TakeAttandance = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const locationdata: string[] = [];

  const fetchEmployee = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/attendance/todays_data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const employeesWithCheckInStatus = response.data.map(
          (employee: any) => ({
            ...employee,
            isCheckedIn: false,
          })
        );
        setData(employeesWithCheckInStatus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchEmployee();
  }, []);

  const handlecheckIn = async (index: number) => {
    const updatedData = [...data];
    // const current_time = new Date();
    // Get the current time in GMT
    const currentGMTTime = new Date();

    // Convert GMT to IST
    const istOffset = 5.5; // IST is GMT+5:30
    const current_time = new Date(
      currentGMTTime.getTime() + istOffset * 60 * 60 * 1000
    );

    console.log("Current IST Time: " + current_time.toISOString()); // Output the IST time
    console.log(typeof current_time, "typeof current_time,");

    updatedData[index].isCheckedIn = true;
    setData(updatedData);
    const main_data = data[index];
    console.log(main_data, "maindata");
    console.log(
      main_data.first_name,
      main_data.employee_email,
      typeof current_time,
      "handlecheckin"
    );

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/attendance`,
        {
          email: main_data.employee_email,
          checkin: current_time,
          checkout: null,
          location: locationdata,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        // navigate("/pages");
        fetchEmployee();

        console.log(" Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handlecheckOut = async (index: number) => {
    const updatedData = [...data];
    const currentGMTTime = new Date();

    // Convert GMT to IST
    const istOffset = 5.5; // IST is GMT+5:30
    const current_time = new Date(
      currentGMTTime.getTime() + istOffset * 60 * 60 * 1000
    );
    console.log(currentGMTTime, current_time, "time");
    console.log("Current IST Time: " + current_time.toISOString()); // Output the IST time
    updatedData[index].isCheckedIn = false;
    setData(updatedData);
    const main_data = data[index];
    console.log(main_data, "maindata");
    console.log(
      main_data.first_name,
      main_data.employee_email,
      typeof current_time,
      "handlecheckout"
    );
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/attendance`,
        {
          email: main_data.employee_email,
          checkin: null,
          checkout: current_time,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        // navigate("/pages");
        fetchEmployee();

        console.log(" Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dataTableData = {
    columns: [
      { Header: "Employee", accessor: "employee_name" },
      { Header: "Employee Email", accessor: "employee_email" },
      { Header: "Action", accessor: "action" },
    ],
    rows: data.map((row, index) => ({
      employee_name: (
        <MDTypography variant="p">{row.employee_name}</MDTypography>
      ),
      employee_email: (
        <MDTypography variant="p">{row.employee_email}</MDTypography>
      ),
      action: (
        <MDTypography variant="p">
          <IconButton
          // onClick={() => {
          //   handleOpenview(index);
          //   console.log(index);
          // }}
          >
            {/* {row.is_checkin ? (
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handlecheckOut(index)}
              >
                CheckOut
              </MDButton>
            ) : (
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => handlecheckIn(index)}
              >
                CheckIn
              </MDButton>
            )} */}
            {(() => {
              if (row.is_checkin && row.is_checkout) {
                return (
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={() => handlecheckIn(index)}
                  >
                    CheckIn
                  </MDButton>
                );
              } else if (row.is_checkin && !row.is_checkout) {
                return (
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={() => handlecheckOut(index)}
                  >
                    CheckOut
                  </MDButton>
                );
              } else if (!row.is_checkin && row.is_checkout) {
                return (
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={() => handlecheckIn(index)}
                  >
                    CheckIn
                  </MDButton>
                );
              } else {
                // Both are false
                return (
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={() => handlecheckIn(index)}
                  >
                    CheckIn
                  </MDButton>
                );
              }
            })()}
          </IconButton>
        </MDTypography>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} p={3}>
        <Grid sm={9}>
          <MDTypography variant="h5">{"Take Attendance"}</MDTypography>
        </Grid>
        <Grid
          item
          sm={3}
          display={"flex"}
          direction={"row"}
          spacing={3}
          flex-direction={"row-reverse"}
        >
          <MDButton
            variant="gradient"
            color="info"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              textAlign: "end",
              marginRight: "10%",
            }}
            onClick={showDrawer}
          >
            <FileUploadIcon />
          </MDButton>
          <MDButton
            variant="gradient"
            color="info"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              textAlign: "end",
            }}
          >
            <FileDownloadIcon />
          </MDButton>
        </Grid>
      </Grid>

      <Drawer
        zIndex={5}
        title="Upload Attandance"
        placement="right"
        onClose={onClose}
        open={open}
        width={720}
        style={{ paddingTop: "10%" }}
      >
        <Importattandance />
      </Drawer>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default TakeAttandance;
