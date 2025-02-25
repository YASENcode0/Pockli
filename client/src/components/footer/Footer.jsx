import React, { useEffect, useState } from "react";
import "./footer.css";
import { IoMdWallet } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdOutlineViewKanban } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export default function Footer() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = window.location.pathname;
    console.log(pathName);
    setCurrentPage(pathName);
  }, [navigate]);

  return (
    <div className="footer">
      <div
        onClick={() => {
          navigate("/");
        }}
        className={`${currentPage === "/" && "footer-btn-selected"}`}
      >
        <span>
          <MdOutlineViewKanban />
        </span>
        <h3>Overview</h3>
      </div>
      <div
        onClick={() => {
          navigate("all");
        }}
        className={`${currentPage === "/all" && "footer-btn-selected"}`}
      >
        <span>
          <IoMdWallet />
        </span>
        <h3>All</h3>
      </div>
      <div
        onClick={() => {
          navigate("settings");
        }}
        className={`${currentPage === "/settings" && "footer-btn-selected"}`}
      >
        <span>
          <IoMdSettings />
        </span>
        <h3>Settings</h3>
      </div>
    </div>
  );
}
