import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import SplashScreen from "./components/global-components/SplashScreen";
import Network from "./components/networks/network";
const HomeV1 = lazy(() => import("./components/home-v1"));
// import HomeV1 from "./components/home-v1";
const HomeV2 = lazy(() => import("./components/home-v2"));
// import HomeV2 from "./components/home-v2";
const HomeV3 = lazy(() => import("./components/home-v3"));
// import HomeV3 from "./components/home-v3";
const ProptertyDetails = lazy(() => import("./components/property-details"));
// import ProptertyDetails from "./components/property-details";
const PropertyGrid = lazy(() => import("./components/properties"));
// import PropertyGrid from "./components/properties";
const SearchResult = lazy(() => import("./components/search-result"));
// import SearchResult from "./components/search-result";
const PropertyData = lazy(() => import("./components/MyPropertyLists"));
// import PropertyData from "./components/MyPropertyLists";
const Property = lazy(() => import("./components/property"));
// import Propterty from "./components/property";
const About = lazy(() => import("./components/about"));
// import About from "./components/about";
const Team = lazy(() => import("./components/team"));
// import Team from "./components/team";
const SignIn = lazy(() => import("./components/sign-in"));
// import SignIn from "./components/sign-in";
const SignUp = lazy(() => import("./components/sign-up"));
// import SignUp from "./components/sign-up";
const AddProperty = lazy(() => import("./components/add-property"));
const AddPropertyRent = lazy(() => import("./components/addPropertyRent"));
// import AddProperty from "./components/add-property";
const Contact = lazy(() => import("./components/contact"));
// import Contact from "./components/contact";
const Blog = lazy(() => import("./components/blog"));
// import Profile from "./components/profile";
const Profile = lazy(() => import("./components/profile"));
// import Blog from "./components/blog";
const Services = lazy(() => import("./components/services"));
// import Services from "./components/services";
const Chat = lazy(() => import("./components/chat"));
// import Chat from "./components/chat";
const ChatPage = lazy(() => import("./components/property-chat"));
// import ChatPage from "./components/property-chat";
const Faq = lazy(() => import("./components/faq"));
// import Faq from "./components/faq";
const BlogDetails = lazy(() => import("./components/blog-details"));
// import BlogDetails from "./components/blog-details";
// import ResetPassword from "./Auth/pages/ForgotPassword/ResetPassword";
const SendEmail = lazy(() => import("./Auth/pages/ForgotPassword/SendEmail"));
// import SendEmail from "./Auth/pages/ForgotPassword/SendEmail";
const HouseTiming = lazy(() => import("./components/houseTiming.js"));
// import SendEmail from "./Auth/pages/ForgotPassword/SendEmail";
const WaitingState = lazy(() =>
  import("./Auth/pages/ForgotPassword/WaitingState")
);
const paymentSuccess = lazy(() =>
  import("./components/section-components/paymentSuccess")
);
// import WaitingState from "./Auth/pages/ForgotPassword/WaitingState";
// import paymentSuccess from "./components/section-components/paymentSuccess";
export default function App() {
  return (
    <HashRouter basename="/">
      <Suspense fallback={<SplashScreen />}>
        <Switch>
          <Route exact path="/" component={HomeV1} />
          <Route path="/home-v2" component={HomeV2} />
          <Route path="/home-v3" component={HomeV3} />
          <Route path="/property-details/:id" component={ProptertyDetails} />
          <Route path="/properties/:listingType" component={PropertyGrid} />
          <Route path="/my/properties/:listingType" component={PropertyData} />
          {/* <Route path="/property/search" component={SearchResult} /> */}
          <Route path="/search/filter" component={SearchResult} />
          <Route exact path="/property" component={Property} />
          <Route path="/about" component={About} />
          <Route path="/house-timing" component={HouseTiming} />
          <Route path="/team" component={Team} />
          <Route path="/team" component={WaitingState} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route
            path="/add-property/:types/:listingType/:id"
            component={AddProperty}
          />{" "}
          <Route path="/add-property/rent" component={AddPropertyRent} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog} />
          <Route path="/profile" component={Profile} />
          <Route path="/services" component={Services} />
          <Route path="/chat" component={Chat} />
          <Route path="/payment/success" component={paymentSuccess} />
          <Route path="/property/chat/:id/:address" component={ChatPage} />
          <Route path="/faq" component={Faq} />
          <Route path="/blog-details/:id" component={BlogDetails} />
          <Route path="/reset/forgotPassword/1/step" component={SendEmail} />
          <Route path="/err-conection" component={Network} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
