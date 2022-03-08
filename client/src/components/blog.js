import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header2";
import Blog from "./blog-components/blog";
import Footer from "./global-components/footer-v2";

const BlogPage = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headerimg="assets/img/blog.jpeg" />
      <Blog />
      <Footer />
    </div>
  );
};

export default BlogPage;
