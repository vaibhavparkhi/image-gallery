import React from "react";
import { useLocation } from "react-router";

const ImageDetails = () => {
  const { state } = useLocation();
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div className="mb-2">
              <img className="w-100" src={state.webformatURL} alt="" />
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="col-lg-4 col-md-4">
            <div className="row">
              <div>
                <img src={state.userImageURL} className="image-user"></img>
              </div>

              <div>
                <h5 className="font-weight-normal">{state.user}</h5>
              </div>
              <br />
            </div>
            <div className="row clearfix">
              <div>
                <span className="btn btn-warning gallary-icon">
                  {" "}
                  <i className="fa fa-tag"></i> {state.tags}
                </span>
                <span className="btn btn-primary gallary-icon">
                  {" "}
                  <i className="fa fa-eye"></i> {state.views}
                </span>
              </div>
              <span className="btn btn-success ga-btn-success gallary-icon">
                {" "}
                <i className="fas fa-download"></i> {state.downloads}
              </span>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageDetails;
