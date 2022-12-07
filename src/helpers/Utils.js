/**
 * A list of utility functions to be used on multiple occassions in the project
 */
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

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
      // console.log(response.data);
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
      // console.log(response);
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
      // if (error.response.data.detail) {
      //   if (
      //     error.response.data.detail ===
      //     "Given token not valid for any token type"
      //   ) {
      //   }
      // }
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
      // console.log(response);
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
      // console.log(response.data);
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
      // console.log(response.data);
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
      // console.log("Notes updated successfully");
      // console.log(response.data);
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
      // console.log(response);
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

/**
 * jump to a pagination item
 * @param {*} param0
 */
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
      // console.log(response);
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

/**
 * Search a table in the database using a search string
 * @param {} param0
 */
export const searchList = ({
  apiBaseUrl,
  data,
  dataSetter,
  responseMsgSetter,
  responseMsgStyleSetter,
}) => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/${apiBaseUrl}/`, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("atoken"),
      },
    })
    .then((res) => {
      // console.log(res.data);
      dataSetter(res.data);
      responseMsgSetter(res.data.length + " results found");
      responseMsgStyleSetter("text-success");
    })
    .catch((err) => {
      console.log(err);
      responseMsgSetter(err.response.data.message);
      responseMsgStyleSetter("text-danger");
      dataSetter(err.response.data.data);
    });
};

export const getSavedDateInfo = ({ dateId, dataSetter }) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/dates/${dateId}/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("atoken"),
      },
    })
    .then((response) => {
      // console.log(response);
      dataSetter(response.data);
    })
    .catch((error) => {
      if (error.response.data) {
        console.log(error.response.data.message);
      }
      console.log(error);
    });
};

/**
 * Create new date in applications details page
 * @param {*} param0
 */
export const postNewDate = ({
  dateInfo,
  dataSetter,
  parentSetter,
  parentObject,
  msgSetter,
}) => {
  console.log(dateInfo);
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/dates/`, dateInfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("atoken"),
      },
    })
    .then((response) => {
      msgSetter(
        "Successfully created on: " +
          format(new Date(), "MMM dd, yyyy, h:mm:ss aa")
      );
      dataSetter(response.data);
      console.log(parentObject);
      let newApplicationDates = parentObject.saved_dates;
      newApplicationDates.push(response.data);
      // console.log(newApplicationDates);
      parentSetter({
        ...parentObject,
        saved_dates: newApplicationDates,
      });
      // console.log(props.applicationInfo);
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};

/**
 * update saved date on application info page
 * @param {*} param0
 */
export const updateSavedDate = ({
  dateId,
  dateInfo,
  msgSetter,
  applicationInfo,
  setApplicationInfo,
}) => {
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/dates/${dateId}/`, dateInfo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("atoken"),
      },
    })
    .then((response) => {
      msgSetter(
        "Successfully updated on: " +
          format(new Date(), "MMM dd, yyyy, h:mm:ss aa")
      );
      let newApplicationDates = applicationInfo.saved_dates.map((date) => {
        console.log(date.id === dateInfo.id);
        if (date.id === dateInfo.id) {
          return dateInfo;
        }
        return date;
      });
      console.log(newApplicationDates);
      setApplicationInfo({
        ...applicationInfo,
        saved_dates: newApplicationDates,
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};

/**
 * delete saved date using id
 * @param {*} dateId
 */
export const deleteSavedDate = (dateId) => {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/api/dates/${dateId}/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("atoken"),
      },
    })
    .then((response) => {
      window.location.reload(false);
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};

export const deleteApplication = ({ applicationId, navigate }) => {
  axios
    .delete(
      `${process.env.REACT_APP_API_URL}/api/applications/${applicationId}/`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      }
    )
    .then((response) => {
      navigate("/jobapplications");
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        console.log(error);
      }
    });
};

export const NewLine = function (props) {
  const text = props.text;
  const newText = text.split("\n").map((str) => <p>{str}</p>);
  return newText;
};
