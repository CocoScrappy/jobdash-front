// css
import "../css/layouts/Banners.css";
import girlwithcomp from "../assets/girlwithcomp.jpeg";

const LargeBannerLayout = ({ children, header }) => (
  <div className="container-fluid large-banner d-flex flex-column flex-lg-row h-100">
    <img
      alt="user avatar"
      src={girlwithcomp}
      // width="35"
      // height="35"
      // className="rounded-circle avatar"
    />
    <div className="py-4 px-0 p-lg-4 container-fluid layout-content">
      <h1 className="text-center text-sm-start mb-3">{header}</h1>
      {children}
    </div>
  </div>
);

export default LargeBannerLayout;
