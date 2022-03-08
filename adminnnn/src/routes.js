// import
import Dashboard from "views/Dashboard/Dashboard.js";
import ForRent from "views/Properties/ForRent/ForRent.js";
import ForSale from "views/Properties/ForSale/ForSale.js";
// import Billing from "views/Dashboard/Billing.js";
import Blog from "views/Blog/Blog.js";
import Contact from "views/Contact.js";
// import Transaction from "views/Transaction/Transaction.js";

// import Profile from "views/Dashboard/Profile.js";
import Logout from "views/Pages/Logout.js";
// import Searchs from "views/SearchFilter/SearchProperty";
import NewListing from "views/Properties/NewListing";
import Search from "views/Properties/Search";

// import SignIn from "views/Pages/SignIn";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import { AttachmentIcon, SearchIcon } from "@chakra-ui/icons";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/properties/forRent",
    name: "Rent Property",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: ForRent,
    layout: "/admin",
  },
  {
    path: "/properties/forSale",
    name: "Sale Property",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: ForSale,
    layout: "/admin",
  },
  {
    path: "/new-listing",
    name: "New Listing",
    rtlName: "آرتيإل",
    icon: <AttachmentIcon color="inherit" />,
    component: NewListing,
    layout: "/admin",
  },
  {
    path: "/blog",
    name: "Blog",
    rtlName: "آرتيإل",
    icon: <SupportIcon color="inherit" />,
    component: Blog,
    layout: "/admin",
  },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   rtlName: "آرتيإل",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Contact,
  //   layout: "/admin",
  // },

  // {
  //   path: "/Updatestatus",
  //   name: "Update Status",
  //   rtlName: "آرتيإل",
  //   icon: <StatsIcon color="inherit" />,

  //   component: UpdateStatus,
  //   layout: "/admin",
  // },
  {
    path: "/search",
    name: "Search",
    rtlName: "آرتيإل",
    icon: <SearchIcon color="inherit" />,
    component: Search,
    layout: "/admin",
  },

  // {
  //   path: "/transaction",
  //   name: "Transaction",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: Transaction,
  //   layout: "/admin",
  // },
  // {
  //   path: "/",
  //   name: "Logout",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   // component: RTLPage,
  //   layout: "/logout",
  // },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   rtlName: "لوحة القيادة",
      //   icon: <PersonIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   component: Profile,
      //   layout: "/admin",
      // },
      // {
      //   path: "/logout",
      //   name: "Logout",
      //   rtlName: "لوحة القيادة",
      //   icon: <DocumentIcon color="inherit" />,
      //   component: Logout,
      //   layout: "/admin",
      // },
      {
        path: "/",
        name: "Logout",
        rtlName: "آرتيإل",
        icon: <DocumentIcon color="inherit" />,
        // component: RTLPage,
        layout: "/logout",
      },
      // {
      //   path: "/signin",
      //   name: "Sign In",
      //   rtlName: "لوحة القيادة",
      //   icon: <DocumentIcon color="inherit" />,
      //   component: SignIn,
      //   layout: "/admin",
      // },
    ],
  },
];
export default dashRoutes;
