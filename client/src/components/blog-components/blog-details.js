import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comments from "./comments";
import Sidebar from "./sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../reducers/authReducer";
import { GET_BLOG_BY_ID } from "../../reducers/propertyReducer";
import { baseUrl } from "../../config/baseUrl";
import moment from "moment";
const BlogDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.property);
  console.log("imagesofBLog", blog);

  const [data, setData] = useState({});

  useEffect(() => {
    setData(blog);
  }, [blog]);

  useEffect(() => {
    dispatch(GET_BLOG_BY_ID(id));
  }, [dispatch, id]);
  useEffect(() => {
    const $ = window.$;

    $(".footer-area.style-two").removeClass("mg-top-100");
  }, []);

  console.log("Data", blog);
  let publicUrl = process.env.PUBLIC_URL + "/";
  let imagealt = "image";

  if (loading) {
    return (
      <div className="property-page-area pd-top-120 pd-bottom-90 ">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-12 col-12 text-center">
              {" "}
              <i
                className="fa fa-spinner fa-spin"
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  color: "black",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="single-blog-page pd-top-120 go-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="blog-details-page-inner pb-lg-5">
              <div className="single-blog-inner bg-none">
                <div className="details p-0 border-bottom mb-4 pb-3">
                  {/* <div className="cat">
                    <a href="#">Business</a>
                  </div> */}
                  <h3>{blog?.title}</h3>
                  <ul className="meta-inner">
                    <li>
                      <img
                        src={publicUrl + "assets/img/icon/1.png"}
                        alt="img"
                      />
                      By Admin
                    </li>
                    {/* <li>
                      <img
                        src={publicUrl + "assets/img/icon/2.png"}
                        alt="img"
                      />{" "}
                      Marce 9 , 2020
                    </li> */}
                    <li>
                      <img
                        src={publicUrl + "assets/img/icon/3.png"}
                        alt="img"
                      />
                      {moment(blog?.createdAt).format("LL")}
                    </li>
                  </ul>
                </div>
                <div className="thumb">
                  <img
                    src={`${baseUrl}/${blog?.images?.[0]?.path}`}
                    alt="img"
                  />
                </div>
                <div className="details p-0 pt-3">
                  <p>{blog?.description}</p>
                  {/* <p>
                    Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                    consectetur et adipisicing eiLorem ipsum dolor sit amet,
                    consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                    consectetur et adipisicing eiLorem ipsum dolor sit amet,
                    consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  </p> */}
                  {/* <audio className="single-audio-inner" controls>
                    <source
                      src="http://vjs.zencdn.net/v/oceans.mp4"
                      type="audio/ogg"
                    />
                    <source
                      src="http://vjs.zencdn.net/v/oceans.mp4"
                      type="audio/mpeg"
                    />
                  </audio> */}
                  {/* <h3 className="mt-5">Dolor Sit Amet Lorem </h3> */}
                  {/* <blockquote className="blockquote">
                    <img src={publicUrl + "assets/img/icon/7.png"} alt="img" />
                    <p>
                      Lorem ipsum dolor sit amet et adipisicing eiLo elit, sed
                      do eiusmod tempor incididunt ut nisi ut aliquip ex ea
                      commodo consequat.
                    </p>
                    <span>Sandara Mrikon</span>
                  </blockquote> */}
                  {/* <p>
                    Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                    consectetur et adipisicing eiLorem ipsum dolor sit amet,
                    consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                    consectetur et adipisicing eiLorem ipsum dolor sit amet,
                    consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  </p> */}
                </div>
                {/* <div className="meta">
                  <div className="row"> */}
                {/* <div className="col-sm-6">
                      <div className="tags">
                        <a href="#">Treands</a>
                        <a href="#">Inttero</a>
                        <a href="#">Estario</a>
                      </div>
                    </div> */}
                {/* </div>
                </div> */}
                {/* <Comments />
                <form className="blog-comment-form">
                  <div className="section-title style-small mb-4 mt-5">
                    <h3 className="mb-0">Comments</h3>
                    <p>
                      Your Email addres not be published adipisicing elit, sed*
                    </p>
                  </div>
                  <div className="row custom-gutters-20">
                    <div className="col-lg-4">
                      <label className="single-input-inner style-bg-border">
                        <input type="text" placeholder="Name" />
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <label className="single-input-inner style-bg-border">
                        <input type="text" placeholder="Email" />
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <label className="single-input-inner style-bg-border">
                        <input type="text" placeholder="Website" />
                      </label>
                    </div>
                    <div className="col-12">
                      <label className="single-input-inner style-bg-border">
                        <textarea placeholder="Message" defaultValue={""} />
                      </label>
                    </div>
                    <div className="col-12">
                      <label className="input-check-e">
                        <input type="checkbox" />
                        Save my name , email, website for the next time comment
                      </label>
                    </div>
                    <div className="col-12 mb-4">
                      <button className="btn btn-base">SUBMIT</button>
                    </div>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
          {/* <Sidebar /> */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
