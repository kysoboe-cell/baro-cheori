export function makeLostCardSteps(
  companyName: string,
  reportNumber: string
) {
  return [
    `${companyName} 공식 앱에서 [분실신고]를 찾습니다. 앱을 쓸 수 없을 때만 ${reportNumber}로 전화합니다.`,
    "잃어버린 카드를 고르고 [이용정지]가 완료됐다는 화면이나 문자를 확인합니다.",
    "최근 결제내역을 열어 내가 쓰지 않은 결제가 있는지 확인합니다.",
    "모르는 결제가 있으면 재발급만 하지 말고 [부정사용 신고]도 함께 접수합니다.",
    "마지막으로 새 카드를 받을 주소를 확인하고 재발급을 신청합니다.",
  ];
}

export function makeCardReissueSteps(
  appName: string,
  customerCenterName: string
) {
  return [
    "카드를 잃어버린 경우에는 재발급보다 분실신고와 이용정지를 먼저 완료합니다.",
    `${appName}에서 내 카드를 열고 [재발급] 또는 [카드 관리]를 찾습니다.`,
    "재발급 사유와 받을 주소를 확인하고 신청을 완료합니다.",
    `버튼이 없거나 가족카드라면 그때 ${customerCenterName}에 전화합니다.`,
    "새 카드를 받으면 사용등록을 하고 정기결제에 등록한 카드번호도 바꿉니다.",
  ];
}

export function makeUnrecognizedChargeSteps(
  appName: string,
  customerCenterName: string,
  lostReportName: string
) {
  return [
    `${appName}에서 결제 금액, 시간, 가게 이름을 확인하고 화면을 저장합니다.`,
    "가족이 썼는지, 정기구독이나 간편결제 이름이 다르게 표시된 것은 아닌지 확인합니다.",
    `그래도 모르는 결제라면 ${lostReportName}로 카드를 먼저 정지합니다.`,
    `${customerCenterName}에 "제가 하지 않은 결제입니다"라고 말하고 [이의신청]을 접수합니다.`,
    "접수번호, 문자, 앱 결제내역은 결과가 나올 때까지 지우지 않습니다.",
  ];
}

export const lostCardTips = [
  "분실신고는 카드번호를 찾느라 미루지 말고 공식 앱이나 전용 전화로 바로 접수하세요.",
  "문자메시지에 적힌 링크 대신 카드 뒷면 번호, 공식 앱, 공식 홈페이지의 번호만 이용하세요.",
  "카드를 다시 찾았더라도 신고 해제 여부를 확인하기 전에는 사용하지 마세요.",
];

export const cardReissueTips = [
  "분실카드는 재발급 신청만으로 즉시 정지됐다고 생각하지 말고 분실신고 완료 여부를 따로 확인하세요.",
  "새 카드의 번호나 유효기간이 바뀌면 일부 정기결제·간편결제 정보를 다시 등록해야 할 수 있어요.",
  "재발급 배송지와 현재 등록 주소가 맞는지 신청 전에 확인하세요.",
];

export const unrecognizedChargeTips = [
  "가맹점에만 문의하고 기다리지 말고, 본인 결제가 아니라면 카드사에도 즉시 알리세요.",
  "카드 비밀번호·CVC·문자 인증번호를 상담원이나 가맹점에 전달하지 마세요.",
  "카드사 조사 전에는 문자, 앱 이용내역, 주문내역을 삭제하지 마세요.",
];
