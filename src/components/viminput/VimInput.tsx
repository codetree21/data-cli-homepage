import React, { useState } from "react";
import { useTheme } from "../../utils/themeProvider";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { useShell } from "../../utils/shellProvider";

interface Chat {
	chat: string;
}

const VimInput = ({ inputRef }) => {
	const { theme } = useTheme();
	const { clearDynamicHistory, setDynamicCommand, username } = useShell();

	const queryClient = useQueryClient();

	//@ts-ignore
	const { mutate } = useMutation<unknown, AxiosError, Chat>({
		mutationFn: ({ chat }: Chat) => axios.post("/api/chats", { chat }),
		onSuccess: () => {
			queryClient.invalidateQueries("chats");
		},
	});

	const [value, setValue] = useState("");
	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			(event.key === "c" && event.ctrlKey) ||
			((event.key === "Enter" || event.code === "13") && value === "q") ||
			((event.key === "Enter" || event.code === "13") &&
				value === "q!") ||
			((event.key === "Enter" || event.code === "13") &&
				value === "wq") ||
			((event.key === "Enter" || event.code === "13") && value === "wq!")
		) {
			event.preventDefault();

			setValue("");
			setDynamicCommand("");
			clearDynamicHistory();
			return;
		}
		if (event.key === "Enter" || event.code === "13") {
			event.preventDefault();

			if (value.length <= 1) {
				setValue("");
				return;
			}

			const today = new Date();

			setValue("");
			mutate({
				chat: `[${today.toLocaleString("ko-KR", {
					timeZone: "Asia/Seoul",
					timeStyle: "medium",
				})}] ${username}: ${value}`,
			});
			return;
		}
	};

	return (
		<div>
			<div
				className="flex flex-row"
				style={{
					backgroundColor: theme.background,
					color: theme.foreground,
				}}
			>
				<label htmlFor="prompt" className="flex-shrink">
					:
				</label>
				<input
					ref={inputRef}
					id="prompt"
					type="text"
					className="focus:outline-none flex-grow"
					aria-label="prompt"
					value={value}
					onChange={(event) => handleChange(event)}
					autoFocus
					onKeyDown={onSubmit}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					style={{
						backgroundColor: theme.background,
						color: theme.foreground,
					}}
				/>
			</div>
		</div>
	);
};

export default VimInput;
