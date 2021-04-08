import React from "react";
import { Link } from "react-router-dom";
import "./InventorySidebar.css";
export default function InventorySidebar() {
  return (
    <div
      style={{
        height: "86vh",
        // border: '2px solid blue',
      }}
    >
      <Link to="/admin/add-category" className="add-project">
        Add Project Category
      </Link>

      <Link to="/admin/inventory" className="add-project">
        Project List
      </Link>
      <Link to="/admin/viewable" className="add-project">
        Viewable
      </Link>
      <Link to="/admin/employee-request" className="add-project">
        Employee Requests
      </Link>
    </div>
  );
}
