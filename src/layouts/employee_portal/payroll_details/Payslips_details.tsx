import { Card, Divider, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { useLocation } from "react-router-dom";

const Paylips_details = () => {
  const { state } = useLocation();
  let totalearnings = state.emp_salary[0].earning_amt;
  let totaldeduction =
    state.emp_salary[0].pre_tax_amt +
    Number(state.emp_salary[0].epf_amt) +
    Number(state.emp_salary[0].esi_amt) +
    Number(state.emp_salary[0].lop_amt) +
    Number(state.emp_salary[0].tax_amt);
  let Earning = (
    <Grid item xs={12} sm={6} mb={2}>
      <MDTypography variant="h6">Eanings</MDTypography>
      <Divider />
      <React.Fragment>
        <Grid container>
          {state.emp_salary[0].earnings.map((item: any, index: any) => {
            return (
              <React.Fragment key={index}>
                {item.monthly_amount > 0 && (
                  <>
                    <Grid item xs={12} sm={8}>
                      <MDTypography variant="body2">
                        {item.earnings_name}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                      <MDTypography variant="body2">
                        {item.monthly_amount.toFixed(2)}
                      </MDTypography>
                      {index < state.emp_salary[0].earnings.length - 1 && (
                        <Divider />
                      )}
                    </Grid>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </Grid>
      </React.Fragment>
    </Grid>
  );

  let Deductions = (
    <Grid item xs={12} sm={5.5} mb={2}>
      <MDTypography variant="h6">Deductions</MDTypography>
      <Divider />

      <Grid container>
        {state.emp_salary[0].pre_tax.map((item: any, index: any) => {
          return (
            <React.Fragment key={index}>
              {item.monthly_amount > 0 && (
                <>
                  <Grid item xs={12} sm={8}>
                    <MDTypography variant="body2">
                      {item.earnings_name}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                    <MDTypography variant="body2">
                      {`₹${item.monthly_amount
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    </MDTypography>
                    {index < state.emp_salary[0].pre_tax.length - 1 && (
                      <Divider />
                    )}
                  </Grid>
                </>
              )}
            </React.Fragment>
          );
        })}
        {state.emp_salary[0].lop_amt > 0 && (
          <>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="body2">LOP</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">
                {state.emp_salary[0].lop_amt}
              </MDTypography>
              <Divider />
            </Grid>
          </>
        )}
        {state.emp_salary[0].epf_amt > 0 && (
          <>
            <Grid item xs={12} sm={7}>
              <MDTypography variant="body2">EPF</MDTypography>
            </Grid>
            <Grid item xs={12} sm={5} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">
                {state.emp_salary[0].epf_amt}
              </MDTypography>
              <Divider />
            </Grid>
          </>
        )}
        {state.emp_salary[0].esi_amt > 0 && (
          <>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="body2">ESI</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">
                {state.emp_salary[0].esi_amt}
              </MDTypography>
              <Divider />
            </Grid>
          </>
        )}
        {state.emp_salary[0].tax_amt > 0 && (
          <>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="body2">Tax</MDTypography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
              <MDTypography variant="body2">
                {state.emp_salary[0].tax_amt}
              </MDTypography>
              <Divider />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );

  const deductionandearnings = (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total Earnings</MDTypography>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
        <MDTypography variant="h6">{`₹${totalearnings
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</MDTypography>
      </Grid>

      <Grid item xs={12} sm={0.5}></Grid>

      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total Deductions</MDTypography>
      </Grid>
      <Grid item xs={12} sm={2.5} sx={{ textAlign: "right" }}>
        <MDTypography variant="h6">{`₹${totaldeduction
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</MDTypography>
      </Grid>
    </Grid>
  );

  const netpayValue = state.emp_salary[0].net_pay;

  function generatePDF() {
    const element = document.getElementById("componentToDownload");
    // html2pdf(element);
  }

  return (
    <MDBox p={4} id="componentToDownload">
      <MDTypography variant="h4">Mindcom Group ltd</MDTypography>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <MDTypography variant="caption">
            2, 2nd G, 1st Cross Rd, HRBR Layout 1st Block, Balaji Layout,
            Subbaiahnapalya, Banaswadi, Bengaluru, Karnataka 560043 Bengaluru
            Karnataka 560043 India
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
          <MDTypography variant="caption">Payslip For the Month</MDTypography>
          <MDTypography variant="body1" sx={{ fontWeight: "bold" }}>
            {state.month}
          </MDTypography>
        </Grid>
      </Grid>
      <Divider />
      <MDTypography variant="h6">EMPLOYEE SUMMARY</MDTypography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="overline">Employee Name</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="overline">
                : {state.emp_salary[0].name}{" "}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="overline">Designation</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="overline">
                : {state.designation}{" "}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="overline">Date of Joining</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="overline">
                : {state.date_of_joining}{" "}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="overline">Pay Period</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="overline">: {state.month} </MDTypography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <MDTypography variant="overline">Pay Date</MDTypography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MDTypography variant="overline">: {state.date} </MDTypography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={5}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                width: "75%",
                border: "0.5px solid black",
                boxShadow: "none",
              }}
            >
              <MDBox p={2}>
                <MDTypography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {`₹${parseFloat(netpayValue)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </MDTypography>
                <MDTypography variant="button">Employee Net Pay</MDTypography>
                <Divider />

                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="overline">Paid Days</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="overline">
                      : {state.emp_salary[0].num_of_days}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="overline">LOP Days</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="overline">
                      : {state.lop}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container mb={2}>
        {/* {renderedData} */}
      </Grid>
      <Card
        sx={{
          width: "100%",
          border: "0.1px solid #616161",
          boxShadow: "none",
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <MDBox p={1}>
          <Grid container>
            {Earning}
            <Grid item xs={12} sm={0.5}>
              <Divider orientation="vertical" />
            </Grid>
            {Deductions}
          </Grid>
          <Divider />
          {deductionandearnings}
          <Divider />
        </MDBox>
      </Card>
      <Card
        sx={{
          width: "100%",
          border: "0.1px solid #616161",
          boxShadow: "none",
          margin: "auto",
        }}
      >
        <MDBox p={1}>
          <Grid container>
            <Grid item xs={12} sm={10}>
              <MDTypography variant="body2" sx={{ fontWeight: "bold" }}>
                TOTAL NET PAYABLE
              </MDTypography>
              <MDTypography variant="overline">
                Gross Earnings - Total Deductions
              </MDTypography>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={2}
              justifyContent="center"
              alignItems="center"
            >
              <MDTypography
                variant="body2"
                sx={{ fontWeight: "bold", textAlign: "right" }}
              >
                {`₹${parseFloat(netpayValue)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
      <Divider />

      <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
        <MDTypography variant="overline">
          -- This is a system-generated payslip, hence the signature is not
          required. --
        </MDTypography>
      </Grid>
    </MDBox>
  );
};

export default Paylips_details;
