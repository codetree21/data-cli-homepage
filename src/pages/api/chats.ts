import redis from "../../utils/redis";

const key = "chat-3";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const list = await redis.lrange(key, 0, -1);

		return res.status(200).json(list);
	}

	if (req.method === "POST") {
		const { chat } = req.body;

		await redis.lpush(key, chat);
		return res.status(201).json({});
	}
}
