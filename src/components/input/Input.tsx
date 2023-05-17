import React, { useEffect, useState } from "react";
import { commandExists } from "../../utils/commandExists";
import { DEFAULT_USER, useShell } from "../../utils/shellProvider";
import { handleTabCompletion } from "../../utils/tabCompletion";
import { useTheme } from "../../utils/themeProvider";
import { Ps1 } from "../ps1";

export const Input = ({ inputRef, containerRef }) => {
	const { theme } = useTheme();
	const [value, setValue] = useState("");
	const {
		setCommand,
		setDynamicCommand,
		history,
		dynamicHistory,
		lastCommandIndex,
		setLastCommandIndex,
		clearHistory,
		clearDynamicHistory,
		username,
	} = useShell();

	useEffect(() => {
		containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
	}, [history, dynamicHistory]);

	useEffect(() => {
		if (value === "") {
			clearDynamicHistory();
		}
	}, [value]);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		const commands: string[] = history
			.map(({ command }) => command)
			.filter((value: string) => value);

		if (event.key === "c" && event.ctrlKey) {
			event.preventDefault();

			setValue("");
			setDynamicCommand("");
			clearDynamicHistory();
		} else if (event.key === "l" && event.ctrlKey) {
			event.preventDefault();

			clearHistory();
			clearDynamicHistory();
		} else if (event.key === "Tab") {
			event.preventDefault();

			handleTabCompletion(value, setValue);
		} else if (event.key === "Enter" || event.code === "13") {
			event.preventDefault();

			setLastCommandIndex(0);

			if (value.includes("chat") && username !== DEFAULT_USER) {
				setDynamicCommand(value);
			}
			setCommand(value);

			setTimeout(() => {
				setValue("");
			}, 50);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();

			if (!commands.length) {
				return;
			}

			const index: number = lastCommandIndex + 1;

			if (index <= commands.length) {
				setLastCommandIndex(index);
				setValue(commands[commands.length - index]);
			}
		} else if (event.key === "ArrowDown") {
			event.preventDefault();

			if (!commands.length) {
				return;
			}

			const index: number = lastCommandIndex - 1;

			if (index > 0) {
				setLastCommandIndex(index);
				setValue(commands[commands.length - index]);
			} else {
				setLastCommandIndex(0);
				setValue("");
			}
		}
	};

	return (
		<>
			<div className="flex flex-row space-x-2">
				<label htmlFor="prompt" className="shrink-0">
					<Ps1 />
				</label>

				<input
					ref={inputRef}
					id="prompt"
					type="text"
					className="focus:outline-none flex-grow min-w-0"
					aria-label="prompt"
					style={{
						backgroundColor: theme.background,
						color:
							commandExists(value) || value === ""
								? theme.green
								: theme.red,
					}}
					value={value}
					onChange={(event) => handleChange(event)}
					autoFocus
					onKeyDown={onSubmit}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
				/>
			</div>
		</>
	);
};

export default Input;
