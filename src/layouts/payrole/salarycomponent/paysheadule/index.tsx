import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CreatePaysheadule from "layouts/payrole/salarycomponent/paysheadule/create_paysheadule";
import CreateAndShowPaysheadule from "layouts/payrole/salarycomponent/paysheadule/edit_and_show_paysheadule";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";

const token = Cookies.get("token");
function CreatePage() {
  const [pagestatus, setPageStatus] = useState("create");
  const fetchData = async () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/mg_payschedule`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setPageStatus("edit");
        })
        .catch((error) => {
          message.error(error.response.data.detail);
        });
    } catch (error) {
      console.log("location not found");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {pagestatus === "create" ? (
        <CreatePaysheadule />
      ) : pagestatus === "edit" ? (
        <CreateAndShowPaysheadule />
      ) : null}
    </DashboardLayout>
  );
}

export default CreatePage;
