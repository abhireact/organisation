import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Cookies from "js-cookie";
const token = Cookies.get("token");
import axios from "axios";
import { message } from "antd";

const AddLoanType = (props: any) => {
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      loan_name: "",
      pre_rate: 0,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      const sendData = {
        loan_name: values.loan_name,
        perquisite_rate: values.pre_rate,
      };
      const response = await axios.post(
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
        message.success("Created Successfully");
      }
      action.resetForm();
    },
  });
  return (
    <MDBox p={4}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <MDTypography ml={10} variant="body2" fontWeight="bold">
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
            />
          </Grid>
          <Grid item sm={6}>
            <MDTypography ml={10} variant="body2" fontWeight="bold">
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
            />
          </Grid>

          <Grid
            container
            sm={12}
            mt={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </MDButton>
            </Grid>
            <Grid ml={2}>
              <MDButton
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleClose();
                }}
              >
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MDBox>
  );
};

export default AddLoanType;
