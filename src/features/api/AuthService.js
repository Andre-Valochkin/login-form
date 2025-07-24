import ApiClient from "./ApiClient";

export const FetchOrganizations = async (email) => {
	const res = await ApiClient.post("/SignInOrgs", { email });
	return res.data?.data.orgs ?? [];
};

export const SignIn = async ({ email, password, orgId }) => {
	const res = await ApiClient.post("/SignIn", {
		email,
		password,
		orgId,
	});
	return res.data;
};