/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Mindcom Group (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Header(): JSX.Element {
  return (
    <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            Order Details
          </MDTypography>
        </MDBox>
        <MDTypography component="p" variant="button" color="text">
          Order no. <b>241342</b> from
          <b>23.02.2021</b>
        </MDTypography>
        <MDTypography
          component="p"
          variant="button"
          fontWeight="regular"
          color="text"
        >
          Code: <b>KF332</b>
        </MDTypography>
      </MDBox>
      <MDButton variant="gradient" color="dark">
        invoice
      </MDButton>
    </MDBox>
  );
}

export default Header;
