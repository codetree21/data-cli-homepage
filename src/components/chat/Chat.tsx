import React from "react";
import { VimInput } from "../../components/viminput";
import { useQuery } from "react-query";
import axios from "axios";
import { useTheme } from "src/utils/themeProvider";

const Chat = ({ inputRef }) => {
	const { data: chats } = useQuery({
		queryKey: ["chats"],
		queryFn: async () => {
			const { data } = await axios.get("/api/chats");
			return data;
		},
		refetchInterval: 1000,
	});

	const theme = useTheme();

	return (
		<div className={"relative h-full"}>
			{chats ? (
				<p className={"whitespace-pre-wrap"}>{chats?.join("\n")}</p>
			) : (
				<div className="animate-pulse flex flex-col space-y-2">
					<div className="grid grid-cols-12 gap-2">
						<div className="h-4 bg-current rounded col-span-1"></div>
						<div className="h-4 bg-current rounded col-span-3"></div>
					</div>
					<div className="grid grid-cols-12 gap-2">
						<div className="h-4 bg-current rounded col-span-1"></div>
						<div className="h-4 bg-current rounded col-span-3"></div>
					</div>
					<div className="grid grid-cols-12 gap-2">
						<div className="h-4 bg-current rounded col-span-1"></div>
						<div className="h-4 bg-current rounded col-span-3"></div>
					</div>
					<div className="grid grid-cols-12 gap-2">
						<div className="h-4 bg-current rounded col-span-1"></div>
						<div className="h-4 bg-current rounded col-span-3"></div>
					</div>
					<div className="grid grid-cols-12 gap-2">
						<div className="h-4 bg-current rounded col-span-1"></div>
						<div className="h-4 bg-current rounded col-span-3"></div>
					</div>
				</div>
			)}
			<div className={"fixed bottom-3 w-[calc(100%-48px)]"}>
				<VimInput inputRef={inputRef} />
			</div>
		</div>
	);
};

export default Chat;
