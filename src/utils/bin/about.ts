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

	message += `\n\n<span class="font-bold">DAXI (Data•Ai taXI) 반상회</span>\n\n`;
	message +=
		"+---------------+--------------------------------+\n" +
		"| 19:00 ~ 19:20 | 입장, 아이스브레이킹                |\n" +
		"+---------------+--------------------------------+\n" +
		"| 19:20 ~ 19:50 | '사내 첫 데이터사이언티스트로서       |\n" +
		"|               | Data Pipeline/ AI 적용기         |\n" +
		"|               | (feat. 고군분투)' - 안민재         |\n" +
		"+---------------+--------------------------------+\n" +
		"| 19:50 ~ 20:20 | '데이터로 뜯어보는 커뮤니티' - 조동민  |\n" +
		"+---------------+--------------------------------+\n" +
		"| 20:20 ~ 20:50 | 'OO의 장벽을 넘어서:               |\n" +
		"|               | 기계번역 연구개발 후기' - 최민주      |\n" +
		"+---------------+--------------------------------+\n" +
		"| 20:50 ~ 22:15 | 기사들의 수다                     |\n" +
		"+---------------+--------------------------------+\n\n";
	message +=
		"<span class='font-bold'>Q. 예치금은 어디에 쓰이나요?</span>\n" +
		"A. 간단한 저녁식사를 위한 피자 주문과 기념품으로 나눠드릴 굿즈(스티커) 제작에 사용합니다! 따로 납부하지 않으셔도 되고, 참가 신청 시 예치금에서 차감되는 방식입니다.\n\n\n" +
		"<span class='font-bold'>Q. 처음보는 분들이라 어색해요. 어떤 얘기를 하면 좋을까요?</span>\n" +
		"A. 가볍게 할 수 있는 분발자 유형검사를 준비해봤습니다! 옆 사람은 어떤 유형인지 물어보는건 어떨까요? 혹은 각자 어떤 일을 하는지, 지금 어떤 고민을 하고있는지 나눠봐도 좋을 것 같아요.\n\n" +
		"<span class='font-bold'>Q. 발표는 추후에 온라인으로 녹화본을 볼 수 있을까요?</span>\n" +
		"A. 온라인 송출/녹화는 진행하지 않으려고 합니다. 음향 하울링을 방지하기 위한 장비 마련이나, 발표장 사전 답사가 어려웠어요.. 죄송합니다 ㅠ\n\n" +
		"<span class='font-bold'>Q. 반상회를 200% 즐기는 방법은 뭘까요?</span>\n" +
		"A.\n1) 예쁜 이름표와 굿즈를 챙긴다.\n" +
		"2) 명찰을 쓱 ㅡ 훑어보다가 평소 관심있게 본 글을 쓰신 분이 있다면 살며시 다가가 인사한다.\n" +
		"3) 발표에서 궁금한 점은 일단 질문을 남겨둔다.\n" +
		"4) 입간판에서 기념사진을 남긴다.\n" +
		"<span class='font-bold'>5) (중요) 끝까지 자리를 지켜 경품을 받아간다.</span>\n";

	return message;
};
