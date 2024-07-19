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
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { Icon } from "@mui/material";
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

const Leave_Encashment_Summary = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
            `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/report/leave_enchasement`,
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
  const roundOff = (value: number): string => {
    return value.toFixed(2);
  };
  useEffect(() => {
    if (data.length > 0) {
      setApidata({
        columns: [
          { Header: "Employee Name", accessor: "emp_name", width: "10%" },
          { Header: "Amount", accessor: "amount", width: "10%" },
        ],
        rows: data?.map((item: any) => ({
          emp_name: item.emp_name,
          amount: roundOff(item.amount),
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
            <Grid
              item
              xs={12}
              sm={12}
              sx={{ textAlign: "right" }}
              mx={4}
              mt={2}
            >
              <Icon
                onClick={() => {
                  navigate(-1);
                }}
              >
                close
              </Icon>
            </Grid>
            <MDBox p={5}>
              <MDTypography variant="h5" sx={{ textAlign: "center" }}>
                Mindcom
              </MDTypography>
              <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
                Leave Encashment Summary
              </MDTypography>
            </MDBox>
            <DataTable table={apidata} isSorted={false} />
          </Card>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default Leave_Encashment_Summary;
