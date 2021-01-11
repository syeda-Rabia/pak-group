import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  console.log("Current ", currentPage);
  console.log("itemsCount ", itemsCount);
  console.log("pageSize ", pageSize);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  props.show(pagesCount);

  //  const [ SelectedBtn , setSelectedbtn]  = React.useState('btn1');

  return (
    <nav>
      {/* <Button onClick={() =>setSelectedbtn('btn1')} style={{backgroundColor: SelectedBtn=="btn" ?'dardkBlie':'second '}} /> */}

      <ul className="pagination">
        <li class="page-item">
          <a
            id="pagelink"
            class="page-link"
            onClick={() => {
              const page = currentPage + 1;
              onPageChange(page);
            }}
          >
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              id="pagelink"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li class="page-item">
          <a id="pagelink" class="page-link" onClick={() => onPageChange()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
