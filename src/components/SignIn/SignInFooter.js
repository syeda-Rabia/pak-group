import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './SignInFooter.css';
import { Container } from 'react-bootstrap';
import img from "./../../assests/fb-logo.svg";
import img2 from './../../assests/tiwtr-logo.svg';
import img3 from "./../../assests/tum-logo.svg";
import img4 from "./../../assests/g-logo.svg";
class Footer extends Component {
  render() {
    return (
      <div>
        <div className="row ">
          <div
            className="footer-link text-primary   "
            style={{ fontSize: '16px' }}
          >
            <div className="ml-5 mb-5">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms and Conditions</a>
              <a href="#">Help</a>
              <a href="#">PakGroup Licenses</a>
              <a href="#">Partners</a>
            </div>
          </div>
          <div className="footer-language text-primary">
            <label for="language">LANGUAGE:</label>
            <select name className="language border-0" id="language">
              <option value="English">ENGLISH</option>
              <option value="Urdu">URDU</option>
              <option value="Parsian">PARSIAN</option>
              <option value="Hindi">HINDI</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div class="col-md-6 col-lg-6">
            <p
              className="ml-5 "
              style={{ color: 'blue', wordSpacing: '-2px', fontSize: '15px' }}
            >
              PakGroup © 2020 Copyright by
              <a href="#">
                <strong> PakGroup.</strong>
              </a>{' '}
              All Rights Reserved.
            </p>
          </div>
          <div class=" footer-icon">
            <div class="text-right text-md-right">
              <ul className="list-unstyled list-inline ">
                <li class="list-inline-item">
                  <a class="btn-floating btn-sm rgba-white-slight mx-1">
                    <img src={img} />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="btn-floating btn-sm rgba-white-slight mx-1">
                    <img src={img2} />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="btn-floating btn-sm rgba-white-slight mx-1">
                    +
                    <img src={img3} />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a class="btn-floating btn-sm rgba-white-slight mx-1">
                    <img src={img4} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
