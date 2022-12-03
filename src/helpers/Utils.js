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
        favorited: response.data.favorited,
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
