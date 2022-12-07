import React from "react";
import { useId } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

//icons
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
//custom
import Tag from "./Tag";
//zustand
import useStore from "store";
//css
import "../css/components/CardSkeleton.css";

export default function SkeletonCards() {
  var uId = useStore((state) => state.id);
  var uRole = useStore((state) => state.role);
  const uuid = useId();

  const divs = [1, 2, 3, 4, 5, 6, 7, 8];
  const randomDate = Date.now() + Math.random();

  const renderSkeleton = () => {
    return (
      <div
        key={uuid}
        className="skt_card p-4 card-job d-flex flex-column justify-content-between"
        style={{
          cursor: "pointer",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <div className="d-flex flex-column">
          {/* <img src={t.logo_url} /> */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div
              style={{
                fontSize: "2rem",
                backgroundColor: "var(--color-dark-gray)",
                color: "white",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
            >
              <i className="bi bi-buildings" style={{ color: "inherit" }}></i>
            </div>
            <p className="m-0 small card-date skt_short"></p>
          </div>
          <h3 className="skt_long"></h3>
          <p className="skt_short"></p>
          <p className="skt_short"></p>
          <p className="skt_long"></p>
        </div>
        {/* display crud only for owner of posts */}
        {uRole === "employer" && (
          <div
            style={{
              display: "flex",
              placeItems: "center",
              gap: 15,
            }}
          >
            <div
              style={{
                cursor: "pointer",
              }}
            >
              <h5>
                <MdEdit />
                Edit
              </h5>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
            >
              <h5>
                <MdDelete />
                Delete
              </h5>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
            >
              <h5>
                <BsPersonLinesFill />
                Applicants
              </h5>
            </div>
          </div>
        )}
        {uRole === "user" && (
          <Button
            variant="dark"
            className="skt_btn btn-jobdash btn-change-text"
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              color="white"
            />{" "}
          </Button>
        )}
      </div>
    );
  };

  return divs.map(renderSkeleton);
}
