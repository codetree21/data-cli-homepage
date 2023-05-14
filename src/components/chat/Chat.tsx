import React from "react";
import { VimInput } from "../../components/viminput";
import { useQuery } from "react-query";
import axios from "axios";

const Chat = ({ inputRef }) => {
	const { data: chats } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const { data } = await axios.get("/api/chats");
			return data;
		},
		refetchInterval: 1000,
	});

	return (
		<div className={"relative h-full"}>
			<p className={"whitespace-pre-wrap"}>{chats?.join("\n")}</p>
			<div className={"absolute bottom-0"}>
				<VimInput inputRef={inputRef} />
			</div>
		</div>
	);
};

export default Chat;
