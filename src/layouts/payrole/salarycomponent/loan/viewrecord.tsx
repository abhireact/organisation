import React from "react";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Recordloan from "./recordloan";
import View from "./view";
import Grid from "@mui/material/Grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Manageloan from "./loantype";
import IconButton from "@mui/material/IconButton";
import Cookies from "js-cookie";
import MDBox from "components/MDBox";
const token = Cookies.get("token");

const viewrecord = () => {
  const [data, setData] = useState([]);
  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const Fetchloans = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/record_loans`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("error fetching tasks:", error);
    }
  };
  useEffect(() => {
    Fetchloans();
  }, []);
  //Start Dialog
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End

  //Start Dialog
  const [openloan, setOpenloan] = useState(false);

  const handleOpenloan = () => {
    setOpenloan(true);
  };

  const handleCloseloan = () => {
    setOpenloan(false);
  }; //End
  const dataTableData = {
    columns: [
      { Header: "EMPLOYEE NAME", accessor: "employee_name" },
      { Header: "LOAN NAME", accessor: "loan_name" },
      { Header: "LOAN AMOUNT", accessor: "loan_amount" },
      { Header: "DISBURSEMENT DATE", accessor: "disbursement_date" },
      { Header: "REPAID AMOUNT", accessor: "repaid_amount" },
      { Header: "INSTALLMENT AMOUNT", accessor: "instalment_amount" },

      { Header: "ACTION", accessor: "action" },
    ],

    rows: data.map((row, _index) => ({
      repaid_amount: (
        <MDTypography variant="p">{row.total_repayment_amount}</MDTypography>
      ),
      loan_amount: <MDTypography variant="p">{row.loan_amount}</MDTypography>,
      loan_name: (
        <MDTypography variant="p">{row.manage_loan_name}</MDTypography>
      ),
      employee_name: (
        <MDTypography variant="p">{row.employee_name} </MDTypography>
      ),
      instalment_amount: (
        <MDTypography variant="p">{row.instalment_amount} </MDTypography>
      ),
      disbursement_date: (
        <MDTypography variant="p">
          {row.disbursement_date.split("-")[2]} /
          {row.disbursement_date.split("-")[1]} /
          {row.disbursement_date.split("-")[0]}
        </MDTypography>
      ),
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(_index);
              console.log(_index, "update index");
            }}
          >
            <EditNoteIcon />
          </IconButton>
        </MDTypography>
      ),
    })),
  };
  const handleEditSuccess = () => {
    setOpenupdate(false);
    Fetchloans();
    //  fetchData();
    //  handleClose();
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item>
              <MDButton
                variant="outlined"
                color="info"
                onClick={handleOpenloan}
              >
                Manage Loan
              </MDButton>
            </Grid>
            <Grid item>
              <MDButton variant="contained" color="info" onClick={handleOpen}>
                Record Loan
              </MDButton>
            </Grid>
          </Grid>
          <DataTable table={dataTableData} />
        </MDBox>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Recordloan setOpendialog={setOpen} />
      </Dialog>
      <Dialog open={openloan} onClose={handleCloseloan} maxWidth="lg">
        <Manageloan setOpendialog={setOpenloan} />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <View
          setOpendialog={setOpenupdate}
          data={editData}
          onSuccess={handleEditSuccess}
        />
      </Dialog>
    </DashboardLayout>
  );
};

export default viewrecord;
