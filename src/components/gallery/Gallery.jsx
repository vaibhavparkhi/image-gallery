import React, { useEffect, useState } from "react";

import "./Gallery.css";

import { getPhotos } from "../../services";
import { useHistory } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]); // loaded images state
  //
  const [pagination, setPagination] = useState({
    currentPage: 1,
    imagePerPage: 10,
  });

  const [active, setActive] = useState("1");

  const history = useHistory();

  // init loading of service
  useEffect(async () => {
    const response = await getPhotos();
    setImages(response.data.hits);
    setActive(parseInt("1"));
  }, []);

  //
  const indexOfLastImage = () => {
    return pagination.currentPage * pagination.imagePerPage;
  };

  const indexOfFirstImage = () => {
    return indexOfLastImage() - pagination.imagePerPage;
  };

  const currentImages = () => {
    return images.slice(indexOfFirstImage(), indexOfLastImage());
  };

  //return page numbers
  const pageNumbers = () => {
    let totalPageumber = Math.ceil(images.length / pagination.imagePerPage);
    let pageNumbers = [];
    for (let i = 1; i <= totalPageumber; i++) {
      pageNumbers.push({ id: i - 1, label: i });
    }
    return pageNumbers;
  };

  // on click load the particular page and load images
  const onClickPageNumber = (evt) => {
    setActive(parseInt(evt.target.innerText));
    setPagination({
      currentPage: parseInt(evt.target.innerText),
      imagePerPage: 10,
    });
  };

  // on click next >>>
  const onClickNext = (evt) => {
    let totalPageumber = Math.ceil(images.length / pagination.imagePerPage);
    let currentPage = pagination.currentPage;
    console.log(totalPageumber + " " + currentPage);
    if (currentPage < totalPageumber) {
      currentPage++;
    }
    setActive(parseInt(currentPage));
    setPagination({
      currentPage: currentPage,
      imagePerPage: 10,
    });
  };
  // on click previous <<<
  const onClickPrevious = (evt) => {
    let totalPageumber = Math.ceil(images.length / pagination.imagePerPage);
    let currentPage = pagination.currentPage;
    console.log(totalPageumber + " " + currentPage);
    if (currentPage > 1) {
      currentPage--;
    }
    setActive(parseInt(currentPage));
    setPagination({
      currentPage: currentPage,

      imagePerPage: 10,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {images.length > 0 && (
            <div id="grid" className="row">
              {currentImages().map((item) => (
                <Link
                  to={{
                    pathname: "/imgdetails",
                    state: item,
                  }}
                  key={item.id}
                  className="mix col-sm-3 page1 page4 margin30"
                >
                  <div>
                    <div className="item-img-wrap ">
                      <img
                        src={item.webformatURL}
                        className="img-responsive"
                        alt="workimg"
                        // width={item.previewWidth}
                        // height={item.previewHeight}
                      />

                      <div className="item-img-overlay">
                        <span href="#" className="show-image">
                          <span></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {images.length == 0 && <div>Loading...</div>}
        </div>
      </div>
      {images.length > 0 && (
        <div className="row gallery-bottom">
          <div className="col-sm-6">
            <ul className="pagination">
              <li>
                <a
                  href="#"
                  aria-label="Previous"
                  id="preBtn"
                  onClick={onClickPrevious}
                >
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {pageNumbers().map((item, index) => (
                <li
                  className={active === item.label ? "active" : ""}
                  key={index}
                >
                  <span onClick={onClickPageNumber}>{item.label}</span>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  aria-label="Next"
                  id="nextBtn"
                  onClick={onClickNext}
                >
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gallery;
