//problem z API KEY chuj wie jak to zrobic
import AWS from "aws-sdk";

const ssm = new AWS.SSM({
	region: "eu-north-1",
});

async function getApiKey() {
	const params = {
		Name: "SteamApiKey",
		WithDecryption: true,
	};
	try {
		const response = await ssm.getParameter(params).promise();
		return response.Parameter.Value;
	} catch (error) {
		console.error("Error fetching Steam API Key:", error.message);
		throw error;
	}
}

export default getApiKey;
