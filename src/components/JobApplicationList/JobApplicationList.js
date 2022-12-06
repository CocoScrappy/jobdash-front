import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import JobApplicationItem from "./JobApplicationItem";
import {
  fetchUserApplications,
  paginationNavigator,
  jumpToPaginationItem,
  searchList,
} from "../../helpers/Utils";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
// css
import "../../css/components/SearchForm.css";

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
    jumpToPaginationItem({
      apiBaseUrl: "api/applications/get_user_applications",
      itemNumber: applicationNumber,
      dataSetter: setJobApplications,
      paginationLinksSetter: setPaginationLinks,
    });
  };

  const navigate = useNavigate();

  const searchApplications = (data) => {
    setSearchMsg("");
    setSearchMsgStyle("");
    // const searchString = data.search;
    if (data.searchString === "") {
      setToggleState((t) => !t);
      return;
    }
    searchList({
      apiBaseUrl: "api/applications/search",
      data: data,
      dataSetter: setJobApplications,
      responseMsgSetter: setSearchMsg,
      responseMsgStyleSetter: setSearchMsgStyle,
    });
  };

  const resetSearch = () => {
    setSearchMsg("");
    setToggleState((t) => !t);
  };

  const handleReset = (e) => {
    const value = e.target.value;
    if (value === "") resetSearch();
  };

  return (
    <>
      <div className="pb-5">
        {/* <h2>Job Applications ({paginationLinks.count})</h2> */}
        <Formik
          initialValues={{ searchString: "" }}
          onSubmit={searchApplications}
        >
          <Form
            onChange={handleReset}
            className="border search-form-jobdash shadow-lg"
          >
            {/* <label htmlFor="searchString">Search</label> */}
            <div>
              <div className="search-icon">
                <i class="bi bi-search"></i>
              </div>
              <Field
                id="searchString"
                name="searchString"
                placeholder="Job title or keyword"
                className="w-100"
              />
            </div>
            <button type="submit">Search</button>

            {/* Now calls reset when input is empty instead <button className="me-2" type="reset" onClick={resetSearch}>
              Reset
            </button> */}
          </Form>
        </Formik>
        <span className={searchMsgStyle}>{searchMsg}</span>
      </div>

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
