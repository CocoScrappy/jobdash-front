import React, { useState, useEffect, useRef } from "react";
import JobApplicationItem from "./JobApplicationItem";
import {
  fetchUserApplications,
  paginationNavigator,
} from "../../helpers/Utils";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { set } from "date-fns";

function JobApplicationList(props) {
  const [jobApplications, setJobApplications] = useState([]);
  const [toggleState, setToggleState] = useState(false);
  const [searchMsg, setSearchMsg] = useState("");
  const [searchMsgStyle, setSearchMsgStyle] = useState("");
  const [paginationLinks, setPaginationLinks] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(
    () => fetchUserApplications({ setJobApplications, setPaginationLinks }),
    [toggleState]
  );

  const jumpToApplication = (data) => {
    const applicationNumber = data.applicationNumber - 1;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/applications/get_user_applications/?limit=10&offset=${applicationNumber}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
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
        console.log(error);
      });
  };

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
      <h2>Job Applications ({paginationLinks.count})</h2>
      <hr />
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
      <div className="row my-3">
        <nav aria-label="Page navigation" className="col-4">
          <ul className="pagination">
            <li
              className={
                paginationLinks.previous === null
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() =>
                  paginationNavigator({
                    url: paginationLinks.previous,
                    dataSetter: setJobApplications,
                    paginationLinksSetter: setPaginationLinks,
                  })
                }
              >
                Previous
              </a>
            </li>
            <li
              className={
                paginationLinks.next === null
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() =>
                  paginationNavigator({
                    url: paginationLinks.next,
                    dataSetter: setJobApplications,
                    paginationLinksSetter: setPaginationLinks,
                  })
                }
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        <div className="col">
          <Formik
            initialValues={{ applicationNumber: 1 }}
            onSubmit={jumpToApplication}
          >
            <Form>
              <label htmlFor="applicationNumber">Jump to application</label>
              <Field
                id="applicationNumber"
                name="applicationNumber"
                type="number"
                max={paginationLinks.count}
                min="1"
                // placeholder="jump to Application..."
                className="mx-3"
              />
              <button type="submit" className="mx-3">
                Jump
              </button>
              <button
                className="me-2"
                type="reset"
                onClick={() => resetSearch()}
              >
                Reset
              </button>
              {/* <span className={searchMsgStyle}>{searchMsg}</span> */}
            </Form>
          </Formik>
        </div>
      </div>
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
