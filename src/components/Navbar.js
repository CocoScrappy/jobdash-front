import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useStore from "store";

const Navbar = () => {
  const uId=useStore(state=>state.id);
  var isAuthenticated= uId===-1?false:true;

  const [authState,setAuthState]=useState(isAuthenticated);

  const addId=useStore(state=>state.addId);
  const addEmail=useStore(state=>state.addEmail);
  const addFirstName=useStore(state=>state.addFirstName);
  const addLastName=useStore(state=>state.addId);

  const logout= event=>{
    setAuthState(false);
    addId(-1);
    addEmail("");
    addFirstName("");
    addLastName("");
    localStorage.clear();
  }

  useEffect(()=>{},[authState])

  const authLinks = (
    <>
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item ">
        <Link className="nav-link" href="#" onClick={logout}>
          LogOut
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cv">
          CV
        </Link>
      </li>
    </>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Auth Site
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {authState ? authLinks : guestLinks}
          {/* {authLinks}
          {guestLinks} */}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
