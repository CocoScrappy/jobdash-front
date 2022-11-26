import { useState, useEffect } from "react";
import Layout from "components/Layout";
import UserCV from "components/UserCV";
import axios from "axios";

const MyCVPage = () => {
  const [UserCVInfo, setUserCVInfo] = useState();
  const [PageMsg, setPageMsg] = useState("");

  const getUserCV = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_cvs/`, {
        headers: {
          email: "johndoes@gmail.ca",
        },
      })
      .then((response) => {
        // console.log(response);
        setUserCVInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getUserCV, []);
  if(UserCVInfo != null) {
  return (
    <Layout title="AuthSite | MyCVPage" content="MyCV Page">
      {/* {console.log(UserCVInfo)} */}
      <h2>My CV</h2>
      <hr />
      
      <UserCV cv={UserCVInfo} />
    </Layout>
  );
}
};
export default MyCVPage;
