import useStore from "store";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

function UserProtectedRoute() {
  const uId = useStore((state) => state.id);

  if (uId !== "" && uId !== -1) {
    console.log("uId= " + uId);
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
}

export default UserProtectedRoute;
