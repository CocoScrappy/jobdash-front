import { useState } from "react";
import { updateFavoritedStatus } from "../../helpers/Utils";
import Heart from "react-heart";
import { useNavigate } from "react-router-dom";

const JobApplicationItem = ({ application }) => {
  const navigate = useNavigate();

  const [applicationInfo, setApplicationInfo] = useState(application);

  var ISODate = new Date(applicationInfo.application_date);
  var shortDate = ISODate.toLocaleDateString();

  function redirectToInfoPage() {
    navigate(`/jobapplications/application/${applicationInfo.id}`, {
      application: applicationInfo,
    });
  }

  return (
    <tr key={applicationInfo.id}>
      <td onClick={() => redirectToInfoPage()}>
        {applicationInfo.job_posting.title}
      </td>
      <td onClick={() => redirectToInfoPage()}>
        {applicationInfo.job_posting.company}
      </td>
      <td onClick={() => redirectToInfoPage()}>
        {applicationInfo.job_posting.remote_option}
      </td>
      <td onClick={() => redirectToInfoPage()}>{shortDate}</td>
      <td onClick={() => redirectToInfoPage()}>{applicationInfo.status}</td>
      <td style={{ width: "1.5rem" }}>
        <Heart
          style={{ cursor: "default" }}
          isActive={applicationInfo.favorited}
          onClick={() =>
            updateFavoritedStatus({
              applicationInfo: applicationInfo,
              setApplicationInfo,
            })
          }
        />
      </td>
    </tr>
  );
};

export default JobApplicationItem;
