<template>
  <div class="pattern">
  <div class="section-title">
    <div style="display: flex">
      <NuxtLink :to="('/')" class="nuxt-link">
        <h3 class="title">
          Trang chủ
        </h3>
      </NuxtLink>
      <NuxtLink :to="('/news')" class="nuxt-link">
        <h3 class="title">
          / Tin tức
        </h3>
      </NuxtLink>
      <h3 class="title color-gray">/ Bài viết</h3>
    </div>
  </div>
  <div class="section-news">
    <div class="span-2">
      <h3 class="news-name">{{ news.name }}</h3>
      <div class="news-main-content">
        <div class="content" v-html="news.content"></div>
      </div>
    </div>
    <div>
      <h3 class="news-header">Tin tức khác</h3>
      <div class="news-aside">
        <div class="news-items" v-for="item in newss.slice(-3)" :key="item.key">
          <NuxtLink :to="(`/news/${item.slug}`)" class="nuxt-link">
            <img :src="item.image[0]" :alt="item.name" class="news-image" />
            <h4
              class="news-title"
            >
              {{ item.name }}
            </h4>
            <p class="news-date">{{ item.date }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div class="section-title">
    <h3 class="news-header">Tin tức liên quan</h3>
  </div>
  <div class="news-list">
    <div class="news-items" v-for="item in newss.slice(-3)" :key="item.key">
      <NuxtLink :to="(`/news/${item.slug}`)" class="nuxt-link">
        <img :src="item.image[0]" :alt="item.name" class="news-image" />
        <h4
          class="news-title"
        >
          {{ item.name }}
        </h4>
        <p class="news-date">{{ item.date }}</p>
      </NuxtLink>
    </div>
  </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import "swiper/css";
import "swiper/css/navigation";

const newss = [
  {
    key: 1,
    slug: "chuyen-doi-so-huong-dan-chi-tiet-cach-tra-cuu-ho-so-dich-vu-cong",
    name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn chi tiết cách tra cứu hồ sơ dịch vụ công",
    date: "16/7/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: ["/images/news/maxresdefault(6).jpg"],
    content:
      `<div class="content">
        <div><div style="font-weight: bold; margin-right: 10px">Bước 1:</div><p>Khởi đầu với việc tìm kiếm dịch vụ</p></div>

        <p>Dễ dàng tra cứu thông tin dịch vụ công bạn quan tâm bằng một trong ba cách:</p>
        
        <ul>
          <li> Sử dụng chức năng tìm kiếm từ khóa trên trang chủ hoặc trang dành riêng cho công dân và doanh nghiệp.</li>

          <li>Chọn thủ tục dựa trên sự kiện hoặc nhu cầu cụ thể của bạn.</li>

          <li>Truy cập danh sách dịch vụ công trực tuyến để lựa chọn.</li>
        </ul>

        <div><div style="font-weight: bold; margin-right: 10px">Bước 2:</div><p>Xác định cơ quan thực hiện</p></div>

        <p>Dựa trên mục “Cơ quan thực hiện” liên quan đến thủ tục hành chính bạn quan tâm, hãy xác định và chọn cơ quan tương ứng để thực hiện thủ tục.</p>

        <div><div style="font-weight: bold; margin-right: 10px">Bước 3:</div><p>Tạo và sử dụng tài khoản cá nhân hoặc doanh nghiệp</p></div>

        <p>Để tiến hành tra cứu hồ sơ dịch vụ công, bạn cần một tài khoản. Hãy đăng ký thông qua:</p>

        <ul>
          <li>Sim ký số</li>

          <li>USB ký số</li>

          <li>Thuê bao di động (Dành riêng cho đối tượng Công dân)</li>

          <li>Mã BHXH (Dành riêng cho đối tượng Công dân)</li>
        </ul>

        <p>Khi đã có tài khoản, bạn đăng nhập qua:</p>

        <ul>
          <li>Sim ký số</li>

          <li>USB ký số</li>

          <li>Chứng minh thư/CCCD</li>
        </ul>

        <div style="font-weight: bold; margin-right: 10px">Bước 4:</div><p>Nộp và tiến hành theo dõi hồ sơ</p></div>

        <p>Sau khi đăng nhập, bạn sẽ được chuyển hướng đến cổng của cơ quan thích hợp để nộp hồ sơ. Để biết tình trạng hồ sơ, chỉ cần sử dụng mã số hồ sơ được cấp trên Cổng Dịch vụ công Quốc gia. Đăng nhập để xem chi tiết và theo dõi tiến trình xử lý cũng như các thông tin liên quan khác của hồ sơ.<img alt="" src="https://tayho360.vn/upload/admin/images/471377449_584973737612834_8725206293917829232_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471256745_584973784279496_3135064529765479352_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471359254_584973840946157_5896907626785392109_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471330422_584973874279487_4708168970145002515_n.jpg" style="width: 100%;"></p>
      </div>`,
  },
  {
    key: 2,
    slug: "chuyen-doi-so-cac-cach-chuan-hoa-thong-tin-thue-bao-viettel",
    name: "[ CHUYỂN ĐỔI SỐ ] Các cách chuẩn hóa thông tin thuê bao Viettel",
    date: "24/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: ["/images/news/5866bed4301db7fb7cf8ab555413c5f9ab14f223.png"],
    content: 
    `<div class="content">
      <p>Để chuẩn hóa thông tin thuê bao, người dùng có thể sử dụng các cách dưới đây:</p>

      <div style="font-weight: bold; margin-right: 10px">Cách 1: </div><p>Sử dụng ứng dụng My Viettel</p>

      <p>Quý khách truy cập ứng dụng My Viettel → Tại giao diện màn hình chính, khách hàng bấm chọn “Tiện ích khác” → Chọn “Tiện ích di động” → Chọn mục “Chuẩn hóa thông tin” → Chụp ảnh CMND/CCCD và ảnh chân dung → Kiểm tra hợp đồng, ký xác nhận → Nhập mã OTP → Hoàn Tất!</p>

      <div><div style="font-weight: bold; margin-right: 10px;">Cách 2: </div>
      <p>Khách hàng vui lòng mang CMND hoặc thẻ căn cước hoặc hộ chiếu đến các điểm giao dịch của Viettel để xác nhận/đăng ký lại thông tin.</p></div>

      <div><div style="font-weight: bold; margin-right: 10px;">Cách 3: </div><p>Người dùng cũng có thể thực hiện xác nhận bổ sung thông tin trên website của Viettel tại địa chỉ: <a attributionsrc="/privacy_sandbox/comet/register/source/?xt=AZXPpoQsSGKBJu0yLgKDC43hTFAm8UCfe_qofBy7T2XiZ90pnOjLgg3QALtY2shsgzxLtBIcnGgcdUY0nMEw5XZdVdQNyjkrMNDWFcTVBSyuhmWCG-rimLUunpvmR8pgd5uD8PjKOuGPyrrI7BK_EyJrLulSwgvcZpxqvRNkR_Hpp6OlzxRQkaE4CqV9dsXZF82OECW3NYoYkppE459X1rDuxbpz--eh9jZvkckE1dqN4fkIEMoIU9zVhPVKL8cwP2zaJrB-FOG_2liC1lEeJ0zgatDbYEaDxHoP1Ds3s3sZjyPExAfVfSn-ty1oof35H3whnZGl9gh0N__qRohdoyKxfXEAK7Ih58h57HJOQPpvd1fPNhbVtwhXxau3Z8d8a_AM9o7szcsDlekzihgjtVNQdDaAf33baaeipRd2Xm75Qjujp51a8GrMtaK7NL1EqtOJhOugtWW5gZ0Sf-5vxII3Aw3KnRAyxZRUvJPcNA50TrHduq6hEUvJZCuqNqMKlyJc77s0bIJiFcycAjDXW-SGQ7HDsG38MoxIpGbLZLz_TdldFbd5aLJNA_XXLYb8vIlBql8c0KIANQwLNR7-RVRiqJSea93bRxLLjbpafcBAtSTv_W61fYDRhlHKqcB_tEO9IRB-MqtFCvs69CkD2Q060pv9zDM1LzD8-eQJeYtMqQCZpmnMAYrF4O9b84BX1LiYJSzW7iGXOWpIx2USKamV1GzASlU-fNpLe1vpqm8RFnUkytVB6ND52g4LTm4JO8pmElLtid6SdeLTMGVbKDS06BBlr4g8zk6296GCluBoGf6bLCuYLQteQ_JrnvA0Cm5ZFLFOKz2CFbqyr9EDrbJXKXhJLPWoOlDwuEnKk4rMBaR1nSPL_Ca7qEHvEa3xSdwdHXHiNyZLd5QOhjLa-qNnODrFRBFNKPb4FPBM4DsM2nbeA8TZZXXPRzz8_8Zeq57EMaVRRsSaMzzubJlGs2nqC5b6Jy-KNv5aqDbVk_znBK9AKbWCrg0aLIwTLbMuHtOLFJ89jTjgkmhNBrtwzkSreTy3csloSPwvogsW5CMigh6tFUPnzhy9KVw8f7NSdqDA5oxhDKEQqX3UuL9Cs3zBJOhvhcf-LaJIfVERP7ItdmYzQW7Y8KknTYMsXIazRqDcAuxe5mZIPrNUvMJYNlnx" href="https://viettel.vn/chuan-hoa-thong-tin?fbclid=IwZXh0bgNhZW0CMTAAAR2IQ24gUYEJxr_kZxflwtCOcQIpSPIgPueNvCE65r_q7MM8BwZ6H_T8nzE_aem_ce02aTuwWoBpFKzOuRZTHA" rel="nofollow noreferrer" role="link" tabindex="0" target="_blank">https://viettel.vn/chuan-hoa-thong-tin</a></p></div>

      <p>Hy vọng bài viết đã cung cấp cho bạn những thông tin hữu ích về chuẩn hóa thông tin thuê bao, đặc biệt là những lợi ích mà người dùng sẽ được nhận khi chuẩn hóa thông tin. Nếu như có thắc mắc hoặc cần tư vấn thêm về chuẩn hóa thông tin thuê bao hay các dịch vụ khác của Viettel thì hãy liên hệ ngay tới tổng đài Viettel 198 (miễn phí)để được hỗ trợ kịp thời và nhanh nhất nhé.</p>

      <p><img alt="" src="https://tayho360.vn/upload/admin/images/471277261_584972010946340_8065792687688725095_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471185942_584972007613007_552773522232589927_n.jpg" style="width: 100%;"></p>
    </div>`,
  },
  {
    key: 3,
    slug: "chuyen-doi-so-huong-dan-dat-lich-dang-kiem-truc-tuyen",
    name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn đặt lịch đăng kiểm trực tuyến",
    date: "24/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: ["/images/news/kd-17138442821361721880032.jpeg"],
    content: 
    `<div class="content">
        <div><div style="font-weight: bold; margin-right: 10px">Bước 1: </div><p>Truy cập website <a attributionsrc="/privacy_sandbox/comet/register/source/?xt=AZV66WpI4t3462RwAAX5A7seuS0qLkTVW1xe19IN0tLA6Fltfy6cNhqw7YI5Kr4ur9kcJSPoQLngJiX9jLcerbAXdYlV2zU4a0a-ZEueJAS2UsFo5kBs9Gc2PbTb5iQQy7Gk_fWgZoB9Qh_x4stZ5nTvC_Z4cnpbJYGjuuF1Cq1cXscDGu_9bxJa8Rz8P-EZL8Rg3eC1RXEwMwsjJs0zqNP9Y84IAzpYXh5cwZ-a0X_EN7URgfS-TthGjRsVss8ccBP9g2AJ-x1WmaxpyUYf9CecVbg1TFLXkTFr2SrEssX_D2FpPR9x9boN8FHbHVRKRD7ijvISLVVjx7_DMkCQYNQX_jv-xh3qwApWvM9DfNJJTz1sLC6XL5Fac34pvmBrZqQ_HtDe9o8xinOtco8ggqLzVOofe7KsDVF9PPAFCSYDdS1D97YwvwMPcVvXxCZLwjKrEenK3WGzU52-zvX9Swm6Wtl7UVfKNs9PWKFhUOoeEweI4B7agaBhKwHUKmFQaA5E93_paFsCpMxjuQbvOJKrAL9CFfRjbXi2oMR8j82a2IrIYydfOpOVgQJRkaUsErkaaMN70g_XWKSI9SJmlYqVl1DG3fIPZHJrfuCc55oQP7GNDLu9OP5kNCMRTNWR3ficFKEWYmrnikh2G8O6lecXGW0v-t-L7uxNCDPH0IXY-nQYfHH7twD40Rsvu60DejIyLx-W7a9uH5MsmmLIM7ACzjLc51aTVRxIyeVF80-OM79bYQ6bmfmov6VeaewmWpjAoLrtjad_rFSLU484pSImgeR5iTa_I-_QiNg7dY_q3ELYBjr6lQcJJFpuG_HUCkp5rumosITVn2oY2RI7dfWOgiE26KMC9pyjyQvOfYa5S-gDI1TAORli8xUUnBT5NmX6ZlWhrfrFl2znX60WXR6Qa-OzatSlgZ4nswXuD5rKJ5jlSdVSTlfG9_UFBKrOWZueOkVbBCLQLgQ193G_AvP2k3Ff7OIYVO5R7EXHIS07N2_uOVf7bWFgJDCizrsnTicd9b-Aj5SZC1M8ZXbuIpbFTknqzwYmnC2wSezFMBQUUouGj720wDjBX9zWdRPQT_DpIXzpBr31_hk9HMLsiebrdOTtGA3EXZQj9U-hCx33dQ03sC6713NHiBnEYjnpIWPr1JFNjUbx_Tbqs5Nc9r3E" href="http://ttdk.com.vn/?fbclid=IwZXh0bgNhZW0CMTAAAR2sqt6ttt-BGEGb0dysvrAEPRLnLdlsOXcmYPhbUAFypOJFonCx7gyCHYA_aem_CKckzo32VEj23SRjrCiZEQ" rel="nofollow noreferrer" role="link" tabindex="0" target="_blank">ttdk.com.vn</a> hoặc sử dụng app TTDK trên điện thoại, chọn mục “Đặt lịch”</p></div>

        <div style="font-weight: bold; margin-right: 10px">Bước 2: </div><p> Đăng nhập vào tài khoản như hướng dẫn tại mục số 2</p></div>

        <div style="font-weight: bold; margin-right: 10px">Bước 3: </div>
        
        <p>Điền thông tin về trạm đăng kiểm, ngày hẹn, khung giờ thích hợp để đặt lịch</p>

        <p>Các trung tâm đang hoạt động và sẵn sàng phục vụ kiểm định sẽ hiện sáng màu. Các trường hợp trung tâm dừng hoạt động, hoặc đã đầy lịch theo từng khung giờ hoặc ngày thì sẽ bị mờ ẩn đi và không đặt được lịch nữa.</p></div>

        <div style="font-weight: bold; margin-right: 10px">Bước 4: </div>
        <p>Sau khi đặt lịch đăng kiểm chờ thông báo xác nhận</p>

        <p><img alt="" src="https://tayho360.vn/upload/admin/images/471447683_584970137613194_7406552356995760282_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471149844_584970147613193_6257351347266488478_n.jpg" style="width: 100%;"></p>
                                 
    </div>`,
  },
  {
    key: 4,
    slug: "chuyen-doi-so-cach-dang-ky-lam-giay-khai-sinh-online-tren-dien-thoai-don-gian",
    name: "[ CHUYỂN ĐỔI SỐ ] Cách đăng ký làm giấy khai sinh online trên điện thoại đơn giản",
    date: "12/08/2023",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "https://ditichlichsu-vanhoahanoi.com/wp-content/uploads/2017/10/Dinh-Dai-Mo-676x400.jpg",
    ],
    content:
    `<div class="content">
      <p>Đăng ký giấy khai sinh là một thủ tục quan trọng đối với mỗi công dân, giờ đây khi công nghệ thông tin đã phát triển và chiếm lĩnh toàn cầu thì việc làm giấy khai sinh cũng vô cùng đơn giản với hình thức online thông qua Cổng Dịch vụ Công Quốc gia. Bài viết này sẽ hướng dẫn cho bạn cách đăng ký làm giấy khai sinh online thật đơn giản ngay trên điện thoại của bạn.<img alt="" src="https://tayho360.vn/upload/admin/images/471415106_584966504280224_2110024361060966659_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471520674_584966590946882_1869939196052013008_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471156122_584966697613538_16956570413995522_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471407291_584966734280201_951372778169083172_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471204111_584966777613530_5396075665704764647_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471535551_584966840946857_8899861747216789771_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471417792_584966887613519_1481624216981130385_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471300572_584966937613514_3730060813213233320_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471189443_584966997613508_6217469223440059233_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471259877_584967084280166_5621507463788910381_n.jpg" style="width: 100%;"></p>
    </div>`,
  },
  {
    key: 5,
    slug: "chuyen-doi-so-huong-dan-dang-ky-nhan-luong-huu-qua-the-atm-tren-ung-dung-vssid",
    name: "[ CHUYỂN ĐỔI SỐ ] Hướng dẫn đăng ký nhận lương hưu qua thẻ ATM trên ứng dụng VssID",
    date: "15/7/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/15/2-1752587297930260600992.jpg",
    ],
    content: 
    `<div class="content">
      <p>Các bước thực hiện như sau:</p>

      <div><div style="font-weight: bold;">Bước 1: </div><p>Đăng nhập vào ứng dụng VssID</p></div>

      <div><div style="font-weight: bold;">Bước 2: </div><p>Chọn mục “Dịch vụ công”.</p></div>

      <div><div style="font-weight: bold;">Bước 3: </div><p>Chọn “Thay đổi hình thức lĩnh lương hoặc thông tin người hưởng chế độ BHXH”</p></div>

      <div><div style="font-weight: bold;">Bước 4: </div>
      <ul>
        <li>Điền thông tin đăng ký nhận lương hưu qua thẻ ATM.</li>

        <li>Kê khai đầy đủ các thông tin: họ tên, ngày sinh, số sổ BHXH….</li>

        <li>Tại mục “Hình thức nhận” tích chọn “Nhận qua tài khoản”. Nhập thông tin số tài khoản ngân hàng và ngân hàng mở thẻ ATM. (Lưu ý: Thông tin người đăng ký trên ứng dụng VssID phải trùng khớp với thông tin chủ tài khoản ngân hàng)</li>

        <li>Sau khi nhập đầy đủ các thông tin, nhấn nút “Gửi”.</li>
      </ul>
      </div>

      <div><div style="font-weight: bold;">Bước 5: </div>
      <ul>
        <li>Nhập mã OTP</li>

        <li>Kiểm tra điện thoại để nhận mã OTP do hệ thống gửi đến</li>

        <li>Thực hiện nhập mã OTP, sau đó bấm “Xác nhận” để hoàn tất thủ tục đăng ký</li>
      </ul>

        <div><div style="font-weight: bold;">Bước 6: </div><p>Hệ thống sẽ gửi tin nhắn đến điện thoại, thông báo tài khoản cá nhân đã nộp hồ sơ thành công.</p></div>

        <p><img alt="" src="https://tayho360.vn/upload/admin/images/471156736_584964350947106_6149677004287486537_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471470359_584964397613768_8009847544121127611_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471511682_584964454280429_7105230861977863643_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471168035_584964500947091_2678030870490695471_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471423704_584964557613752_7129691499956639828_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471431055_584964610947080_3749076383002292611_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471446329_584964684280406_2270765529353222434_n.jpg" style="width: 100%;"></p>
      </div>
    </div>`,
  },
  {
    key: 6,
    slug: "chuyen-doi-so-ly-do-giup-viettel-agile-gianh-giai-quoc-te-ve-chuyen-doi-so",
    name: "[ CHUYỂN ĐỔI SỐ ] Lý do giúp Viettel AGILE giành giải quốc tế về chuyển đổi số",
    date: "21/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "https://sqhx-hanoi.mediacdn.vn/thumb_w/740/91579363132710912/2025/7/21/1-1753088285783198392915.jpg",
    ],
    content: `<div class="content">
      <p>Theo bà Trịnh Thị Lan - giám đốc dịch vụ tư vấn chuyển đổi số của Viettel Solutions, trên 90% các doanh nghiệp lúng túng trước muôn vàn câu hỏi: Nên bắt đầu chuyển đổi từ đâu, phải làm bao nhiêu việc, lộ trình chuyển đổi như thế nào, cần chuẩn bị nguồn lực ra sao, giá trị mang lại là gì… dẫn đến quá trình chuyển đổi số của nhiều doanh nghiệp vẫn chưa đạt được những kết quả như mong đợi.</p>

      <p>Bà Trịnh Thị Lan chia sẻ khi bắt đầu hành trình chuyển đổi số của mình, bản thân tập đoàn đã gặp rất nhiều khó khăn trong việc tự đánh giá và xây dựng chiến lược cho mình. Sau 1-2 năm đầu loay hoay, Viettel nhận thấy những khó khăn mà bản thân tập đoàn gặp phải có thể là những khó khăn chung khi các doanh nghiệp bắt đầu chuyển đổi số.</p>

      <p>Khi Viettel chuyển đổi thành công cũng là lúc phương pháp luận Viettel AGILE ra đời, dựa trên đúc kết từ những bài học cả thành công và thất bại, trở thành "trái tim" của dịch vụ tư vấn chuyển đổi số. Viettel AGILE được phát triển độc quyền bởi tập đoàn dựa trên sự nghiên cứu, đánh giá các phương pháp luận của tổ chức tư vấn hàng đầu thế giới, kết hợp với tri thức, kinh nghiệm chuyển đổi số nội bộ của chính mình.</p>

      <p>Lấy cảm hứng từ sự linh hoạt của công nghệ và văn hóa đậm chất Viettel - thích ứng nhanh là sức mạnh cạnh tranh, Viettel AGILE được tạo nên từ 5 ký tự đầu tiên của 5 giai đoạn trong hành trình chuyển đổi số.</p>

      <p>Đầu tiên, AWARE, doanh nghiệp cần đánh giá và chỉ ra những vấn đề chính, bài toán lớn của mình và bảo đảm rằng toàn bộ tổ chức, đối tác và tất cả các bên liên quan đều có chung hiểu biết về chuyển đổi số và những mục tiêu cần đạt của hành trình này.</p>

      <p>Giai đoạn GO THROUGH yêu cầu doanh nghiệp xây dựng "hồ sơ sức khỏe số", từ đó xây dựng một kế hoạch toàn diện về chuyển đổi số, trong đó chỉ rõ ưu tiên trọng tâm liên quan trực tiếp đến tầm nhìn, mục tiêu của mình.</p>

      <p>IMPLEMENT là giai đoạn đòi hỏi các giải pháp được triển khai theo lộ trình đề ra với sự giám sát chặt chẽ.</p>

      <p>Sau quá trình triển khai, tất cả những vấp váp hay thành công đều được đánh giá và học hỏi, rút kinh nghiệm, hướng tới việc liên tục cải tiến để đảm bảo hiệu quả (giai đoạn LEARN). Cuối cùng là hiện thực hóa và khai phóng tiềm năng số của doanh nghiệp, mang đến những giá trị mới từ chuyển đổi số.</p>

      <p>Những điểm độc đáo của Viettel AGILE</p>

      <p>Để Viettel có thể thấu hiểu và giải quyết triệt để những băn khoăn, bối rối của doanh nghiệp trong việc chuyển đổi số, Viettel AGILE đã được thiết kế với 4 điểm mạnh.</p>

      <p>Thứ nhất, tính thực chiến của phương pháp này được chứng minh qua ứng dụng thành công trong chính tập đoàn. Thứ hai, tri thức đa ngành từ kinh nghiệm của tập đoàn giúp Viettel AGILE nổi bật bởi khả năng tư vấn với kiến thức sâu rộng từ nhiều lĩnh vực.</p>

      <p>Thứ ba là tính toàn diện từ đầu đến cuối, đồng hành cùng doanh nghiệp thực thi chiến lược chuyển đổi số. Cuối cùng, tính cá thể hóa đảm bảo phương pháp luận phù hợp với nhu cầu và điều kiện cụ thể của mỗi doanh nghiệp, tạo lộ trình chuyển đổi số khả thi và hiệu quả.</p>

      <p>Viettel AGILE cũng tạo nên dấu ấn độc đáo trên thị trường nhờ vào phương pháp tiếp cận có hệ thống, phân tích sâu sắc bối cảnh, cũng như điểm mạnh và điểm yếu của doanh nghiệp để xây dựng chiến lược chuyển đổi số phù hợp với tầm nhìn và khả năng của khách hàng.</p>

      <p>Dịch vụ tư vấn chuyển đổi số của tập đoàn không chỉ bó hẹp về công nghệ mà còn nghiên cứu từng khía cạnh của doanh nghiệp, từ văn hóa đến quy trình kinh doanh, tạo ra kết quả toàn diện.</p>

      <p>Đặc biệt, trước khi giới thiệu đến khách hàng, phương pháp này đã được tích cực áp dụng thử nghiệm trên tất cả 10 thị trường toàn cầu và các công ty thành viên trong các ngành khác nhau của tập đoàn. Tất cả những kinh nghiệm của tập đoàn đều được cân nhắc kỹ lưỡng trước khi tư vấn cho khách hàng.</p>

      <p>Giải thưởng Big Awards for Business năm 2024 với giải thưởng Điển hình của năm trong lĩnh vực chuyển đổi số là một trong những sự công nhận với dịch vụ Tư vấn Chuyển đổi số của Viettel trong hành trình xây dựng chiến lược và triển khai công nghệ của khách hàng.</p>

      <p>Đằng sau đó là câu chuyện và bài học của mỗi khách hàng trong từng ngành nghề, lĩnh vực được đúc kết và chia sẻ trong hồ sơ xây dựng giải thưởng.</p>

      <p>Đó là một doanh nghiệp hàng đầu trong ngành hàng không đã chuyển đổi số để vươn mình mạnh mẽ sau những tháng ngày đại dịch đóng băng, dùng công nghệ để từng bước chuyển đổi vận hành và trải nghiệm khách hàng. Và ngày nay họ lại trở lại, tiếp tục đồng hành cùng Viettel với nhiều khát khao và tầm nhìn lớn lao hơn.</p>

      <p>Đó là một doanh nghiệp bất động sản, loay hoay giữa những biến động khó lường của thị trường, đã cùng tập đoàn ứng dụng sức mạnh của công nghệ để góp phần tìm ra những giải pháp mới, con đường mới bền vững hơn.</p>

      <p>Đó là một doanh nghiệp sản xuất ngành khai thác, với những yêu cầu đặc thù nghiêm ngặt về an toàn trong lao động sản xuất và đòi hỏi năng suất lao động cao, đã cùng tập đoàn xây dựng một chiến lược dài hạn để quản trị số, tăng hiệu quả trong đảm bảo an ninh an toàn và tối ưu nguồn nhân lực,</p>

      <p>Đó là 3 trong số rất nhiều câu chuyện tập đoàn đã, đang và sẽ tiếp tục lan tỏa, chia sẻ, đúng với tinh thần là đơn vị tiên phong trong kiến tạo xã hội số.</p>

      <p><img alt="" src="https://tayho360.vn/upload/admin/images/471428633_584954567614751_6924673453899107659_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471182322_584954570948084_6549103258105451510_n.jpg" style="width: 100%;"></p>                               
    </div>`,
  },
  {
    key: 7,
    slug: "chuyen-doi-so-du-lieu-mo-mo-du-lieu",
    name: "[ CHUYỂN ĐỔI SỐ ] DỮ LIỆU MỞ, MỞ DỮ LIỆU",
    date: "19/11/2023",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "https://images.baophunuthudo.vn/zoom/1000/uploaded/anhnq/2025_02_11/ruoc_xoi_1_qlgj.jpg",
    ],
    content: 
    `<div class="content">
        <p><img alt="" src="https://tayho360.vn/upload/admin/images/471259686_584914390952102_4605276644570353803_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471277065_584914277618780_6632106133143565981_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471268677_584914327618775_7772123157403538021_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471274101_584914320952109_8836440503028782644_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471253270_584914330952108_4011926509255839087_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471157305_584914274285447_4504128341916095387_n.jpg" style="width: 100%;"></p>
      </div>`,
  },
  {
    key: 8,
    slug: "chuyen-doi-so-ket-noi-chia-se-du-lieu-ve-dan-cu-tren-quy-mo-quoc-gia",
    name: "[ CHUYỂN ĐỔI SỐ ] Hiệu quả ứng dụng ’Trợ lý ảo’ trong ngành Tòa án",
    date: "21/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "/images/news/471383739_584912150952326_5454606101210890951_n.jpg",
    ],
    content: 
    `<div class="content">
        </p><p><img alt="" src="/images/news/471293897_584912224285652_5999408046787161505_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471298701_584912270952314_4106270062109504083_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471472276_584912194285655_2102903062846539919_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471300698_584912217618986_4405953529641025560_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471448190_584912264285648_8011939595365466033_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471304695_584912267618981_6618826682906876103_n.jpg" style="width: 100%; height: 1px;"><img alt="" src="https://tayho360.vn/upload/admin/images/471247256_584912237618984_1474908396391967220_n.jpg" style="width: 100%;"></p>
      </div>`,
  },
  {
    key: 9,
    slug: "ket-noi-chia-se-du-lieu-ve-dan-cu-tren-quy-mo-quoc-gia",
    name: "[ CHUYỂN ĐỔI SỐ ] Kết nối, chia sẻ dữ liệu về dân cư trên quy mô quốc gia",
    date: "12/08/2023",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "/images/news/471227233_584911144285760_6255928176124598175_n.jpg",
    ],
    content: 
    `<div class="content">
        <p><img alt="" src="/images/news/471423934_584911187619089_3325824485909443656_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/blue-yellow-vibrant-productivity-checklist-infographic-638266581469114268.png" style="width: 100%;"></p>
      </div>`,
  },
  {
    key: 10,
    slug: "chuyen-doi-so-can-chu-trong-phat-trien-cac-nen-tang-so",
    name: "[ CHUYỂN ĐỔI SỐ ] Cần chú trọng phát triển các nền tảng số",
    date: "12/08/2023",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
      "/images/news/471316540_584909587619249_5501939241938060355_n.jpg",
    ],
    content:
    `<div class="content">
        <p><img alt="" src="/images/news/471269226_584909557619252_4627278620778445829_n.jpg" style="width: 100%;"><img alt="" src="https://tayho360.vn/upload/admin/images/471301021_584909534285921_3437783605431989052_n.jpg" style="width: 100%;"></p>
      </div>`
  }
];
const route = useRoute();
const slug = route.params.slug;
const news = newss.find((news) => news.slug === slug) || {
  name: "Sự kiện không tìm thấy",
};

const router = useRouter();
const goToDetailPage = (news) => {
  router.push(`/news/${news.slug}`);
};
</script>

<style scoped>
.section-news {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto 40px;
  padding: 0 15px;
}

.span-2 {
  grid-column: span 2;
}

.section-title {
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 15px;
}

.content {
  font-size: 25px;
  line-height: 1.6;
  color: #000;
  text-align: justify;
}

.color-gray { color: #6c757d; }
.title { font-size: 22px; padding-right: 5px; }

.nuxt-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer
}

.news-name {
  font-size: clamp(20px, 3vw, 30px);
  margin-bottom: 20px;
  color: #585d61;
  text-transform: uppercase;
}

.news-header {
  font-size: 35px;
  margin-bottom: 20px;
  color: #585d61;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto 40px;
  padding: 0 15px;
}

.news-items {
  width: 100%;
}

.news-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
}

.news-title {
  font-size: 25px;
  margin: 12px 0 8px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-date {
  color: #666;
  font-size: 20px;
}

@media (max-width: 992px) {
  .section-news {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .span-2 {
    grid-column: auto;
  }
}

@media (max-width: 600px) {
  .news-image {
    height: 180px;
  }
  .title {
    font-size: 18px;
  }
  .news-name, .news-header {
    font-size: 20px;
  }
  .news-title {
    font-size: 16px;
  }
}

.pattern {
  position: relative;

  overflow: hidden;
}

.pattern::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/pattern.jpg");
  background-size: 1100px 700px;
  background-position: center;
  background-repeat: repeat;
  filter: blur(0px);
  z-index: 0;
  mask-image: linear-gradient(
    to bottom,

    transparent 0%,

    black 20%,
    black 80%,
    transparent 100%
  );

  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 80%,
    transparent 100%
  );

  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

.pattern > * {
  position: relative;
  z-index: 1;
}
</style>
