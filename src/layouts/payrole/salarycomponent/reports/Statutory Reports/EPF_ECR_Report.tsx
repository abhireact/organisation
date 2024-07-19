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
import { useNavigate } from "react-router-dom";
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

function ESIC_Summary(): JSX.Element {
  const navigate = useNavigate();
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
            `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/report/liability_report`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.length === 0) {
            message.error("No Data Found");
          } else {
            setData(response.data);
          }
        } catch (error: any) {
          message.error(error.response.data.detail);
        }
      },
    });
  const roundOff = (value: number): number => {
    return Math.round(value);
  };
  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter((item: any) => item.liability === "EPF");

      setApidata({
        columns: [
          // { Header: "LIABILITY", accessor: "liability", width: "25%" },
          {
            Header: "EMPLOYEES' CONTRIBUTION",
            accessor: "emp_amt",
            width: "25%",
          },
          {
            Header: "EMPLOYER'S CONTRIBUTION",
            accessor: "empr_amt",
            width: "25%",
          },
          {
            Header: "TOTAL CONTRIBUTION",
            accessor: "total",
            width: "25%",
          },
        ],
        rows: filteredData.map((item: any) => ({
          // liability: item.liability,
          emp_amt: roundOff(item.emp_amt),
          empr_amt: roundOff(item.empr_amt),
          total: roundOff(item.emp_amt + item.empr_amt),
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
                MindCom
              </MDTypography>
              <MDTypography variant="subtitle1" sx={{ textAlign: "center" }}>
                EPF Summary
              </MDTypography>
            </MDBox>
            <DataTable table={apidata} />
          </Card>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
export default ESIC_Summary;
