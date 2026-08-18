export function makeLostCardSteps(
  companyName: string,
  reportNumber: string
) {
  return [
    `카드가 보이지 않으면 ${companyName} 공식 앱·홈페이지 또는 ${reportNumber}에서 즉시 분실신고합니다.`,
    "분실한 카드만 정확히 선택하고 이용정지가 완료됐는지 접수 화면·문자를 확인합니다.",
    "최근 이용내역을 열어 본인이 쓰지 않은 결제가 있는지 확인합니다.",
    "모르는 결제가 있으면 재발급만 신청하지 말고 카드사에 부정사용도 함께 접수합니다.",
    "분실신고가 끝난 뒤 필요한 경우 재발급을 신청하고 받을 주소를 확인합니다.",
  ];
}

export function makeCardReissueSteps(
  appName: string,
  customerCenterName: string
) {
  return [
    "카드를 잃어버린 경우에는 재발급보다 분실신고와 이용정지를 먼저 완료합니다.",
    `${appName}에서 보유 카드를 열고 [재발급] 또는 [카드 관리] 메뉴를 찾습니다.`,
    "재발급 사유와 받을 주소를 확인하고 신청을 완료합니다.",
    `온라인 재발급 메뉴가 없거나 가족·특수 카드라면 ${customerCenterName}에 문의합니다.`,
    "새 카드를 받은 뒤 사용등록을 하고 정기결제·간편결제의 카드 정보 변경이 필요한지 확인합니다.",
  ];
}

export function makeUnrecognizedChargeSteps(
  appName: string,
  customerCenterName: string,
  lostReportName: string
) {
  return [
    `${appName} 이용내역에서 결제 금액·시간·가맹점 이름을 확인하고 화면을 저장합니다.`,
    "가족카드, 간편결제, 정기구독, 배달·주차·교통처럼 실제 상호와 다르게 표시되는 결제인지 확인합니다.",
    `그래도 모르는 결제이거나 추가 승인이 걱정되면 ${lostReportName}로 카드를 먼저 정지합니다.`,
    `${customerCenterName}에 '본인이 사용하지 않은 결제'라고 말하고 해당 이용건의 이의신청·부정사용 접수 방법을 안내받습니다.`,
    "접수번호와 상담 내용, 문자·앱 이용내역을 조사 결과가 나올 때까지 보관합니다.",
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
