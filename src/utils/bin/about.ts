import themes from "../../../themes.json";
import { Theme } from "../../interfaces/theme";

const getTheme = () => {
	const themeName = localStorage.getItem("theme");
	const theme: Theme = themes.find(
		(theme) => theme.name.toLowerCase() === themeName,
	);
	return theme;
};

export const about = async (args: string[]): Promise<string> => {
	let message = "";

	message += `\n\n<span class="font-bold">[← Backspace; 더 멀리 나아가는 방법] 반상회</span>\n\n`;
	message +=
		"+---------------+----------------------+\n" +
		"| 19:25 ~ 19:50 | 채널톡 백엔드 파트 세션   |\n" +
		"+---------------+----------------------+\n" +
		"| 19:55 ~ 20:20 | 내가 커뮤니티로 성장하는   |\n" +
		"|               | 방법 with 또봇 - 김은찬  |\n" +
		"+---------------+----------------------+\n" +
		"| 20:25 ~ 20:50 | 테스트 자동화를 위해      |\n" +
		"|               | 노력했던 경험 - 박상오    |\n" +
		"+---------------+----------------------+\n\n" +
		"| 21:00 ~ 22:30 | ★두런두런 이야기★        |\n" +
		"|               | 같은 채널에 있는 분들끼리  |\n" +
		"|               | 이야기를 나누어요!        |\n" +
		"+---------------+----------------------+\n\n";
	message +=
		"<span class='font-bold'>Q. 참가비는 어디에 쓰이나요?</span>\n" +
		"A. 당일 간단한 저녁 식사를 준비하기 위해 참가비를 받고 있습니다. 직접 계좌이체 할 필요 없이 예치금에서 차감되는 방식으로 운영되며, 반상회 종료 후 예치금 시트에서 사용 내역을 확인하실 수 있습니다.\n\n\n" +
		"<span class='font-bold'>Q. 두런두런 이야기에서는 어떤 이야기를 어떻게 하나요?</span>\n" +
		"A. 테이블 별로 편하게 이야기할 수 있는 몇가지 주제를, 유명한 개발자 밈으로 준비했어요. 대화 소재 걱정은 덜어두세요!\n\n" +
		"<span class='font-bold'>Q. 구직 활동, 채널 코퍼레이션에 관심이 있어요! 직접 만날 수도 있을까요?</span>\n" +
		"A. 채널 코퍼레이션에서는 채용 부스를 운영할 예정입니다. 많이 참여해주세요!\n\n" +
		"<span class='font-bold'>Q. 특별한 이벤트가 있나요?</span>\n" +
		"A. 몇가지 준비하고 있습니다. 기대해주세요\n";

	return message;
};
