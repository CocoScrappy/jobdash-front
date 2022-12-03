import { updateFavoritedStatus } from "../helpers/Utils";

export default renderListGroupItem = (application) => {
  // change date format
  var ISODate = new Date(application.application_date);
  var shortDate = ISODate.toLocaleDateString();

  function redirectToInfoPage() {
    navigate(`/jobapplications/application/${application.id}`, {
      application: application,
    });
  }

  const [applicationInfo, setApplicationInfo] = useState(application);

  return (
    <tr key={application.id}>
      <td onClick={() => redirectToInfoPage()}>
        {application.job_posting.title}
      </td>
      <td onClick={() => redirectToInfoPage()}>
        {application.job_posting.company}
      </td>
      <td onClick={() => redirectToInfoPage()}>
        {application.job_posting.remote_option}
      </td>
      <td onClick={() => redirectToInfoPage()}>{shortDate}</td>
      <td onClick={() => redirectToInfoPage()}>{application.status}</td>
      <td style={{ width: "1.5rem" }}>
        <Heart
          style={{ cursor: "default" }}
          ref={likeBtn}
          key={application.id}
          isActive={application.favorited}
          onClick={() => setIsLiked(application.id)}
        />
      </td>
    </tr>
  );
};
