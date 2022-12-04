/**
 * A list of utility functions to be used on multiple occassions in the project
 */
import axios from "axios";
import { format, parseISO } from "date-fns";

/**
 * update favorited status
 * @param {*} param0
 */
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
export const fetchUserApplications = ({
  setJobApplications,
  setPaginationLinks,
}) => {
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
      setPaginationLinks({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
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

/**
 * get application status and set state in current page
 * @param {*} param0
 */
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

/**
 * update application status
 * @param {*} param0
 */
export const updateApplicationStatus = ({
  updatedStatus,
  applicationId,
  setApplicationInfo,
  setStatusMsg,
  applicationInfo,
}) => {
  console.log(updatedStatus);
  axios
    .patch(
      `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/`,
      { status: updatedStatus },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      setStatusMsg(`Application status updated to: ${updatedStatus}`);
      console.log(response.data);
      setApplicationInfo({
        ...applicationInfo,
        status: updatedStatus,
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
 * update application notes
 * @param {*} param0
 */
export const updateApplicationNotes = ({
  applicationId,
  convertedContent,
  applicationInfo,
  setApplicationInfo,
  setNotesMsg,
}) => {
  // console.log(updatedStatus);
  axios
    .patch(
      `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/`,
      { notes: convertedContent },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      console.log("Notes updated successfully");
      console.log(response.data);
      setApplicationInfo({
        ...applicationInfo,
        notes: response.data.notes,
      });
      setNotesMsg(
        "Notes successfully updated on " +
          format(new Date(), "MMM dd, yyyy, h:mm:ss aa")
      );
      // setNotesMsgStyle("text-success");
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};

/**
 * Pagination navigation
 * @param {*} url
 */
export const paginationNavigator = ({
  url,
  dataSetter,
  paginationLinksSetter,
}) => {
  axios
    .get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("atoken"),
      },
    })
    .then((response) => {
      console.log(response);
      dataSetter(response.data.results);
      paginationLinksSetter({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    })
    .catch((error) => {
      if (error.response.data && error.response.status === 404) {
        dataSetter(error.response.data.data);
      }
      console.log(error);
    });
};

export const jumpToPaginationItem = ({
  apiBaseUrl,
  itemNumber,
  dataSetter,
  paginationLinksSetter,
}) => {
  console.log(apiBaseUrl);
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/${apiBaseUrl}/?limit=10&offset=${itemNumber}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      console.log(response);
      dataSetter(response.data.results);
      paginationLinksSetter({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      });
    })
    .catch((error) => {
      if (error.response.data && error.response.status === 404) {
        dataSetter(error.response.data.data);
      }
      console.log(error);
    });
};