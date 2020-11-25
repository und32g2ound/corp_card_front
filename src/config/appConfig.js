const LOCAL_DEV = false; // Local 개발 상태에서만 true로 셋팅한다.

const appConfig = {
  /**
   * Local 환경에서 개발 시에는 server 환경을 localhost:3001을 바라본다.
   * corp_server를 Local 에서 실행 시 port 3001로 실행이 됨
   * 배포 버전은 IPTV DEV FTP 서버인 http://114.202.216.45 환경으로 설정
   */
  serverIP: LOCAL_DEV ? 'http://localhost:3001' : 'http://114.202.216.45:3001',
  isLogin: true, // 개발용 인증 여부
};

export default appConfig;
