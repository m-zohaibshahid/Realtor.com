import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import PropertiesCard from "../PropertiesCard/PropertiesCard";
import { useHistory } from "react-router-dom";
import {
  GET_RENT_PROPERTY,
  GET_SALE_PROPERTY,
} from "../../reducers/propertyReducer";

const PropertyGrid = () => {
  const dispatch = useDispatch();
  // const [sale, setSale] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [rent, setRent] = useState([]);
  // const [sale, setSale] = useState([]);
  // const [allProperties, setAllProperties] = useState([]);
  // const [newStatus, setNewStatus] = useState(false);
  const { loading, RentProperty, SaleProperty } = useSelector(
    (state) => state.property
  );
  const { listingType } = useParams();
  const history = useHistory();
  // let publicUrl = process.env.PUBLIC_URL + "/";
  useEffect(() => {
    listingType == "rent" ? getDataRent() : getDataSale();
  }, [listingType]);

  const getDataRent = async () => {
    dispatch(GET_RENT_PROPERTY());
  };
  const getDataSale = async () => {
    dispatch(GET_SALE_PROPERTY());
  };
  useEffect(() => {
    listingType == "rent" ? setDataRent() : setDataSale();
  }, [listingType, RentProperty, SaleProperty]);
  const setDataRent = async () => {
    setRent(RentProperty);
  };

  const setDataSale = async () => {
    setRent(SaleProperty);
  };
  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div className="blog-page-area pd-top-120 ">
      <div className="container-sm">
        {/* <div className="col-lg-12 col-md-6  text-center ">
          <h2 style={{ color: "transparent" }}>..</h2>
        </div> */}
        {/* <div className="col-12">
            <div className="product-search-inner bg-main">
              <div className="row custom-gutters-20">
                <div className="col-md-3 align-self-center">
                  <h5>{rent?.length} Properties</h5>
                </div>
                <div className="col-md-6 mt-2 mt-md-0"></div>
                <div className="col-md-3 mt-2 mt-md-0 align-self-center">
                  <div className="col-md-12 align-self-center">
                    <h5 onClick={history.goBack} style={{ cursor: "pointer" }}>
                      Go Back
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        <div className="row">
          {loading ? (
            <div className="col-md-12 col-12 text-center  pd-top-120  pd-bottom-150 ">
              <span className="text-center">
                {" "}
                <i
                  className="fa fa-spinner fa-spin"
                  style={{
                    fontSize: "15px",
                    marginRight: "5px",
                    color: "black",
                  }}
                ></i>
              </span>
            </div>
          ) : rent?.length > 0 ? (
            rent?.map(
              (item, index) => (
                // item.propertyStatus == "approved" && (
                <PropertiesCard property={item} key={index} />
              )
              // )
            )
          ) : (
            <div className="col-md-12 col-12 text-center pd-top-120 pd-bottom-120">
              No property found!
            </div>
          )}
        </div>{" "}
        {/* <div
            className="pagination-area text-center mt-4"
            style={{ width: "100%" }}
          >
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="la la-angle-double-left" />
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="la la-angle-double-right" />
                </a>
              </li>
            </ul>
          </div> */}
      </div>
    </div>

    // <div className="blog-page-area pt-5 go-top">
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-12">
    //         <div className="product-search-inner bg-main">
    //           <div className="row custom-gutters-20">
    //             <div className="col-md-3 align-self-center">
    //               <h5>21 Properties</h5>
    //             </div>
    //             <div className="col-md-6 mt-2 mt-md-0">
    //               <div className="widget-search">
    //                 <div className="single-search-inner">
    //                   <input type="text" placeholder="Search your keyword" />
    //                   <button>
    //                     <i className="la la-search" />
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-md-3 mt-2 mt-md-0 align-self-center">
    //               <div className="single-select-inner">
    //                 <select>
    //                   <option value={1}>Sort By</option>
    //                   <option value={2}>Sort By</option>
    //                   <option value={3}>Sort By</option>
    //                 </select>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div>
    //         {rent?.length > 0 ? (
    //           rent?.map((item, index) => (
    //             <PropertiesCard property={item} key={index} />
    //           ))
    //         ) : (
    //           <div className="text-center mt-4">No property found!</div>
    //         )}
    //       </div>

    //       <div
    //         className="pagination-area text-center mt-4"
    //         style={{ width: "100%" }}
    //       >
    //         <ul className="pagination">
    //           <li className="page-item">
    //             <a className="page-link" href="#">
    //               <i className="la la-angle-double-left" />
    //             </a>
    //           </li>
    //           <li className="page-item active">
    //             <a className="page-link" href="#">
    //               1
    //             </a>
    //           </li>
    //           <li className="page-item">
    //             <a className="page-link" href="#">
    //               2
    //             </a>
    //           </li>
    //           <li className="page-item">
    //             <a className="page-link" href="#">
    //               3
    //             </a>
    //           </li>
    //           <li className="page-item">
    //             <a className="page-link" href="#">
    //               ...
    //             </a>
    //           </li>
    //           <li className="page-item">
    //             <a className="page-link" href="#">
    //               <i className="la la-angle-double-right" />
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PropertyGrid;
