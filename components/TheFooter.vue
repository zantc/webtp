<template>
  <div>
    <footer class="container">
      <div class="footer">
        <div class="row">
          <div class="col-12 col-md-4 col-lg-2">
            <img
              src="/public/images/Logo.png"
              alt="Logo"
              style="width: 200px"
            />
          </div>
          <div class="col-12 col-md-8 col-lg-7">
            <div class="list-info">
              <h5>TRANG THÔNG TIN ĐIỆN TỬ ĐẠI MỖ 360</h5>
              <ul>
                <li>Cơ quan chủ quản: UBND phường Đại Mỗ – TP. Hà Nội</li>
                <li>
                  Địa chỉ: số 76 đường Trung Văn, Phường Đại Mỗ, Thành phố Hà
                  Nội
                </li>
                <li>Fax: (024) 5530277</li>
                <li>Email : daimo360@hanoi.gov.vn</li>
                <li class="mt-3">
                  Số điện thoại của Ban tiếp công dân: (024) 3553-5324
                </li>
                <li>Email văn thư: ubnd_daimo@hanoi.gov.vn</li>
                <li class="mt-3">Theo dõi chúng tôi qua</li>
                <ul class="d-flex pt-2">
                  <li class="me-2">
                    <a href="#"
                      ><img src="/icons/icon-facebook.png" alt=""
                    /></a>
                  </li>
                  <li class="me-2">
                    <a href="#"><img src="/icons/icon-tiktok.png" alt="" /></a>
                  </li>
                  <li class="me-2">
                    <a href="#"
                      ><img src="/icons/icon-instagram.png" alt=""
                    /></a>
                  </li>
                  <li class="me-2">
                    <a href="#"><img src="/icons/icon-youtube.png" alt="" /></a>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div class="col-12 col-md-12 col-lg-3">
            <div class="list-info">
              <h5>Thông tin chung</h5>
            <ul>
              <li><NuxtLink href="/events/">Sự kiện</NuxtLink></li>
              <li><NuxtLink href="/news/">Tin tức</NuxtLink></li>
              <li><NuxtLink href="/contact/">Liên hệ</NuxtLink></li>
              <li class="mt-3">Tải phiên bản dành cho di động</li>
              <ul class="d-flex pt-2">
                <li class="me-2">
                  <a href="#"><img src="/icons/app-store.png" alt="" /></a>
                </li>
                <li class="me-2">
                  <a href="#"><img src="/icons/google-play.png" alt="" /></a>
                </li>
              </ul>
            </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-footer">
        <div class="bottom-footer-text">
          <p class="copyright">Copyright Dai Mo 360 © 2025</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  margin: 0 auto;
  min-height:0px;
}
.footer{
  display: flex;
  background: linear-gradient(90deg, #d9d8eb 60%, #c7cdf8 100%);
  justify-content: center;

}
.row {
  max-width:1300px;
  display: flex;
  flex-wrap: wrap;
  
}
.col-lg-3 {
  flex: 0 0 auto;
  width: 25%;
  white-space: nowrap;
}
.col-lg-2 {
  flex: 0 0 auto;
  width: 17%;
  white-space: nowrap;
}
.col-lg-7 {
  flex: 0 0 auto;
  width: 58%;
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
}
.footer .row {
  flex-wrap: wrap;
}

@media (max-width: 1200px) {
  .footer .row {
    flex-direction: column;
    align-items: stretch;
  }
  .col-lg-2, .col-lg-3, .col-lg-7 {
    width: 100% !important;
    min-width: 0;
    white-space: normal;
    margin-bottom: 18px;
  }
  .col-lg-2  {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .list-info {
    padding: 0 8px;
  }
  .col-lg-3 a{
    text-decoration: underline;
    line-height: 1.5;
    font-size: 25px;
  }
  .col-lg-3 h5{
    font-size: 30px;
  }
  .col-lg-7 li, .col-lg-7 h5 {
    line-height: 1.5;
  }
  .bottom-footer-text{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

}
.list-info {
  padding: 0 20px;
  vertical-align: baseline;
  font-weight: normal;
}
ul {
  list-style: none;
  padding: 0;
}
h5 {
  margin-block-start: 0;
  margin-block-end: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 23px;
  color: #013128;
  margin-bottom: 15px;
}
ul li {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #3f4042;
}
ul li a {
  color: #3f4042;
  text-decoration: none;
}
.mt-3 {
  margin-top: 1rem;
}
.col-lg-7 li a img {
  width: 30px;
  height: 30px;
}
.col-lg-3 li a img {
  width: auto;
  height: 30px;
}
.pt-2 {
  padding-top: 0.5rem;
}
.pt-2 li {
  display: inline-block;
  margin-right: 10px;
}
.bottom-footer{
  background: linear-gradient(90deg, #a0a9fb 60%, #999ff1 100%);
  justify-content: center;
  display: flex;
}
.bottom-footer-text {
  max-width: 1100px;
  display: flex;
  width: 100%;
}
.copyright {
  max-width: 1100px;
  margin: 5px;
  text-align: left;
}
</style>
