import { kv } from "@vercel/kv";

const key = "chat-2";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const list = await kv.lrange(key, 0, -1);

		return res.status(200).json(list);
	}

	if (req.method === "POST") {
		const { chat } = req.body;

		await kv.lpush(key, chat);
		return res.status(201).json({});
	}
}
