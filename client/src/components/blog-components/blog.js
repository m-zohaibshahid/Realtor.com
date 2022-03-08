import moment, { max } from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../config/baseUrl";
import { useHistory } from "react-router-dom";
const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const history = useHistory();
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  //   const $ = window.$;

  //   $("body").addClass("body-bg");

  let publicUrl = process.env.PUBLIC_URL + "/";
  // let imagealt = "image";

  const getData = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${baseUrl}/blog/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res data", res.data);
        setLoading(false);
        setBlog(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
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
    <div className="blog-page-area" style={{ backgroundColor: "#F2F3F5" }}>
      <div className="container pt-4">
        {/* <div className="row justify-content-center">
          <div className="col-12">
            <div className="product-search-inner bg-main">
              <div className="row custom-gutters-20">
                <div className="col-md-3 align-self-center">
                  <h5>{blog?.length} Properties</h5>
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
          </div>
        </div> */}
        <div className="row">
          {blog?.length > 0 &&
            blog?.map((item, index) => (
              <div className="col-lg-6" key={index}>
                <div className="single-blog-inner">
                  <div className="thumb">
                    <Link to={`/blog-details/${item?._id}`}>
                      <img
                        src={`${baseUrl}/${item?.images?.[0]?.path}`}
                        alt="img"
                        height={300}
                        width={620}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>

                  <div className="details">
                    <h3>
                      <Link to={`/blog-details/${item?._id}`}>
                        {item?.title}
                      </Link>
                    </h3>
                    <ul className="meta-inner">
                      <li>
                        <img
                          src={publicUrl + "assets/img/icon/1.png"}
                          alt="img"
                        />{" "}
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
                        {moment(item?.createdAt).format("LL")}
                      </li>
                    </ul>
                    <p>{item?.description.substring(0, 54)}</p>
                    <div className="row">
                      <div className="col-7">
                        <div className="author-inner">
                          <img
                            src={publicUrl + "assets/img/blog/author1.png"}
                            alt="img"
                          />
                          <span>By Admin</span>
                        </div>
                      </div>
                      <div className="col-5 align-self-center text-right">
                        <Link
                          className="read-more"
                          to={`/blog-details/${item?._id}`}
                        >
                          Read More <i className="la la-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* <Sidebar /> */}
        </div>
      </div>
    </div>
  );
};

export default Blog;
