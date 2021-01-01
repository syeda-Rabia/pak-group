import React from 'react';
import { Link } from 'react-router-dom';
import './InventorySidebar.css';
export default function InventorySidebar() {
  return (
    <div
      style={{
        height: '100vh',
        // border: '2px solid blue',
      }}
    >
      <Link to="/" className="add-project">
        Add Project Category
      </Link>

      <Link to="/admin/inventory/add" className="add-project">
        Add Project
      </Link>
      <Link to="/admin/viewable" className="add-project">
        Viewable
      </Link>
    </div>
  );
}
