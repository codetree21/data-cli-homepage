import axios from "axios";

export const useradd = async (args: string[]): Promise<string> => {
	if (localStorage.getItem("username")) {
		return "이미 로그인되어 있습니다.";
	}

	if (args.length !== 1) {
		return "사용법: useradd <사용자명>";
	}

	try {
		await axios.post("/cli-homepage/api/login", {
			username: args[0],
		});
	} catch (e) {
		if (e.response.status === 401) {
			return "등록되지 않은 사용자입니다.";
		}

		return "로그인 서버에 문제가 발생했습니다.";
	}

	localStorage.setItem("username", args[0]);
	window.location.reload();

	return `${args[0]}님 반갑습니다 :)`;
};
