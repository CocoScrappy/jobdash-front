// css
import "../css/layouts/Banners.css";
import girlwithcomp from "../assets/girlwithcomp.jpeg";

const LargeBannerLayout = ({ children, header }) => (
  <div className="large-banner d-flex flex-column flex-lg-row h-100">
    <img
      alt="Woman sitting on the floor of her living room with a laptop"
      src={girlwithcomp}
    />
    <div className="py-4 px-0 p-lg-4 container-fluid layout-content">
      <h1 className="text-center text-sm-start mb-3">{header}</h1>
      {children}
    </div>
  </div>
);

export default LargeBannerLayout;
