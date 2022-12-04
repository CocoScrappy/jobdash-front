/**
 * A list of utility functions to be used on multiple occassions in the project
 */
import axios from "axios";

export const updateFavoritedStatus = ({
  applicationInfo,
  setApplicationInfo,
}) => {
  const updatedStatus = !applicationInfo.favorited;
  // console.log(updatedStatus);
  axios
    .patch(
      `${process.env.REACT_APP_API_URL}/api/applications/${applicationInfo.id}/`,
      { favorited: updatedStatus },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      console.log("favorited status updated");
      console.log(response.data);
      setApplicationInfo({
        ...applicationInfo,
        favorited: updatedStatus,
      });
      // console.log(applicationInfo.favorited);
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};

/**
 * A function that gets the job applications of the currently loggedin user
 */
export const fetchUserApplications = ({ setJobApplications }) => {
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/applications/get_user_applications/`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      setJobApplications(response.data.results);
    })
    .catch((error) => {
      if (error.response.data && error.response.status === 404) {
        setJobApplications(error.response.data.data);
      }
      console.log(error);
    });
};

/**
 * A function that gets applicationInfo (by ID) and set the applicationInfo State of the current page
 * @param {*} param0
 */
export const getApplicationInfo = ({ applicationId, setApplicationInfo }) => {
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/details/`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      setApplicationInfo(response.data);
    })
    .catch((error) => {
      if (error.response.data && error.response.status === 404) {
        setApplicationInfo(error.response.data.data);
      }
      console.log(error);
    });
};

export const getStatusOptions = ({ setStatusOptions }) => {
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/applications/get_status_options/`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setStatusOptions(response.data);
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};
