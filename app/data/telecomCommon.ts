export function makeSlowInternetSteps(
  diagnosticName: string,
  customerCenterName: string
) {
  return [
    "영상과 게임을 끄고 공유기 가까이에서 휴대폰 한 대만 연결해 다시 확인합니다.",
    "가능하면 PC에 인터넷 선을 직접 꽂아봅니다. 선으로는 빠른데 Wi-Fi만 느리면 공유기 신호 문제일 가능성이 큽니다.",
    "공유기와 모뎀의 전원선을 뺐다가 다시 꽂고 불이 켜질 때까지 기다립니다.",
    `${diagnosticName}에서 가입 상품을 선택해 회선 상태를 진단합니다.`,
    `그래도 느리면 시간대와 유선·Wi-Fi 중 어느 쪽인지 적어둔 뒤 ${customerCenterName}로 고장 접수합니다.`,
  ];
}

export const slowInternetTips = [
  "공유기의 작은 RESET 구멍은 누르지 마세요. Wi-Fi 이름과 비밀번호 설정이 지워질 수 있어요.",
  "공유기에서 멀거나 벽이 많은 방에서만 느리면 회선 고장보다 Wi-Fi 신호 문제일 수 있어요.",
  "속도 측정값 하나만 말하기보다 느려지는 시간, 사용 기기, 유선·Wi-Fi 여부를 같이 알려주면 고장 접수가 빨라져요.",
];
