import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from "components/MDButton";

import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";

import axios from "axios";

import MDInput from "components/MDInput";
import { useFormik } from "formik";
import * as yup from "yup";

import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import SalaryEdit from "./edit_template";
import Cookies from "js-cookie";
import MDButton from "components/MDButton";
import { Link } from "@mui/material";
import { message } from "antd";
const token = Cookies.get("token");

function Temptable(): JSX.Element {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  function fetchdata() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/mg_salary_template`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setTasks(response.data); //updating dialog box
        console.log(response.data);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  }

  const dataTableData = {
    columns: [
      { Header: "TEMPLATE NAME", accessor: "temp_name" },

      { Header: "DESCRIPTION", accessor: "description" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      temp_name: <p>{row.template_name}</p>,
      description: <p>{row.template_description}</p>,
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(row.template_name)}>
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
    })),
  };
  // updating  dialog box
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);
  const handleOpenupdate = (index: number) => {
    let main_data = tasks[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditTaskData(main_data);
  };
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  //Deleting part
  const handleDeleteTask = async (template_name: any) => {
    try {
      axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/mg_salary_template/?template_name=${template_name}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          fetchdata();
          message.success(response.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.detail);
        });
    } catch (error) {
      console.error("Not Deleted", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <Card>
          <Grid container>
            <Grid item>
              <Link href="/createsalarytemplate" variant="body2">
                <MDButton color="info">Create Template</MDButton>
              </Link>
            </Grid>
          </Grid>
          <DataTable table={dataTableData} />
        </Card>
        <Dialog open={openupdate} onClose={handleCloseupdate} fullScreen>
          <SalaryEdit
            openupdate={openupdate}
            setOpenupdate={setOpenupdate}
            editdata={editTaskData}
          />
        </Dialog>
      </DashboardLayout>
    </>
  );
}

export default Temptable;
