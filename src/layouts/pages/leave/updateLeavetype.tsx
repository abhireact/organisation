import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
  FormLabel,
} from "@mui/material";
import * as Yup from "yup";
import Cookies from "js-cookie";
import FormField from "../account/components/FormField";

const token = Cookies.get("token");

const UpdateLeaveType = (props: any) => {
  const { editData, onSuccess,  } = props;

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      old_leave_name: editData?.leave_type_name || "",
      leave_type_name: editData?.leave_type_name || "",
      leave_type_code: editData?.leave_type_code || "",
      leave_type: editData?.leave_type || "",
      description: editData?.description || "",
      unit: editData?.unit || "",
      balance_based_on: editData?.balance_based_on || "",
      is_active: false,
      start_date: editData?.start_date || "",
      end_date: editData?.end_date || "",
    },
    onSubmit: (values, action) => {
      const sendData = {
        ...editData,
      };
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/mg_leave_type`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          props.onSuccess();
          console.log("submit data", response.data);
        })
        .catch((error: any) => {
          message.error(error);
        });
    },
  });
  // console.log(editData.fine_name, "fine name");

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} p={3}>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Update Leave Type
            </MDTypography>
          </Grid>
        </Grid>
        <MDBox p={4}>
          <Grid item xs={12} sm={3}>
            <MDInput
              required
              type="name"
              label="Leave Name "
              name="leave_type_name"
              value={values.leave_type_name}
              placeholder="Enter Your Leave name "
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.leave_type_name && touched.leave_type_name}
              success={values.leave_type_name.length && !errors.leave_type_name}
            />
            {errors.leave_type_name && touched.leave_type_name ? (
              <Grid>
                {" "}
                <MDTypography
                  variant="caption"
                  fontWeight="regular"
                  color="error"
                >
                  {errors.leave_type_name}
                </MDTypography>
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDInput
              type="name"
              required
              label="Leave Code "
              name="leave_type_code"
              value={values.leave_type_code}
              // disabled={editData.showData ? true : false}
              placeholder="Enter Your Leave Code "
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.leave_type_code && touched.leave_type_code}
              success={values.leave_type_code.length && !errors.leave_type_code}
            />
            {errors.leave_type_code && touched.leave_type_code ? (
              // <p classleave_type_code="form-error">{errors.leave_type_code}</p>
              <Grid>
                {" "}
                <MDTypography
                  variant="caption"
                  fontWeight="regular"
                  color="error"
                >
                  {errors.leave_type_code}
                </MDTypography>
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              onChange={(event, value) => {
                handleChange({
                  target: { name: "leave_type", value },
                });
              }}
              options={["Paid", "Unpaid", "Onduty", "Restricted Holiday"]}
              renderInput={(params) => (
                <FormField
                  label={"Type"}
                  InputLabelProps={{ shrink: true }}
                  name="leave_type"
                  onChange={handleChange}
                  value={values.leave_type}
                  {...params}
                  variant="standard"
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12} sm={3}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                {" "}
                <MDTypography variant="body2"> Unit* </MDTypography>{" "}
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={unit} // Set the selected value of message type
                onChange={(e) => setUnit(e.target.value)} // Update the selected message type
              >
                <FormControlLabel
                  value="days"
                  control={<Radio />}
                  label={<MDTypography variant="body2">Days</MDTypography>}
                />
                <FormControlLabel
                  value="hours"
                  control={<Radio />}
                  label={<MDTypography variant="body2">Hours</MDTypography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid> */}

          <Grid item xs={12} sm={2.5}>
            <MDTypography
              component="label"
              variant="button"
              fontWeight="regular"
              color="text"
            >
              Start Date
            </MDTypography>
            <MDInput
              type="date"
              variant="standard"
              name="start_date"
              value={values.start_date}
              sx={{ width: "100%" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <MDTypography
              component="label"
              variant="button"
              fontWeight="regular"
              color="text"
            >
              End Date
            </MDTypography>
            <MDInput
              type="date"
              name="end_date"
              variant="standard"
              sx={{ width: "100%" }}
              value={values.end_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4.5}>
            {/* <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block"> */}
            <MDTypography
              component="label"
              variant="button"
              fontWeight="regular"
              color="text"
            >
              Description
            </MDTypography>

            <MDInput
              type="name"
              // label="Leave Name "
              name="description"
              label={"typehere"}
              multiline
              rows={3}
              sx={{ width: "100%" }}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description && touched.description}
              success={values.description.length && !errors.description}
            />
            {errors.description && touched.description ? (
              <MDTypography
                variant="caption"
                fontWeight="regular"
                color="error"
              >
                {errors.description}
              </MDTypography>
            ) : null}
          </Grid>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-end" }}
            mt={4}
          >
            <Grid item>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => props.onSuccess()}
              >
                {"back"}
              </MDButton>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                {"save"}
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </Card>
  );
};
export default UpdateLeaveType;
