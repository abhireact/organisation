import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import MDInput from "components/MDInput";

import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import { message } from "antd";
import Autocomplete from "@mui/material/Autocomplete";
const token = Cookies.get("token");

const View = (props: any) => {
  const { setOpendialog, data } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const handleClosedialog = () => {
    setOpendialog(false);
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      loan_amount: data.loan_amount,
      repayment_date: "",
      repayment_amount: data.instalment_amount,
      employee_name: data.employee_name,
      loan_name: data.manage_loan_name,
      paid_through_account: "",
    },
    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const sendData = {
        employee_name: values.employee_name,
        loan_name: values.loan_name,
        loan_amount: values.loan_amount,
        loan_repay_date: values.repayment_date,
        repayment_amount: values.repayment_amount,
        paid_through_account: values.paid_through_account,
      };

      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/loans_child`, sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            props.onSuccess();
            // window.location.reload();
            message.success("update repayment successfull");
          }
        })
        .catch((error) => {
          setErrorMessage(error.response.data?.detail || "error occured");
          message.error("error occured");
          console.log(error);
        });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        {errorMessage && (
          <MDTypography color="error" variant="body2">
            {errorMessage}
          </MDTypography>
        )}
        <Grid container spacing={3}>
          <Grid item sm={5}>
            <MDTypography variant="body2">Employee Name</MDTypography>
          </Grid>
          <Grid item sm={5}>
            <MDInput
              sx={{ width: "90%" }}
              disabled
              variant="standard"
              name="employee_name"
              value={values.employee_name}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item sm={5}>
            <MDTypography variant="body2">Loan Name</MDTypography>
          </Grid>
          <Grid item sm={5}>
            <MDInput
              sx={{ width: "90%" }}
              disabled
              variant="standard"
              name="loan_name"
              value={values.loan_name}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item sm={5}>
            <MDTypography variant="body2">Loan Amount</MDTypography>
          </Grid>
          <Grid item sm={5}>
            <MDInput
              sx={{ width: "90%" }}
              disabled
              variant="standard"
              name="loan_amount"
              type="number"
              value={values.loan_amount}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item sm={5}>
            <MDTypography variant="body2">Repayment Amount</MDTypography>
          </Grid>
          <Grid item sm={5}>
            <MDInput
              sx={{ width: "90%" }}
              disabled
              variant="standard"
              name="repayment_amount"
              type="number"
              value={values.repayment_amount}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </Grid>
          <Grid item sm={5}>
            <MDTypography variant="body2">Repayment Date</MDTypography>
          </Grid>
          <Grid item sm={5}>
            <MDInput
              sx={{ width: "90%" }}
              variant="standard"
              name="repayment_date"
              type="date"
              required
              value={values.repayment_date}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item sm={5}>
            <MDTypography variant="body2">Paid through account</MDTypography>
          </Grid>
          <Grid item sm={5}>
            <Autocomplete
              disableClearable
              sx={{ width: "90%" }}
              options={["CHEQUE", "UPI", "BANK ACCOUNT"]}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Choose Payment Method"
                  variant="standard"
                  name="paid_through_account"
                  value={values.paid_through_account}
                />
              )}
              value={values.paid_through_account}
              onChange={(_event, value) => {
                handleChange({
                  target: { name: "paid_through_account", value },
                });
              }}
            />
          </Grid>

          <Grid
            container
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid mt={4}>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClosedialog();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
            <Grid ml={2} mt={4}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default View;
