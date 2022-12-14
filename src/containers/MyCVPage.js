import { useState, useEffect } from "react";
import Layout from "layouts/MainLayout";
import UserCV from "components/UserCV/UserCV";
import axios from "axios";
import useStore from "store";
import GenericPageLayout from "layouts/GenericPageLayout";
import FlashAlert from "components/FlashAlert";

const MyCVPage = () => {
  const [UserCVInfo, setUserCVInfo] = useState(null);
  const [pageMsg, setPageMsg] = useState("");
  const [pageMsgStyle, setPageMsgStyle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const userId = useStore((state) => state.id);

  const getUserCV = () => {
    setPageMsg("");
    setPageMsgStyle("");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_cvs/`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("atoken") },
      })
      .then((response) => {
        setUserCVInfo(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setUserCVInfo({ name: "Default CV", content: "" });
        // console.log(UserCVInfo)
      });
  };

  useEffect(getUserCV, []);
  // if (UserCVInfo == null) {
  //   return (
  //     <Layout title="AuthSite | MyCVPage" content="MyCV Page">
  //       <h2>My CV</h2>
  //       <hr />
  //       <p>don't have a CV yet? create a new one</p>
  //       <Button variant="primary" onClick={() => {}}></Button>
  //       {/* <UserCV cv={UserCVInfo} setPageMsg={setPageMsg} setPageMsgStyle={setPageMsgStyle} setUserCVInfo={setUserCVInfo}/> */}
  //     </Layout>
  //   );
  // }
  if (UserCVInfo != null) {
    return (
      <Layout
        title="JOBDASH - My CV"
        content="Build your CV"
        color="var(--color-gray)"
      >
        <GenericPageLayout>
          <h2>Build your CV, look good on paper.</h2>
          <p>
            We'll send this out to employers when you apply for jobs, so keep it
            current.
          </p>
          {/* Alert */}
          {showAlert && (
            <FlashAlert
              msg={pageMsg}
              variant={pageMsgStyle}
              setShowAlert={setShowAlert}
            />
          )}

          <UserCV
            cv={UserCVInfo}
            setPageMsg={setPageMsg}
            setPageMsgStyle={setPageMsgStyle}
            setShowAlert={setShowAlert}
            setUserCVInfo={setUserCVInfo}
          />
        </GenericPageLayout>
      </Layout>
    );
  }
};
export default MyCVPage;
