import { useState, useEffect } from "react";
import Layout from "components/Layout";
import UserCV from "components/UserCV";
import axios from "axios";

const MyCVPage = () => {
  const [UserCVInfo, setUserCVInfo] = useState();
  const [pageMsg, setPageMsg] = useState("");
  const [pageMsgStyle, setPageMsgStyle] = useState("");

  const getUserCV = () => {
    setPageMsg("");
    setPageMsgStyle("");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_cvs/`, {
        headers: {
          email: "johndoes@gmail.ca",
        },
      })
      .then((response) => {
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
      <h2>My CV</h2>
      <hr />
      <p className="${pageMsg}"></p>
      <UserCV cv={UserCVInfo} setPageMsg={setPageMsg} setPageMsgStyle={setPageMsgStyle} setUserCVInfo={setUserCVInfo}/>
    </Layout>
  );
}
};
export default MyCVPage;
