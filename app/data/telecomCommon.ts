export function makeSlowInternetSteps(
  diagnosticName: string,
  customerCenterName: string
) {
  return [
    "다운로드·영상 재생·게임을 잠시 멈추고, 공유기 가까이에서 휴대폰이나 PC 한 대만 연결해 다시 확인합니다.",
    "가능하면 PC를 인터넷 선으로 직접 연결해 봅니다. 유선은 괜찮고 Wi-Fi만 느리면 회선보다 공유기 위치·무선 신호 문제에 가깝습니다.",
    "공유기와 모뎀 전원선을 뺐다가 다시 연결하고 장비가 켜질 때까지 몇 분 기다립니다.",
    `${diagnosticName}에서 가입 상품을 선택해 회선 상태를 진단합니다.`,
    `같은 증상이 계속되면 느려진 시간과 유선·Wi-Fi 중 어느 쪽인지 메모해 ${customerCenterName}로 고장 접수합니다.`,
  ];
}

export const slowInternetTips = [
  "공유기의 작은 RESET 구멍은 누르지 마세요. Wi-Fi 이름과 비밀번호 설정이 지워질 수 있어요.",
  "공유기에서 멀거나 벽이 많은 방에서만 느리면 회선 고장보다 Wi-Fi 신호 문제일 수 있어요.",
  "속도 측정값 하나만 말하기보다 느려지는 시간, 사용 기기, 유선·Wi-Fi 여부를 같이 알려주면 고장 접수가 빨라져요.",
];
