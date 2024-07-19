import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
import { Icon, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");

const initialValues = {
  year: "",
};

interface DeductionData {
  [key: string]: number;
  "Pension Funds": number;
  "Health Insurance ": number;
  "Loan - Education Loan": number;
  "Loan - Home  loan": number;
  "Child Education": number;
  total_deduction: number;
}

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

const Pre_Tax_Deductions_Summary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DeductionData | null>(null);
  const [apiData, setApiData] = useState<{
    columns: any[];
    rows: Array<{ [key: string]: number | string }>;
  }>({
    columns: [],
    rows: [],
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async () => {
        try {
          const response = await axios.get<DeductionData>(
            `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/report/pre_tax_deduction?year=${values.year}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (Object.keys(response.data).length === 0) {
            message.error("No Data Found");
          } else {
            setData(response.data);
          }
        } catch (error: any) {
          message.error(error.response.data.detail);
        }
      },
    });

  const trimKeys = (obj: DeductionData): { [key: string]: number } => {
    const result: { [key: string]: number } = {};
    Object.keys(obj).forEach((key) => {
      result[key.trim()] = obj[key];
    });
    return result;
  };

  const formatNumber = (value: number): string => {
    return value.toFixed(2);
  };

  useEffect(() => {
    if (data) {
      const trimmedData = trimKeys(data);

      const roundedData: { [key: string]: number | string } = {
        "Pension Funds": trimmedData["Pension Funds"],
        "Health Insurance": trimmedData["Health Insurance"],
        "Loan - Education Loan": trimmedData["Loan - Education Loan"],
        "Loan - Home  loan": trimmedData["Loan - Home  loan"],
        "Child Education": trimmedData["Child Education"],
        total_deduction: trimmedData["total_deduction"],
        "Health Insurance ": 0,
      };

      setApiData({
        columns: [
          { Header: "Pension Funds", accessor: "Pension Funds", width: "20%" },
          {
            Header: "Health Insurance",
            accessor: "Health Insurance",
            width: "20%",
          },
          {
            Header: "Loan - Education Loan",
            accessor: "Loan - Education Loan",
            width: "20%",
          },
          {
            Header: "Loan - Home  loan",
            accessor: "Loan - Home  loan",
            width: "20%",
          },
          {
            Header: "Child Education",
            accessor: "Child Education",
            width: "20%",
          },
          {
            Header: "Total Deduction",
            accessor: "total_deduction",
            width: "20%",
          },
        ],
        rows: [roundedData],
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
              helperText="2023-2024"
              onChange={handleChange}
              onBlur={handleBlur}
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
                Pre-Tax Deductions Summary
              </MDTypography>
            </MDBox>
            <DataTable
              table={{
                ...apiData,
                rows: apiData.rows.map((row) => ({
                  ...row,
                  "Pension Funds": formatNumber(row["Pension Funds"] as number),
                  "Health Insurance": formatNumber(
                    row["Health Insurance"] as number
                  ),
                  "Loan - Education Loan": formatNumber(
                    row["Loan - Education Loan"] as number
                  ),
                  "Loan - Home  loan": formatNumber(
                    row["Loan - Home  loan"] as number
                  ),
                  "Child Education": formatNumber(
                    row["Child Education"] as number
                  ),
                  total_deduction: formatNumber(
                    row["total_deduction"] as number
                  ),
                })),
              }}
            />
          </Card>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default Pre_Tax_Deductions_Summary;
