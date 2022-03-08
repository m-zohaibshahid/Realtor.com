import React from "react";
import Navbar from "./global-components/navbar-v2";
import Chat from "./chat-components/ChatInbox/ChatInbox";
const BlogPage = (props) => {
  return (
    <div>
      <Navbar />
      {/* <PageHeader headertitle="CHAT" headerimg="assets/img/blog.jpeg" /> */}
      <Chat />
    </div>
  );
};

export default BlogPage;
