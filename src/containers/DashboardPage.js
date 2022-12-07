//react imports
import { useState, useEffect } from "react";

//custom imports
import Layout from "layouts/MainLayout";
import DashboardLayout from "layouts/DashboardLayout";
//data imports
import axios from "axios";
import useStore from "store";

const DashboardPage = () => {
  const [cv, setCv] = useState({});
  const [applications, setApplications] = useState([]);

  //stats
  const [favorited, setFavorited] = useState(0);
  const [pending, setPending] = useState(0);
  const [upcoming, setUpcoming] = useState(0);
  const [offers, setOffers] = useState(0);

  var userFirstName = useStore((state) => state.first_name);
  var userLastName = useStore((state) => state.last_name);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dashboard`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      })
      .then((res) => {
        setCv({ ...res.data.cv });

        setApplications([...res.data.applications]);
        console.log([...res.data.applications]);
        console.log(applications);
        // console.log("cv");
        // console.log(cv);
        // console.log("application0");
        try {
          res.data.applications.forEach((a) => {
            if (a.status === "offer") {
              setOffers(offers + 1);
            }
            if (a.status === "applied") {
              setPending(pending + 1);
            }
            if (a.favorited === true) {
              setFavorited(favorited + 1);
            }

            setUpcoming(upcoming + 1);
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Layout
      title="JOBDASH - Dashboard"
      content="Dashboard Page"
      color="var(--color-gray)"
    >
      <DashboardLayout>
        <h1>
          {userFirstName} {userLastName}
        </h1>
        <h3>Upcoming Dates</h3>
        <p>offers: {offers}</p>
        <p>pending: {pending}</p>
        <p>favorited: {favorited}</p>
        <p>upcoming: {upcoming}</p>
      </DashboardLayout>
    </Layout>
  );
};
export default DashboardPage;
