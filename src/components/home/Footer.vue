<template>
    <section class="container footer-wrap">
        <div class="row">
            <div class="company-info">
                <p class="logo"><span class="sr-only">㈜오픈오브젝트</span></p>
                <ul class="info-list">
                    <li>㈜오픈오브젝트 | 대표 : 박원영</li>
                    <li>서울특별시 구로구 디지털로 288 13층 1306호 (우)08390</li>
                    <li>Tel : 02-2057-0883,0884</li>
                    <li>FAX : 02-2057-0885</li>
                </ul>
            </div>
            <ul class="fnb">
                <li class="depth1-item"><a href="#">COMPANY</a>
                    <ul class="depth2">
                        <li><a href="#">소개</a></li>
                        <li><a href="#">연혁</a></li>
                        <li><a href="#">수상/인증</a></li>
                        <li><a href="#">고객사</a></li>
                        <li><a href="#">오시는길</a></li>
                    </ul>
                </li>
                <li class="depth1-item"><a href="#">BUSINESS</a>
                    <ul class="depth2">
                        <li><a href="#">SERVICE</a>
                            <ul class="depth3">
                                <li><a href="#">핀테크</a></li>
                                <li><a href="#">시스템통합(SI)</a></li>
                                <li><a href="#">방송/영상</a></li>
                            </ul>
                        </li>
                        <li><a href="#">SOLUTION</a>
                            <ul class="depth3">
                                <li></li>
                                <li><a href="#">스마트워크 스콘</a></li>
                                <li></li>
                                <li><a href="#">O2UC</a></li>
                            </ul>
                        </li>
                        <li><a href="#">R&amp;D</a>
                            <ul class="depth3">
                                <li><a href="#">AI&amp;AUTOMATION</a></li>
                                <li><a href="#">PLATFORM</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="depth1-item"><a href="#">RECURIT</a>
                    <ul class="depth2">
                        <li><a href="#">인재상</a></li>
                        <li><a href="#">복리후생</a></li>
                        <li><a href="#">채용정보</a></li>
                    </ul>
                </li>
                <li class="depth1-item"><a href="#">CONTACT US</a>
                    <ul class="depth2">
                    <li><a href="mailto:webmaster@openobject.net">webmaster@openobject.net</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <p class="copyright">Since 1999 By. OPENOBJECT. All Rights reserved.</p>
        <!-- <div class="btn-top-wrap" style="display: block;"><button type="button" class="btn-top"
                onclick="location.href='#top'"><span>TOP</span></button></div> -->
    </section>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.footer-wrap .row{
  display: flex;
  background-color: #263343;
  padding: 8px 20px;
  justify-content: space-between;
  list-style: none;
  color: white;
}

.footer-wrap li {
  list-style: none;
}

.logo {
  background-image: url('../../assets/images/header_logo.png');
  width: 214px;
  height: 40px;
  margin-left: 35px;
}

.depth2 {
  padding: 0;
}

.fnb {
  display: flex;
  padding: 0;
  width: 100%;
  justify-content: center;
}

.depth1-item {
  padding: 0 50px;
}

.depth1-item > a {
  font-weight: bold;
  font-size: larger;
}

.copyright {
  font-size: 14px;
  background-color: #263343;
  margin: 0;
  color: #fff;
  padding: 8px 12px;
  text-align: center;
}

.depth3 {
  font-size: smaller;
}

@media screen and (max-width:743px) {
  .row {
    flex-direction: column;
  }
  .fnb {
    flex-direction: column;
  }
}
</style>
