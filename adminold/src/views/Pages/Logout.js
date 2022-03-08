import React from "react";
import { logoutMe } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Logout = () => {
	const history = useHistory();
	console.log("hello Logout");
	const dispatch = useDispatch();
	React.useEffect(() => {
		console.log("hello brother");
		dispatch(logoutMe());
		history.push("/auth/signin");
	}, []);
	return <div>Logout...</div>;
};

export default Logout;
