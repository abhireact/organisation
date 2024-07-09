import React, { useEffect, useRef } from "react";
import { Card, Divider, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import Switch from "@mui/material/Switch";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import MDButton from "components/MDButton";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import PaylipsDetails from "./Payslips_details";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
const token = Cookies.get("token");
import { useLocation } from "react-router-dom";
// import numberToWords from "number-to-words"; //  npm install number-to-words
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: any) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const Payslips = () => {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [payslipData, setPayslipData] = useState({});
  const [loadingButton, setLoadingButton] = useState(false);

  const { state } = useLocation();
  let totalearnings = 0;
  let totaldeduction = 0;

  let Earning = (
    <Grid item xs={12} sm={6} mb={2}>
      <MDTypography variant="h6">Eanings</MDTypography>
      <Divider />
      <React.Fragment>
        <Grid container>
          {state.emp_salary[0].earnings.map((item: any, index: any) => {
            const monthly_amount = parseFloat(
              String(item.monthly_amount).replace(/₹|,/g, "")
            );
            totalearnings += monthly_amount;

            return (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={8}>
                  <MDTypography variant="body2">
                    {item.earnings_name}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                  <MDTypography variant="body2">
                    {item.monthly_amount}
                  </MDTypography>
                  {index < state.emp_salary[0].earnings.length - 1 && (
                    <Divider />
                  )}
                </Grid>
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
          const monthly_amount = parseFloat(
            String(item.monthly_amount).replace(/₹|,/g, "")
          );
          totaldeduction += monthly_amount;

          return (
            <React.Fragment key={index}>
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
                {index < state.emp_salary[0].pre_tax.length - 1 && <Divider />}
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Grid>
  );

  let deductuinandearnings = (
    <Grid container>
      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total Earnings</MDTypography>
      </Grid>
      <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
        <MDTypography variant="h6">
          {`₹${totalearnings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={0.5}></Grid>

      <Grid item xs={12} sm={3}>
        <MDTypography variant="h6">Total Deductions</MDTypography>
      </Grid>
      <Grid item xs={12} sm={2.5} sx={{ textAlign: "right" }}>
        <MDTypography variant="h6">
          {`₹${totaldeduction
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
        </MDTypography>
      </Grid>
    </Grid>
  );
  const netpayValue = (totalearnings - totaldeduction).toFixed(2);

  useEffect(() => {
    const searchData = new URLSearchParams(location.search).get("data");

    if (searchData) {
      try {
        const dataObject = JSON.parse(decodeURIComponent(searchData));
        setPayslipData(dataObject);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  const downloadPDF = async () => {
    const doc = new jsPDF("p", "pt", "a4");
    const div = document.getElementById("componentToDownload");

    try {
      const canvas = await html2canvas(div);

      const imgWidth = 600; // Adjust the width as needed
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL("image/png");

      doc.addImage(contentDataURL, "PNG", 0, 0, imgWidth, imgHeight);

      doc.save("Payslip.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle the error accordingly (e.g., show a user-friendly message)
    }
  };

  const componentref = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentref.current,
    onAfterPrint: () => {
      console.log("Printed successfully!");
    },
  });

  const handleHide = () => {
    const element = document.getElementById("elementID");
    setIsHidden(!isHidden);

    if (element) {
      element.style.display = isHidden ? "block" : "none";
    }
  };

  const renderedPayslip = loading ? <PaylipsDetails /> : null;

  const rendereDownload = loadingButton ? (
    <MDTypography sx={{ textAlign: "right", color: "blue" }}>
      <MDButton
        variant="text"
        color="info"
        className="download-button"
        onClick={downloadPDF}
      >
        <FileDownloadOutlinedIcon fontSize="inherit" />
        Download
      </MDButton>
      <MDButton
        variant="text"
        color="info"
        onClick={handlePrint}
        className="print_button"
      >
        <LocalPrintshopOutlinedIcon fontSize="inherit" /> print
      </MDButton>
    </MDTypography>
  ) : null;

  //converted the amount number to word
  // const amountInWords = numberToWords.toWords(Number(netpayValue));

  //PieChart Datas
  const data = [
    { label: "Gross Pay", value: totalearnings },
    { label: "Deductions", value: totaldeduction },
  ];

  //PieChart sizing
  const sizing = {
    margin: { right: 5 },
    width: 150,
    height: 150,
    legend: { hidden: true },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3}>
        <Grid container>
          <Grid item xs={12} sm={2.5}>
            <Card
              sx={{
                width: "95%",
                mt: "5",
                margin: "auto",
                backgroundColor: "#e8eaf6",
              }}
            >
              <MDBox p={2}>
                <MDTypography
                  variant="subtitle1"
                  sx={{ color: "#01579b", fontWeight: "bold" }}
                >
                  {state.month}
                </MDTypography>

                <MDTypography variant="body2">
                  Take Home:
                  {`₹${parseFloat(netpayValue)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={9.5}>
            <Card sx={{ width: "100%", mt: "5", margin: "auto" }}>
              <MDBox p={4}>
                <Grid container>
                  <Grid item xs={12} sm={3.5}>
                    <Grid container>
                      <PieChart
                        series={[{ data, innerRadius: 50 }]}
                        {...sizing}
                      >
                        <PieCenterLabel>{state.month}</PieCenterLabel>
                      </PieChart>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={8.5}>
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <MDTypography variant="h5">
                          Take Home :
                          {`₹${parseFloat(netpayValue)
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          <StarRateRoundedIcon style={{ color: "#69f0ae" }} />
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {rendereDownload}
                      </Grid>
                    </Grid>

                    <Grid container mt={2}>
                      <Grid item xs={12} sm={3}>
                        <MDTypography variant="body2">Deductions</MDTypography>
                        <MDTypography variant="h6">
                          {`₹${totaldeduction
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}{" "}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <MDTypography variant="body2">Gross Pay</MDTypography>
                        <MDTypography variant="h6">
                          {`₹${totalearnings
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <MDTypography variant="h5" sx={{ fontWeight: "bold" }}>
                      Payslip Details
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDTypography variant="body2" sx={{ textAlign: "right" }}>
                      Show in PDF mode
                      <Switch
                        name="loading"
                        color="info"
                        onChange={() => {
                          setLoading(!loading);
                          setShowDetails(!showDetails);
                          handleHide();
                          setLoadingButton(!loadingButton);
                        }}
                      />
                    </MDTypography>
                  </Grid>
                </Grid>

                {showDetails && (
                  <MDBox>
                    <Grid container>
                      <Grid container mt={3}>
                        {Earning}
                        <Grid item xs={12} sm={0.5}>
                          <Divider orientation="vertical" />
                        </Grid>
                        {Deductions}
                      </Grid>
                      <Divider />
                      {deductuinandearnings}
                      <Divider />

                      <Grid container mt={2} mb={1}>
                        <Grid item xs={12} sm={8}>
                          <MDTypography variant="body2">
                            Your Take Home Salary Amount (Net Pay)
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                          <MDTypography variant="caption">
                            Net Pay = Total Earnings - Total Deductions
                          </MDTypography>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <MDTypography sx={{ fontWeight: "bold" }}>
                          {`₹${parseFloat(netpayValue)
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                        </MDTypography>

                        {/* <Grid item xs={12} sm={12}>
                          <MDTypography variant="overline">
                            {`Indian Rupee : ${
                              amountInWords.charAt(0).toUpperCase() + amountInWords.slice(1)
                            } Rupees only`}
                          </MDTypography>
                        </Grid> */}

                        <Divider />
                      </Grid>
                    </Grid>
                  </MDBox>
                )}

                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Card
                      sx={{
                        width: "100%",
                        margin: "auto",
                        boxShadow: "none",
                      }}
                      ref={componentref}
                      className="actual-receipt"
                    >
                      {renderedPayslip}
                      {rendereDownload}
                    </Card>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Payslips;
