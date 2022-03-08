// import React, { useEffect, useState } from "react";
// // import Table from "../../modules/Partials/DataTables";
// // import SplashScreen from "../../modules/Partials/SplashScreen";
// // import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { customStyles } from "components/CustomStyles";
// import DataTable from "react-data-table-component";
// import { getTransactions } from "helpers/transaction";
// // import Edit from "./Edit";
// // import moment from "moment";
// // import Delete from "./Delete";
// // import { toggleButton } from "../../reducers/authReducer";
// // import { data } from "../Products/Data";
// // import { getOrder } from "../../helpers/order";
// import {
//   Button,
//   Grid,
//   useColorModeValue,
//   Box,
//   Heading,
//   Text,
//   Stack,
//   Image,
//   GridItem,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import { baseUrl } from "../../config/baseUrl";
// // import StatusUpdate from "./StatusUpdate";
// // import OrderItems from "./OrderItems";
// toast.configure();
// // export const orders = [
// //   {
// //     _id: "1",
// //     name: "Tasty Pizza",
// //     size: "Large",
// //     price: "1499",
// //   },
// //   {
// //     _id: "2",
// //     name: "Tasty Burger",
// //     size: "Medium",
// //     price: "1399",
// //   },
// // ];
// const Order = () => {
//   const dispatch = useDispatch();
//   const [hide, setHide] = useState(false);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [transactions, setTransactions] = React.useState([]);
//   const [totalTransactions, setTotalTransactions] = React.useState(82);
//   const [isDataLoading, setIsDataLoading] = React.useState(false);
//   const [offset, setOffset] = React.useState(0);

//   useEffect(() => {
//     console.log("tran");
//     getAllTransactions();
//   }, []);
//   const getAllTransactions = async () => {
//     try {
//       await getTransactions().then((data) => {
//         console.log("dataddddd", data);
//         if (data) {
//           setTransactions(data?.result);
//           setIsLoading(false);
//           setTotalTransactions(data?.length);
//         } else {
//           setIsLoading(false);
//         }
//       });
//     } catch (error) {
//       toast.error(error, {
//         autoClose: 3000,
//       });
//     }
//   };

//   const columns = [
//     {
//       name: "Payer Name",
//       selector: "",
//       sortable: true,
//       width: "150px",
//       cell: (row, index) => (
//         <p>
//           {row?.transactionId?.details?.payer?.name?.given_name}{" "}
//           {row?.transactionId?.details?.payer?.name?.surname}
//         </p>
//       ),
//     },
//     {
//       name: "Payer Email",
//       selector: "",
//       sortable: true,
//       width: "220px",
//       cell: (row, index) => (
//         <p>{row?.transactionId?.details?.payer?.email_address}</p>
//       ),
//     },
//     {
//       name: "House Type",
//       selector: "buildingType",
//       sortable: true,
//       width: "120px",
//       //   cell: (row, index) => <p>{row?.customerId?._id}</p>,
//     },
//     {
//       name: "Price of Property",
//       selector: "priceOfProperty",
//       sortable: true,
//       width: "150px",
//       // cell: (row, index) => <p>{row??.name}</p>,
//     },
//     {
//       name: "Payer Id",
//       selector: "",
//       sortable: true,
//       width: "160px",
//       cell: (row, index) => (
//         <p>{row?.transactionId?.details?.payer?.payer_id}</p>
//       ),
//     },
//     ,
//     {
//       name: "Merchant Id",
//       selector: "",
//       sortable: true,
//       width: "160px",
//       cell: (row, index) => (
//         <p>
//           {row?.transactionId?.details?.purchase_units[0]?.payee?.merchant_id}
//         </p>
//       ),
//     },
//     {
//       name: "Transaction Date",
//       selector: "",
//       sortable: true,
//       width: "170px",
//       cell: (row, index) => <p>{row?.transactionId?.details?.create_time}</p>,
//     },
//     {
//       name: "Payment Verification",
//       selector: "",
//       sortable: true,
//       width: "120px",
//       cell: (row, index) => <p>{row?.transactionId?.paymentVerified}</p>,
//     },
//   ];
//   // const toggleFun = () => {
//   //   setHide(!hide);
//   //   dispatch(toggleButton(hide));
//   // };

//   return (
//     <Box marginTop="140px">
//       <Grid my={12}>
//         <Box>
//           <Text>Transactions</Text>
//           <Text>Transactions available here</Text>
//         </Box>
//         {/* <Box className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
//               <button
//                 type="button"
//                 class="btn btn-primary"
//                 style={{ float: "right", margin: "0 0 20px 0" }}
//                 onClick={() => handleAddShow()}
//               >
//                 Add Order
//               </button>
//             </Box>*/}
//         {/* </Link> */}
//         {isLoading ? (
//           <center>{/* <SplashScreen /> */}</center>
//         ) : (
//           <Box>
//             <DataTable
//               paginationDefaultPage={offset === 0 ? 1 : offset}
//               columns={columns}
//               data={transactions}
//               customStyles={customStyles}
//               pagination
//               fixedHeader
//               paginationServer
//               paginationComponentOptions={{
//                 noRowsPerPage: 10,
//               }}
//               onChangePage={(page) => setOffset(page)}
//               paginationTotalRows={totalTransactions}
//               expandableRows
//               // onRowExpandToggled={(bol, row) => viewManageData(row)}
//               // expandableRowExpanded={(row) => row._id === rowId}
//               // expandableRowsComponent={
//               //   <ViewManage
//               //     manageData={manageData}
//               //     organizationData={organizationData}
//               //     manageLoading={manageLoading}
//               //   />
//               // }
//             />
//           </Box>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default Order;
