import Head from "next/head";
import React from "react";
import { History } from "../components/history";
import { Input } from "../components/input";
import { useShell } from "../utils/shellProvider";
import { useTheme } from "../utils/themeProvider";
import config from "../../config.json";
import { Chat } from "../components/chat";

interface IndexPageProps {
	inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
	const { history, dynamicHistory } = useShell();
	const { theme } = useTheme();

	const containerRef = React.useRef(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [history]);

	return (
		<>
			<Head>
				<title>[← Backspace; 더 멀리 나아가는 방법] 반상회</title>
			</Head>
			<div
				className="overflow-hidden h-full rounded"
				style={{
					borderColor: theme.yellow,
					padding: config.border ? 16 : 8,
					borderWidth: config.border ? 2 : 0,
				}}
			>
				<div ref={containerRef} className="overflow-y-auto h-full">
					{!dynamicHistory ? (
						<>
							<History history={history} />
							<Input
								inputRef={inputRef}
								containerRef={containerRef}
							/>
						</>
					) : (
						<Chat inputRef={inputRef} />
					)}
				</div>
			</div>
		</>
	);
};

export default IndexPage;
