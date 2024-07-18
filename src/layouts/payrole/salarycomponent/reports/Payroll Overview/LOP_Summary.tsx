import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";

import Cookies from "js-cookie";
const token = Cookies.get("token");
const initialValues = {
  year: "",
};

const validationSchema = Yup.object().shape({
  year: Yup.date()
    .required("Year is Required *")
    .test("valid-year", "Incorrect format ", function (value) {
      if (value) {
        const year = new Date(value).getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
});
const LOP_Summary = () => {
  const [data, setData] = useState([]);
  const [apidata, setApidata] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/report/lop_summary`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setData(response.data);
        } catch (error: any) {
          message.error(error.response.data.detail);
        }
      },
    });

  useEffect(() => {
    if (data.length > 0) {
      setApidata({
        columns: [
          { Header: "Employee Name", accessor: "emp_name", width: "10%" },
          { Header: "Total Days", accessor: "total_days", width: "10%" },
          { Header: "LOP", accessor: "lop", width: "10%" },
        ],
        rows: data?.map((item: any) => ({
          emp_name: item.emp_name,
          total_days: item.total_days,
          lop: item.lop,
        })),
      });
    }
  }, [data]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <FormField
              label="Year"
              name="year"
              value={values.year}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText="2023-2024"
              required
              error={errors.year && touched.year}
            />
            {errors.year && touched.year ? (
              <MDTypography
                variant="caption"
                fontWeight="regular"
                color="error"
              >
                {errors.year}
              </MDTypography>
            ) : null}
          </Grid>
          <MDBox p={2} mt={1.5}>
            <MDButton
              variant="gradient"
              color="info"
              style={{ marginRight: "10px" }}
              type="submit"
              size="small"
            >
              Search
            </MDButton>
          </MDBox>
          <Card sx={{ width: "80%", margin: "auto" }}>
            <MDBox p={5}>
              <MDTypography variant="h5" sx={{ textAlign: "center" }}>
                Mindcom
              </MDTypography>
              <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
                LOP Summary
              </MDTypography>
            </MDBox>
            <DataTable table={apidata} />
          </Card>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default LOP_Summary;
