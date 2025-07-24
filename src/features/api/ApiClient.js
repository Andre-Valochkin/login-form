import axios from "axios";

const ApiClient = axios.create({
	baseURL: "https://europe-west3-egosys-dev.cloudfunctions.net",
	headers: {
		"Content-Type": "application/json",
	},
});

export default ApiClient;