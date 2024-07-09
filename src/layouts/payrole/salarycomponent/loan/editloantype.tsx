import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";

import { useFormik } from "formik";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");

const Updatebreak = (props: any) => {
  const { setOpenupdate, editData } = props;
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      loan_name: editData.loan_name,
      pre_rate: editData.perquisite_rate,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      const sendData = {
        old_loan_name: editData.loan_name,
        new_loan_name: values.loan_name,
        perquisite_rate: values.pre_rate,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/manage_loan`,
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
        message.success("Upated Successfully");
      }
      action.resetForm();
    },
  });
  return (
    <MDBox p={4}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item sm={6}>
            <MDTypography ml={10} variant="h6">
              Loan Name
            </MDTypography>
          </Grid>
          <Grid item sm={6}>
            <MDInput
              variant="standard"
              name="loan_name"
              value={values.loan_name}
              onChange={handleChange}
              onBlur={handleBlur}
              mb={10}
              mt={10}
            />
          </Grid>
          <Grid item sm={6}>
            <MDTypography ml={10} variant="h6">
              Prequisite Rate
            </MDTypography>
          </Grid>
          <Grid item sm={6}>
            <MDInput
              type="number"
              variant="standard"
              name="pre_rate"
              value={values.pre_rate}
              onChange={handleChange}
              onBlur={handleBlur}
              mb={10}
              mt={10}
            />
          </Grid>
          <Grid
            container
            sm={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid mt={4}>
              <MDButton
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Save
              </MDButton>
            </Grid>
            <Grid ml={2} mt={4}>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MDBox>
  );
};

export default Updatebreak;
