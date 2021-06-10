import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import React, { Component } from "react";
import "./SignInFooter.css";
class Footer extends Component {
  render() {
    return (
      <div>
        <div className="row ">
          <div
            className=" col-lg-6 col-sm-12   footer-link text-primary  "
            style={{ fontSize: "16px" }}
          >
            <p
              className=" text1"
              style={{
                color: "#2258BF",
                wordSpacing: "-2px",
              }}
            >
              PakGroup © 2020 Copyright by
              <a
                style={{
                  color: "#2258BF",
                }}
                href="#"
              >
                <strong> PakGroup.</strong>
              </a>{" "}
              All Rights Reserved.
            </p>
            <p
              className=" text1"
              style={{
                color: "#2258BF",
                wordSpacing: "-2px",
              }}
            >
              Powered By 
              <a
                style={{
                  color: "#2258BF",
                }}
                href="https://technovier.com/"
              >
                <strong>Technovier</strong>
              </a>{" "}
            
            </p>
          </div>
          <div className="col-lg-6 col-sm-12 flx footer-link item w-100">
            <div className=" footer-icon item w-100">
              <div className="item">
                <ul className="list-unstyled list-inline item flx1">
                  <li className="list-inline-item">
                    <a className="btn-floating btn-sm rgba-white-slight "    href="https://www.facebook.com/pakgroup.com.pk">
                      <button className="bg-transparent  button-focus"  ></button>
                    <FacebookIcon />
                    </a>
                  </li>
                  <li className="list-inline-item mr-2">
                  <a className="btn-floating btn-sm rgba-white-slight "    href="https://www.instagram.com/pakgroup.pakestates/">
                      <button className="bg-transparent  button-focus"  ></button>
                    <InstagramIcon />
                    </a>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
         </div>
    );
  }
}
export default Footer;
