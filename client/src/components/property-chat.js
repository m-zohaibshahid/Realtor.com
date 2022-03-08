import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header";
import PropertyGrid from "./section-components/propertiesShow";
import Footer from "./global-components/footer-v2";
import { useParams } from "react-router-dom";
import ChatPage from "./chat-components/ChatInbox/ChatPage";

const PropertyChat = () => {
  const { listingType, address } = useParams();
  return (
    <div>
      <Navbar />
      {/* <PageHeader
        headertitle={`Property Chat`}
        headerimg="assets/img/home3.png"
      /> */}
      <div className="pd-top-100 pb-4">
        <ChatPage address={address} />
      </div>
      <Footer />
    </div>
  );
};

export default PropertyChat;
