import Head from "next/head";
import React, { useEffect } from "react";
import { Layout } from "../components/layout";
import "../styles/global.css";
import { ShellProvider } from "../utils/shellProvider";
import { ThemeProvider } from "../utils/themeProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickAnywhere = () => {
		inputRef.current.focus();
	};

	useEffect(() => {
		localStorage.setItem("visitedAt", new Date().toString());
	}, []);

	return (
		<ThemeProvider>
			<ShellProvider>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
						key="viewport"
					/>
				</Head>
				<QueryClientProvider client={queryClient}>
					<Layout onClick={onClickAnywhere}>
						<Component {...pageProps} inputRef={inputRef} />
					</Layout>
				</QueryClientProvider>
			</ShellProvider>
		</ThemeProvider>
	);
};

export default App;
