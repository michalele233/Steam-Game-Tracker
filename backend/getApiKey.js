import AWS from "aws-sdk";

const ssm = new AWS.SSM({
	region: "eu-north-1",
});

async function getApiKey() {
	const params = {
		Name: "SteamApiKey",
		WithDecryption: true,
	};
	const response = await ssm.getParameter(params).promise();
	return response.Parameter.Value;
}

const result = await getApiKey();
export default result;
