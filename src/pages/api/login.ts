const fs = require("fs").promises;
const path = require("path");
const process = require("process");

const { google } = require("googleapis");

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
	const client_email = process.env.CLIENT_EMAIL;
	const private_key = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");

	const client = new google.auth.JWT(client_email, null, private_key, [
		"https://www.googleapis.com/auth/spreadsheets",
	]);

	return client;
}

async function listUsers(auth) {
	const sheets = google.sheets({ version: "v4", auth });
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: "1CoFrSX0U5AwWULnjyDtVN-aRXizDmWor8k31S5XfeUo",
		range: "Sheet1!A2:B",
	});
	const rows = res.data.values;

	return rows;
}

async function updateUser(auth, rowIdx) {
	const sheets = google.sheets({ version: "v4", auth });
	sheets.spreadsheets.values.update({
		spreadsheetId: "1CoFrSX0U5AwWULnjyDtVN-aRXizDmWor8k31S5XfeUo",
		range: `Sheet1!B${2 + rowIdx}`,
		valueInputOption: "RAW",
		resource: {
			values: [
				[
					new Date().toLocaleString("ko-KR", {
						timeZone: "Asia/Seoul",
					}),
				],
			],
		},
	});
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	const { username } = req.body;

	const client = await authorize();
	const usersInfo = await listUsers(client);
	const users = usersInfo.map((user) => user[0]);

	const userIdx = users.findIndex((user) => user === username);

	if (userIdx !== -1) {
		if (usersInfo[userIdx][1] === undefined || !usersInfo[userIdx][1].includes("2023")) {
			updateUser(client, userIdx);
		}

		return res.status(200).json({});
	}

	return res.status(401).json({
		message: "User not found",
	});
}
