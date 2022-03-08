// import React from "react";
// import Navbar from "./global-components/navbar-v2";
// import PageHeader from "./global-components/page-header2";
// import Profile from "./section-components/profile";
// import Footer from "./global-components/footer-v2";

// const ProfileComponent = () => {
//   return (
//     <div>
//       <Navbar />
//       {/* <PageHeader headerimg="assets/img/blog.jpeg" /> */}
//       <Profile />
//       <Footer />
//     </div>
//   );
// };

// export default ProfileComponent;
import React from "react";
import Navbar from "./global-components/navbar-v2";
import PageHeader from "./global-components/page-header2";
import Footer from "./global-components/footer-v2";
import Profile from "./profile-components/profile";

const ProfileComponent = () => {
  return (
    <div>
      <Navbar />
      {/* <PageHeader headertitle="About Us" headerimg="assets/img/about.png" /> */}
      {/* <PageHeader headerimg="assets/img/about.png" /> */}
      <Profile />
      <Footer />
    </div>
  );
};

export default ProfileComponent;
