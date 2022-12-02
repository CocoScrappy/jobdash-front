// css
import "../css/layouts/Banners.css";
import girlwithcomp from "../assets/girlwithcomp.jpeg";

const LargeBannerLayout = ({ children }) => (
  <div className="container-fluid large-banner d-flex h-100">
    <img
      alt="user avatar"
      src={girlwithcomp}
      // width="35"
      // height="35"
      // className="rounded-circle avatar"
    />
    <div className="container">{children}</div>
  </div>
);

export default LargeBannerLayout;
