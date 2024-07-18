import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Card, Grid } from "@mui/material";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";

import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

import { Input, message } from "antd";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
const token = Cookies.get("token");
function getEnterAmountOrPercent(
  monthly_amount: any,
  annual_ctc: any,
  basic: any,
  calculation_type: any
) {
  let enter_amount_or_percent = null;

  if (calculation_type === "% of CTC") {
    enter_amount_or_percent = (
      (monthly_amount * 12) /
      (annual_ctc / 100)
    ).toFixed(2);
  } else if (calculation_type === "Flat Amount") {
    enter_amount_or_percent = (monthly_amount * 12).toFixed(2);
  } else if (calculation_type === "% of Basic") {
    enter_amount_or_percent = ((monthly_amount * 12) / (basic / 100)).toFixed(
      2
    );
  }

  return parseFloat(enter_amount_or_percent);
}
function Createsalary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isEpf, setIsEpf] = useState([]);
  const [isEsi, setIsEsi] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/mg_epf`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsEpf(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/mg_esi`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsEsi(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(isEpf, isEsi, "isipf");
  const searchData = new URLSearchParams(location.search).get("data");

  type AllEarningsType = {
    earning_types: Array<{
      // Properties of each item in the earning_types array
      earning_type_name: string;
      calculation_type: string;
      // Add other properties as needed
    }>;
    pre_tax_deductions: Array<{
      deduction_with: string;
      pre_name_slip: string;
      employee_contribution_ctc: boolean;
      calculate_prorata_basis: boolean;
      mark_as_active: boolean;
      location_name: string;
    }>;
    epf_data: Array<{
      epf_number: string;
      epf_deduction_cycle: string;
      employee_contribution_rate: string;
      employer_contribution_rate: string;
      employer_contribution_ctc: [];
      contribution_at_employee_level: string;
      configuration_lop_applied: [];
      abry_eligibility: string;
    }>;
  };
  const [basic, setBasic] = useState(0);
  const [allEarnings, setAllEarnings] = useState<AllEarningsType>({
    earning_types: [],
    pre_tax_deductions: [],
    epf_data: [],
  });
  const [empannual, setEmpannual] = useState(0);
  const epf = allEarnings.epf_data?.length > 0 ? allEarnings.epf_data[0] : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/combined_data`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAllEarnings(response.data);
          console.log("earning data 1", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSalary = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details/by_email?email=${state.email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          //setting Annual CTC
          setEmpannual(Number(response.data[0]?.annual_ctc));
          console.log("respone email...", response.data[0]?.annual_ctc);
          console.log("earning data 2", response.data[0]);
          let employeeData = response.data[0];
          employeeData.earning_types = employeeData.earnings_type_name.map(
            (item: any) => {
              return {
                earning_type_name: item.earnings_name,
                calculation_type: item.calculation_type,
                monthly_amount: item.monthly_amount,
                enter_amount_or_percent: item.enter_amount_or_percent,
              };
            }
          );

          delete employeeData.earnings_type_name;

          employeeData.pre_tax_deductions = employeeData.pre_tax_name.map(
            (item: any) => {
              return {
                pre_name_slip: item.pre_tax_name,
                calculation_type: item.calculation_type,
                monthly_amount: item.monthly_amount,
                enter_amount_or_percent: getEnterAmountOrPercent(
                  item.monthly_amount,
                  response.data[0]?.annual_ctc,
                  basic,
                  item.calculation_type
                ),
              };
            }
          );

          delete employeeData.pre_tax_name;

          setAllEarnings(employeeData);
        } else {
          console.log("annual ctc ", 0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    fetchSalary();
  }, []);

  const initialValues: { [key: string]: any } = {
    template_name: "",
    template_description: "",
    annual_ctc: empannual,
    employers_contribution: "",
    pre_tax_name: allEarnings?.pre_tax_deductions?.map((item: any) => ({
      pre_tax_id: item.pre_name_slip,
      calculation_type: item.calculation_type || "Flat Amount",
      monthly_amount: item.mothly_amount || 0,
      enter_amount_or_percent: item.enter_amount_or_percent || 0,
    })),
    earnings_type_name:
      allEarnings?.earning_types?.map((item: any) => ({
        earnings_id: item.earning_type_name,
        calculation_type: item.calculation_type,
        monthly_amount: "",
        enter_amount_or_percent: item.enter_amount_or_percent,
      })) || [],
    epf: [
      {
        epf_id: "",
        calculation_type: "",
        monthly_amount: "",
      },
    ],
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      let totalAmount = 0;
      const updatedEarnings = values.earnings_type_name.map(
        (
          earnings: {
            enter_amount_or_percent: number;
            calculation_type: string;
          },
          index: any
        ) => ({
          ...earnings,
          monthly_amount:
            earnings.calculation_type === "% of CTC"
              ? parseFloat(
                  (
                    (values.annual_ctc / 100) *
                    (earnings.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : earnings.calculation_type === "Flat Amount"
              ? parseFloat((earnings.enter_amount_or_percent / 12).toFixed(2))
              : earnings.calculation_type === "% of Basic"
              ? parseFloat(
                  (
                    (basic / 100) *
                    (earnings.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : null,
        })
      );
      const updateDeduction = values.pre_tax_name.map(
        (
          deduction: {
            enter_amount_or_percent: number;
            calculation_type: string;
          },
          index: any
        ) => ({
          ...deduction,
          monthly_amount:
            deduction.calculation_type === "% of CTC"
              ? parseFloat(
                  (
                    (values.annual_ctc / 100) *
                    (deduction.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : deduction.calculation_type === "Flat Amount"
              ? parseFloat((deduction.enter_amount_or_percent / 12).toFixed(2))
              : deduction.calculation_type === "% of Basic"
              ? parseFloat(
                  (
                    (basic / 100) *
                    (deduction.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : null,
        })
      );
      console.log(updatedEarnings, updateDeduction, "Deduction and Earning");
      // Function to calculate annual amounts and return total sum
      function calculateAnnualAmountsAndSum() {
        let preTaxArray = updateDeduction;
        let earningsArray = updatedEarnings;
        let sum = 0;
        for (let item of preTaxArray) {
          item.annual_amount = item.monthly_amount * 12;
          sum += item.annual_amount;
        }
        for (let item of earningsArray) {
          item.annual_amount = item.monthly_amount * 12;
          sum += item.annual_amount;
        }
        return sum;
      }
      totalAmount = calculateAnnualAmountsAndSum();
      if (totalAmount > values.annual_ctc) {
        message.error("should be less than   or eqaul to Annual CTC");
        return;
      }

      const postdata = {
        annual_ctc: values.annual_ctc,
        earnings_type_name: updatedEarnings,
        pre_tax_name: updateDeduction,
        employee_email: state.email,
        professional_tax: true,
        welfare_fund: true,
        epf: [
          {
            epf_id: isEpf[0].epf_number,
            calculation_type: isEpf[0].employee_contribution_rate,
            monthly_amount: 0,
          },
        ],
        esi: {
          earnings_id: isEsi[0].esi_number,
          calculation_type: "0.75",
          monthly_amount: 0,
          enter_amount_or_percent: 0,
        },
      };
      console.log(postdata, "sending salary data");
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details`,
          postdata,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          message.success("Updated salary details Successfully");
          // action.resetForm();
        }
      } catch (error) {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/employee_salary_details`,
            postdata,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          message.success("Created salary details Successfully");
          //action.resetForm();
        } catch (postError) {
          console.error("Error creating salary details:", postError);
          // Handle error when creating salary details
        }
      }
    },
  });
  const dataTableData = {
    columns: [
      {
        Header: "SALARY COMPONENTS",
        accessor: "salary_component",
        width: "25%",
      },
      {
        Header: "CALCULATION TYPE",
        accessor: "calculation_type",
        width: "25%",
      },
      { Header: "MONTHLY AMOUNT", accessor: "monthly_amount", width: "25%" },
      { Header: "ANNUAL AMOUNT", accessor: "annual_amount", width: "25%" },
    ],
    rows: [
      {
        salary_component: (
          <MDTypography variant="h6" color="text">
            EARNINGS
          </MDTypography>
        ),
      },
      ...values.earnings_type_name.map((earnings: any, index: any) => {
        return {
          salary_component: earnings.earnings_id,
          calculation_type: (
            <Input
              addonAfter={earnings.calculation_type}
              type="number"
              required
              name={`earnings_type_name[${index}].enter_amount_or_percent`}
              value={values.earnings_type_name[index]?.enter_amount_or_percent}
              onChange={(event: any) => {
                if (event.target.value >= 0) {
                  handleChange({
                    target: {
                      name: `earnings_type_name[${index}].enter_amount_or_percent`,
                      value: event.target.value,
                    },
                  });
                }
              }}
              style={{ width: 200 }}
            />
          ),
          monthly_amount:
            earnings.calculation_type === "% of CTC"
              ? parseFloat(
                  (
                    (values.annual_ctc / 100) *
                    (earnings.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : earnings.calculation_type === "Flat Amount"
              ? parseFloat((earnings.enter_amount_or_percent / 12).toFixed(2))
              : earnings.calculation_type === "% of Basic"
              ? parseFloat(
                  (
                    (basic / 100) *
                    (earnings.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : null,
          annual_amount:
            earnings.calculation_type === "% of CTC"
              ? parseFloat(
                  (
                    (values.annual_ctc / 100) *
                    earnings.enter_amount_or_percent
                  ).toFixed(2)
                )
              : earnings.calculation_type === "Flat Amount"
              ? parseFloat(earnings.enter_amount_or_percent).toFixed(2)
              : earnings.calculation_type === "% of Basic"
              ? parseFloat(
                  ((basic / 100) * earnings.enter_amount_or_percent).toFixed(2)
                )
              : null,
        };
      }),
      {
        salary_component: (
          <MDTypography variant="h6" color="text">
            DEDUCTIONS
          </MDTypography>
        ),
      },
      ...values.pre_tax_name.map((deduction: any, index: any) => {
        return {
          salary_component: deduction.pre_tax_id,
          calculation_type: (
            <Input
              addonAfter={deduction.calculation_type}
              required
              type="number"
              name={`pre_tax_name[${index}].enter_amount_or_percent`}
              value={values.pre_tax_name[index]?.enter_amount_or_percent}
              onChange={(event: any) => {
                if (event.target.value >= 0) {
                  handleChange({
                    target: {
                      name: `pre_tax_name[${index}].enter_amount_or_percent`,
                      value: event.target.value,
                    },
                  });
                }
              }}
              style={{ width: 200 }}
            />
          ),
          monthly_amount:
            deduction.calculation_type === "% of CTC"
              ? parseFloat(
                  (
                    (values.annual_ctc / 100) *
                    (deduction.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : deduction.calculation_type === "Flat Amount"
              ? parseFloat((deduction.enter_amount_or_percent / 12).toFixed(2))
              : deduction.calculation_type === "% of Basic"
              ? parseFloat(
                  (
                    (basic / 100) *
                    (deduction.enter_amount_or_percent / 12)
                  ).toFixed(2)
                )
              : null,
          annual_amount:
            deduction.calculation_type === "% of CTC"
              ? parseFloat(
                  (
                    (values.annual_ctc / 100) *
                    deduction.enter_amount_or_percent
                  ).toFixed(2)
                )
              : deduction.calculation_type === "Flat Amount"
              ? parseFloat(
                  deduction.enter_amount_or_percent.toFixed(2)
                )
              : deduction.calculation_type === "% of Basic"
              ? parseFloat(
                  ((basic / 100) * deduction.enter_amount_or_percent).toFixed(2)
                )
              : null,
        };
      }),
      isEpf.length > 0 && {
        salary_component: "EPF",
        calculation_type: isEpf[0].employee_contribution_rate,
        monthly_amount: "System Calculated",
      },
      isEsi.length > 0 &&
        values.annual_ctc < 250000 && {
          salary_component: "ESI",
          calculation_type: isEsi[0].employees_contribution,
          monthly_amount: "System Calculated",
        },
      // {
      //   salary_component:
      //     epf &&
      //     epf.employer_contribution_ctc &&
      //     epf.employer_contribution_ctc?.length !== 0
      //       ? "EPF - Employer Contribution"
      //       : null,
      //   calculation_type: epf ? epf.employer_contribution_rate : null,
      //   monthly_amount: "",
      // },
    ],
  };

  useEffect(() => {
    values.earnings_type_name.map((earnings: any, index: any) => ({
      ...earnings,
      monthly_amount:
        earnings.calculation_type === "% of CTC"
          ? (parseFloat(
              (
                (values.annual_ctc / 100) *
                (earnings.enter_amount_or_percent / 12)
              ).toFixed(2)
            ),
            setBasic(
              parseFloat(
                (
                  (values.annual_ctc / 100) *
                  earnings.enter_amount_or_percent
                ).toFixed(2)
              )
            ))
          : null,
    }));
  }, [values]);

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <MDTypography variant="h5">
                {"Update Salary Details"}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit">
                {"Save"}
              </MDButton>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            // p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <MDTypography variant="button" color="text" fontWeight="bold">
                Annual CTC *
              </MDTypography>
              <FormField
                type="number"
                label="Enter Amount"
                name="annual_ctc"
                value={values.annual_ctc}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <DataTable
            table={dataTableData}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
          />
        </MDBox>
      </form>
    </Card>
  );
}

export default Createsalary;
