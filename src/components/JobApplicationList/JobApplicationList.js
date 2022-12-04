import React, { useState, useEffect, useRef } from "react";
import JobApplicationItem from "./JobApplicationItem";
import { fetchUserApplications } from "../../helpers/Utils";
import { Formik, Field, Form } from "formik";
import axios from "axios";

function JobApplicationList(props) {
  const [jobApplications, setJobApplications] = useState([]);
  const [toggleState, setToggleState] = useState(false);
  const [searchMsg, setSearchMsg] = useState("");
  const [searchMsgStyle, setSearchMsgStyle] = useState("");

  useEffect(() => fetchUserApplications({ setJobApplications }), [toggleState]);

  const searchApplications = (data) => {
    setSearchMsg("");
    setSearchMsgStyle("");
    // const searchString = data.search;
    if (data.searchString === "") {
      setToggleState((t) => !t);
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/applications/search/`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setJobApplications(res.data);
        setSearchMsg(res.data.length + " results found");
        setSearchMsgStyle("text-success");
      })
      .catch((err) => {
        console.log(err);
        setSearchMsg(err.response.data.message);
        setSearchMsgStyle("text-danger");
        setJobApplications(err.response.data.data);
      });
  };

  const resetSearch = () => {
    setSearchMsg("");
    setToggleState((t) => !t);
  };

  return (
    <>
      <h3>Search by Keyword</h3>
      <Formik
        initialValues={{ searchString: "" }}
        onSubmit={searchApplications}
      >
        <Form>
          <label htmlFor="searchString">Search</label>
          <Field
            id="searchString"
            name="searchString"
            placeholder="Search Applications..."
            className="mx-3"
          />
          <button type="submit" className="mx-3">
            Search
          </button>
          <button className="me-2" type="reset" onClick={() => resetSearch()}>
            Reset
          </button>
          <span className={searchMsgStyle}>{searchMsg}</span>
        </Form>
      </Formik>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Remote Option</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Liked</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map((application) => (
            <JobApplicationItem
              application={application}
              key={application.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default JobApplicationList;
