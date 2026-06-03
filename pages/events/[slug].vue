<template>
    <div class="section-title">
        <div style="display: flex;">
            <h3 class="title">Sự kiện</h3>
            <h3 class="title color-gray"> /{{ event.name }}</h3>
        </div>
    </div>
    <div class="pattern">
        <div class="section-event">
            <div class="span-2">
                <h3 class="event-name">{{ event.name }}</h3>
                <div class="event-main-content">
                    <swiper
                        :modules="[Navigation, Autoplay]"
                        navigation
                        :autoplay="{ delay: 3000, disableOnInteraction: false }"
                        class="mySwiper"
                    >
                        <swiper-slide v-for="(img, idx) in event.image" :key="idx">
                        <img :src="img" style="width:100%;object-fit:cover;" />
                        </swiper-slide>
                    </swiper>
                    <p class="event-content">{{ event.content }}</p>
                </div>
            </div>
            <div>
                <h3 class="map-name">BẢN ĐỒ</h3>
                <div style="position: relative;">
                    <div id="map_DM"></div>
                    <button class="btn" @click="goToMap">Xem chỉ đường</button>
                </div>
                <div class="info-box">
                    <div class="info-content">
                        <svg width="30" height="30" style="margin-right: 15px;" viewBox="0 0 8.4666669 8.4666669" id="svg8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs> <g id="layer1" transform="translate(0,-288.53332)"> <path d="m 15.996094,0.99609375 c -6.0632836,0 -10.9980445,4.93673065 -10.9980471,11.00000025 -3.8e-6,10.668737 10.3789061,18.779297 10.3789061,18.779297 0.364612,0.290384 0.881482,0.290384 1.246094,0 0,0 10.380882,-8.11056 10.380859,-18.779297 C 27.003893,5.9328244 22.059377,0.99609375 15.996094,0.99609375 Z m 0,6.00195315 c 2.749573,0 5.00585,2.2484784 5.005859,4.9980471 C 21.001971,14.7457 18.745685,17 15.996094,17 c -2.749591,0 -4.998064,-2.2543 -4.998047,-5.003906 9e-6,-2.7495687 2.248474,-4.9980471 4.998047,-4.9980471 z" id="path929" style="color:#5f60c2;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#5f60c2;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#5f60c2;solid-opacity:1;vector-effect:none;fill:#5f60c2;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.99999988;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke fill markers;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" transform="matrix(0.26458333,0,0,0.26458333,0,288.53332)"></path> </g> </g></svg>
                        {{ event.address }}
                    </div>
                    <div class="info-content">
                        <svg width="30" height="30" style="margin-right: 15px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#5f60c2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        {{ event.phone }}
                    </div>
                    <div class="info-content">
                        <svg width="24" height="24" style="margin-right: 20px;" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#5f60c2" cx="18" cy="18" r="18"></circle><circle fill="#5f60c2" cx="18" cy="18" r="14"></circle><path fill="#fff" d="M19 18a1 1 0 1 1-2 0V7a1 1 0 0 1 2 0v11z"></path><path fill="#fff" d="M26.66 23a.998.998 0 0 1-1.365.367l-7.795-4.5a.999.999 0 1 1 1-1.732l7.795 4.5A.998.998 0 0 1 26.66 23z"></path></g></svg>                    
                        {{ event.date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="section-title">
        <h3 class="event-name">Sự kiện liên quan</h3>
    </div>
    <div class="event-list">
        <div class="event-item" v-for="item in events.slice(-3)" :key="item.key">
            <NuxtLink :to="`/events/${item.slug}`" class="event-link">
                <img :src="item.image[0]" :alt="item.name" class="event-image" />
                <h4 class="event-title">{{ item.name }}</h4>
                <p class="event-date">{{ item.date }}</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { NuxtLink } from '#components';

const events = [
  {
    key: 1,
    slug: "phuong-dai-mo-to-chuc-cong-bo-va-trao-cac-quyet-dinh-cua-ub-mttq-viet-nam-va-cac-to-chuc-chinh-tri-xa-hoi",
    name: "Phường Đại Mỗ tổ chức công bố và trao các Quyết định của UB.MTTQ Việt Nam và các tổ chức chính trị - xã hội",
    date: "16/7/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/phuong-dai-mo.jpg',
        '/images/events/phuong-dai-mo1.jpg',
        '/images/events/phuong-dai-mo2.jpg',
        '/images/events/phuong-dai-mo3.jpg'
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Phường Đại Mỗ tổ chức công bố và trao các Quyết định của UB.MTTQ Việt Nam và các tổ chức chính trị - xã hội.\n
        Sáng ngày 16/7/2025, UB.MTTQ Việt Nam phường Đại Mỗ đã tổ chức hội nghị công bố và trao các Quyết định của UB.MTTQ Việt Nam và các tổ chức chính trị - Xã hội tại phường Đại Mỗ.\n
        Dự hội nghị có đại diện lãnh đạo các Ban của UB.MTTQ Việt Nam Thành phố Hà Nội; các đồng chí Thường trực, BTV Đảng ủy, Thường trực HĐND, lãnh đạo UBND, UB.MTTQ Việt Nam phường, các tổ chức chính trị - xã hội thuộc phường; các đồng chí Bí thư chi bộ, Tổ trưởng TDP, Trưởng Ban công tác mặt trận các TDP trên địa bàn phường.`
  },
  {
    key: 2,
    slug: "tuoi-tre-phuong-dai-mo-ra-quan-tong-ve-sinh-moi-truong-huong-ung-ngay-chu-nhat-xanh-va-thuc-hien-cong-trinh-den-on-dap-nghia",
    name: "TUỔI TRẺ PHƯỜNG ĐẠI MỖ RA QUÂN TỔNG VỆ SINH MÔI TRƯỜNG HƯỞNG ỨNG NGÀY “CHỦ NHẬT XANH” VÀ THỰC HIỆN CÔNG TRÌNH “ĐỀN ƠN ĐÁP NGHĨA”",
    date: "24/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/chu-nhat-xanh.jpg',
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Sáng ngày 20/7, Đoàn Thanh niên phường Tây Mỗ - phường Đại Mỗ, Chi đoàn 9 - Đoàn cơ sở E31 - Bộ Tư lệnh Cảnh sát cơ động đã tổ chức ra quân tổng vệ sinh môi trường hưởng ứng Ngày “Chủ nhật xanh” và thực hiện công trình “Đền ơn đáp nghĩa”.\n
        Hoạt động được triển khai đồng loạt tại nhiều địa điểm như: Nghĩa trang liệt sĩ Tây Mỗ – Đại Mỗ; Đài tưởng niệm các anh hùng liệt sĩ tại tổ dân phố số 3, 5, 17, 18; các di tích lịch sử (đình, chùa); cùng các tuyến phố, ngõ dân cư, khu vực công cộng trên địa bàn phường.\n
        Đặc biệt, đợt ra quân lần này diễn ra trong điều kiện thời tiết không thuận lợi sau trận dông lốc lớn xảy ra chiều qua (19/7), gây ảnh hưởng nghiêm trọng đến hệ thống cây xanh, cảnh quan môi trường. Mặc dù gặp nhiều khó khăn, lực lượng đoàn viên thanh niên và chiến sĩ cảnh sát cơ động vẫn phát huy tinh thần trách nhiệm, khẩn trương triển khai các phần việc được phân công với thái độ nghiêm túc và tinh thần xung kích.\n
        Các phần việc chính được tập trung thực hiện gồm: tổng dọn vệ sinh, phát quang bờ bụi, xử lý rác thải tồn đọng, chỉnh trang khu vực nghĩa trang liệt sĩ, các đài tưởng niệm và di tích lịch sử; vệ sinh môi trường tại các khu dân cư, ngõ phố, nơi làm việc và sinh sống. Đoàn Thanh niên tổ chức căng treo cờ quanh khu vực Nghĩa trang liệt sĩ, vận động các hộ dân xung quanh treo cờ Tổ quốc.
    `
  },
  {
    key: 3,
    slug: "phuong-dai-mo-tri-an-cac-anh-hung-liet-sy-tai-nghia-trang-liet-sy-dai-mo-tay-mo",
    name: "Phường Đại Mỗ tri ân các anh hùng liệt sỹ tại Nghĩa trang Liệt sỹ Đại Mỗ - Tây Mỗ",
    date: "24/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/tri-an-anh-hung.jpg',
        '/images/events/tri-an-anh-hung1.jpg',
        '/images/events/tri-an-anh-hung2.jpg',
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Nhân kỷ niệm 78 năm Ngày Thương binh - Liệt sĩ (27/7/1947-27/7/2025), sáng ngày 24/7, đoàn đại biểu của Đảng ủy - HĐND - UBND - UB.MTTQ Việt Nam phường Đại Mỗ đã tổ chức dâng hương, dâng hoa tri ân, tưởng niệm các Anh hùng Liệt sĩ, Bà mẹ Việt Nam anh hùng tại Nghĩa trang Liệt sĩ Tây Mỗ - Đại Mỗ.\n
        Tham gia đoàn có các đồng chí Thường trực, BTV Đảng uỷ, Thường trực HĐND, lãnh đạo UBND, UB.MTTQ Việt Nam phường; cùng lãnh đạo các phòng, ban, ngành, đoàn thể, công chức, viên chức, người lao động thuộc phường.\n
        Trong không khí trang nghiêm thành kính và lòng biết ơn vô hạn, các đồng chí lãnh đạo cùng cán bộ, công chức, viên chức phường Đại Mỗ đã thành kính đặt vòng hoa, dâng hương và dành một phút mặc niệm tưởng nhớ các Bà Mẹ Việt Nam anh hùng, các Anh hùng liệt sĩ - những người con ưu tú của dân tộc đã không tiếc máu xương làm nên những chiến công hào hùng, bất khuất, tô thắm lá cờ đỏ sao vàng của Tổ quốc, là niềm tự hào của dân tộc Việt Nam, vì lý tưởng cách mạng, vì hòa bình và hạnh phúc của Nhân dân.
    `
  },
  {
    key: 4,
    slug: "chuong-trinh-nghe-thuat-nhung-buoc-chan-lang-le",
    name: "CHƯƠNG TRÌNH NGHỆ THUẬT \"NHỮNG BƯỚC CHÂN LẶNG LẼ\"",
    date: "12/08/2023",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/buoc-chan-lang-le.jpg',
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Phát biểu khai mạc chương trình nghệ thuật, ông Nguyễn Đình Khuyến, Phó Bí thư Quận uỷ, Chủ tịch UBND quận Tây Hồ khẳng định, sinh ra và lớn lên trong bão táp cách mạng, lực lượng Công an nhân dân đã góp công lớn trong việc bảo vệ chính quyền nhân dân non trẻ, chống thù trong giặc ngoài. Ngày nay, lực lượng Công an nhân dân càng thấm nhuần 6 lời dạy của Chủ tịch Hồ Chí Minh, ra sức nâng cao tinh thần cảnh giác, nỗ lực xây dựng và phát triển lực lượng, dựa vào sức mạnh tổng hợp, xây dựng Chủ nghĩa xã hội, bảo vệ vững chắc Tổ quốc Việt Nam.\n
        Chủ tịch UBND quận Tây Hồ cho biết, nhân dịp kỷ niệm 78 năm ngày truyền thống lực lượng Công an nhân dân, quận Tây Hồ tổ chức chương trình nghệ thuật “Những bước chân lặng lẽ” trong tiết trời thu tháng 8 mát mẻ, bên hồ Tây thơ mộng - một trong những thắng cảnh đẹp nổi tiếng ở thủ đô Hà Nội, nơi có nhiều di tích lịch sử văn hóa gắn liền với lịch sử hình thành, phát triển của kinh thành Thăng Long xưa và Hà Nội ngày nay.
    `
  },
  {
    key: 5,
    slug: "ky-niem-75-nam-ngay-truyen-thong-luc-luong-tnxp-viet-nam-doan-thanh-nien-phuong-dai-mo-tham-hoi-tang-qua-cuu-thanh-nien-xung-phong-tieu-bieu-tren-dia-ban-phuong",
    name: "KỶ NIỆM 75 NĂM NGÀY TRUYỀN THỐNG LỰC LƯỢNG TNXP VIỆT NAM: ĐOÀN THANH NIÊN PHƯỜNG ĐẠI MỖ THĂM HỎI, TẶNG QUÀ CỰU THANH NIÊN XUNG PHONG TIÊU BIỂU TRÊN ĐỊA BÀN PHƯỜNG",
    date: "15/7/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/doan-thanh-nien.jpg'
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Trong 02 ngày 14,15/7/2025, Đoàn Thanh niên phường Đại Mỗ đã đến nhà thăm hỏi sức khỏe, đời sống và kính tặng những phần quà ý nghĩa tới các bác cựu thanh niên xung phong tiêu biểu trên địa bàn phường. Tại các điểm đến, tuổi trẻ phường đã ân cần trò chuyện, bày tỏ lòng biết ơn sâu sắc trước sự hy sinh, cống hiến của các bác cựu TNXP - những người từng "xẻ dọc Trường Sơn đi cứu nước" trong thời kỳ gian khó của đất nước. Đồng thời, các đoàn viên, thanh niên cũng được nghe kể lại những câu chuyện cảm động, những bài học về ý chí và tinh thần trách nhiệm mà thế hệ trẻ hôm nay cần gìn giữ và phát huy.\n
        Đây là một trong những hoạt động có ý nghĩa thiết thực hướng tới kỷ niệm 75 năm ngày truyền thống lực lượng TNXP Việt Nam - lực lượng đã góp phần làm nên những trang sử hào hùng của dân tộc. Đồng thời, hoạt động cũng thể hiện tinh thần kế thừa, tiếp nối giữa các thế hệ, góp phần giáo dục truyền thống cách mạng cho đoàn viên thanh niên phường Đại Mỗ. Trong thời gian tới, Đoàn phường sẽ tiếp tục triển khai nhiều hoạt động tri ân, tình nguyện, góp phần xây dựng phường Đại Mỗ ngày càng văn minh, nghĩa tình và giàu bản sắc.
    `
  },
  {
    key: 6,
    slug: "huong-toi-ky-niem-78-nam-ngay-thuong-binh-liet-si-27-7-1947-27-7-2025",
    name: "Hướng tới kỷ niệm 78 năm Ngày Thương binh – Liệt sĩ (27/7/1947 – 27/7/2025)",
    date: "21/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/ky-niem.jpg',
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Tổ chức các hoạt động kỷ niệm 78 năm ngày Thương binh – Liệt sĩ (27/07/1947 – 27/07/2025) nhằm tuyên truyền tổ chức thực hiện đồng bộ chính sách, pháp luật về ưu đãi người có công với cách mạng, giáo dục truyền thống yêu nước, chủ nghĩa anh hùng cách mạng cho cán bộ, đảng viên và các tầng lớp nhân dân, nhất là thế hệ trẻ; Tiếp tục đẩy mạnh phong trào đền ơn đáp nghĩa, huy động nguồn lực trong xã hội góp phần thực hiện tốt các chủ chương, đường lối của Đảng, chính sách pháp luật Nhà nước về công tác ưu đãi người có công với cách mạng.\n
        Qua đó, nhiều hoạt động trọng tâm sẽ được triển khai hướng tới kỷ niệm 78 năm ngày Thương binh - Liệt sĩ (27/7/1947 - 27/7/2025) như: Ở cấp Trung ương, Bộ Nội vụ sẽ chủ trì, phối hợp các Bộ, Ban, ngành Trung ương và địa phương trình Chính phủ ban hành Nghị định thay thế Nghị định quy định chi tiết Pháp lệnh Ưu đãi người có công với cách mạng; trình Chính phủ ban hành Nghị định điều chỉnh chế độ trợ cấp hàng tháng đối với thanh niên xung phong đã hoàn thành nhiệm vụ trong kháng chiến giai đoạn 1965-1975...`
  },
  {
    key: 7,
    slug: "chuong-trinh-nghe-thuat-dac-biet-vu-dieu-ket-doan",
    name: "CHƯƠNG TRÌNH NGHỆ THUẬT ĐẶC BIỆT \"VŨ ĐIỆU KẾT ĐOÀN\"",
    date: "19/11/2023",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/vu-dieu.png',
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Vào tối ngày 18/11/2023, nhằm Kỷ niệm 20 năm Ngày hội Đại đoàn kết toàn dân tộc – Kỷ niệm 93 năm Ngày Truyền thống MTTQ Việt Nam, UBND Quận Tây Hồ đã tổ chức Ngày hội Đại đoàn kết toàn dân tộc cấp Thành phố để chào mừng Đại hội đại biểu Mặt Trận Tổ Quốc Việt Nam các cấp nhiệm kỳ 2024 - 2029 tại Không gian biểu diễn nghệ thuật, ẩm thực đường phố Quận Tây Hồ. Chương trình nhằm mục đích phát huy sức mạnh khối Đại đoàn kết toàn dân tộc, động viên tinh thần, cổ vũ Nhân dân vượt qua khó khăn, thách thức, đồng thời cũng là dịp để cán bộ, nhân dân ôn lại lịch sử, truyền thống vẻ vang của Mặt trận Tổ quốc Việt Nam, khẳng định sức mạnh đại đoàn kết toàn dân trong sự nghiệp giải phóng dân tộc, thống nhất đất nước, tham gia xây dựng và bảo vệ Tổ quốc, đẩy mạnh tình đoàn kết hữu nghị và hội nhập Quốc tế hiện nay.\n
        Chương trình sử dụng âm nhạc là đường dây xuyên suốt và tập trung kể câu chuyện về hành trình lớn mạnh của khối đại đoàn kết các dân tộc đang sinh sống tại thành phố Hà Nội. Bắt đầu từ những “mạch nguồn văn hiến", những di sản tinh hoa của các dân tộc khác nhau được thế giới công nhận. Những “mạch nguồn” đó đã hội tụ tại Thủ đô Hà Nội, nơi lắng hồn núi sông ngàn năm, theo dòng lịch sử dựng nước, chống giặc ngoại xâm, đi qua những khó khăn, vững vàng kiến tạo sắc màu dấu ấn thủ đô và trái tim hồng của cả nước. Cho đến hôm nay cán bộ, nhân dân tại Hà Nội cùng thể hiện sự chung sức đồng lòng trong vũ điệu kết đoàn và hướng tới tương lai. Mạch nội dung chính của chương trình nghệ thuật được hình tượng hóa như sự phát triển của hoa ƯƠM TỎA – NGÁT HƯƠNG - KHOE SẮC.
    `
  },
  {
    key: 8,
    slug: "huong-toi-ky-niem-78-nam-ngay-thuong-binh-liet-si",
    name: "Hướng tới kỷ niệm 78 năm Ngày Thương binh – Liệt sĩ (27/7/1947 – 27/7/2025)",
    date: "21/07/2025",
    address: "Số 123, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội",
    phone: "0123 456 789",
    image: [
        '/images/events/huong-toi-ky-niem.jpg',
    ],
    map: "https://www.google.com/maps/place/Dai+Mo,+Nam+T%E1%BB%AB+Li%C3%AAm,+Hanoi,+Vietnam/@20.9979616,105.7436009,15z/data=!3m1!4b1!4m10!1m2!2m1!1zU-G7kSAxMjMsIFBoxrDhu51uZyDEkOG6oWkgTeG7lywgUXXhuq1uIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWk!3m6!1s0x3134536a55039567:0xc2711b127c475a95!8m2!3d20.9898009!4d105.7615252!15sCkFT4buRIDEyMywgUGjGsOG7nW5nIMSQ4bqhaSBN4buXLCBRdeG6rW4gTmFtIFThu6sgTGnDqm0sIEjDoCBO4buZaZIBDHN1YmxvY2FsaXR5MaoBdRABKgwiCHPhu5EgMTIzKEIyHxABIhs4N0JyhkRKcwmeSmALHF3PtdssxxXU_YlYChIyQhACIj5z4buRIDEyMyBwaMaw4budbmcgxJHhuqFpIG3hu5cgcXXhuq1uIG5hbSB04burIGxpw6ptIGjDoCBu4buZaeABAA!16s%2Fg%2F1hb_gp2_k?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    content: `
        Theo đó, Kế hoạch tổ chức các hoạt động Kỷ niệm 78 năm Ngày Thương binh – Liệt sĩ Việt Nam (27/7/1947 – 27/7/2025) hướng tới việc tuyên truyền, tổ chức thực hiện đồng bộ chính sách, pháp luật về ưu đãi người có công với cách mạng nhằm giáo dục truyền thống yêu nước, chủ nghĩa anh hùng cách mạng cho cán bộ, đảng viên và các tầng lớp nhân dân, nhất là thế hệ trẻ; tiếp tục đẩy mạnh phong trào đền ơn đáp nghĩa, huy động nguồn lực trong xã hội góp phần thực hiện tốt các chủ trương, đường lối của Đảng, chính sách, pháp luật của Nhà nước về công tác ưu đãi người có công với cách mạng.\n
        Bộ Nội vụ cũng yêu cầu các hoạt động Kỷ niệm 78 năm ngày Thương binh - Liệt sĩ được tổ chức trang trọng, thiết thực, tiết kiệm, hiệu quả; phân công rõ trách nhiệm các cơ quan, đơn vị trong tổ chức, triển khai thực hiện.\n
        Theo Kế hoạch, các hoạt động trọng tâm tại Trung ương sẽ gồm 08 hoạt động, cụ thể:\n
        (1) Hoàn thiện thể chế chính sách, Bộ Nội vụ sẽ phối hợp cùng các Bộ, Ban, ngành Trung ương và địa phương để hoàn thiện, trình Chính phủ ban hành Nghị định thay thế Nghị định quy định chi tiết Pháp lệnh Ưu đãi người có công với cách mạng (dự kiến vào Quý IV/2025); Trình Chính phủ ban hành Nghị định điều chỉnh chế độ trợ cấp hàng tháng đối với thanh niên xung phong đã hoàn thành nhiệm vụ trong kháng chiến giai đoạn 1965-1975 (dự kiến vào Quý III/2025);\n
        Bộ Nội vụ sẽ phối hợp với Văn phòng Chủ tịch nước, Văn phòng Chính phủ, Bộ Tài chính trình Chủ tịch nước tặng quà cho người có công với cách mạng nhân kỷ niệm 78 năm ngày Thương binh - Liệt sĩ vào tháng 6/2025.\n
        (2) Tập trung chỉ đạo hoàn thành hỗ trợ nhà ở cho người có công với cách mạng, Bộ Xây dựng sẽ phối hợp cùng các Bộ, Ban, ngành Trung ương và địa phương để triển khai, hoàn thành trước ngày 27/7/2025. Kinh phí thực hiện của Trung ương và các địa phương.\n
        (3) Tổ chức Cuộc gặp mặt người có công, nhân chứng lịch sử, Bộ Nội vụ sẽ chủ trì và phối hợp với Bộ Quốc phòng, Bộ Công an, Báo Nhân dân, Đài Truyền hình Việt Nam, Ủy ban nhân dân thành phố Hà Nội tổ chức.`
  }
];

const route = useRoute()
const slug = route.params.slug;
const event = events.find(event => event.slug === slug) || { name: 'Sự kiện không tìm thấy' };

const goToMap = () => {
  const link = event.map;
  window.open(link);
};

const router = useRouter()
const goToDetailPage = (event) => {
  router.push(`/events/${event.slug}`)
};

onMounted(async () => {
  const leafletCss = document.createElement('link')
  leafletCss.rel = 'stylesheet'
  leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  document.head.appendChild(leafletCss)

  await new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = resolve
    document.body.appendChild(script)
  })

  const L = window.L

  const map = L.map('map_DM').setView([20.99355805221358, 105.76017760568965], 16)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)
})

</script>

<style scoped lang="scss">
.mySwiper {
    width: 100%;
    height: 100%;
}

#map_DM {
    width: 100%;
    height: 80vh;
    z-index: 1;
}

.section-event {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    max-width: 1400px;
    margin: 0 auto 40px auto;
    justify-content: center;
}

.section-title {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    max-width: 1400px;
    margin: 20px auto 0 auto;
    justify-content: center;
}

.span-2 {
    grid-column: span 2;
}

.color-gray {
    color: #6c757d;
    font-weight: normal;
}

.title {
    font-size: 25px;
}

.event-name, .map-name {
    font-size: 30px;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: #585d61;
    font-weight: normal;
}

.event-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto 40px auto;
    justify-content: center;
}

.event-image {
    width: 100%;
    height: auto;
}

.event-item {
    width: 450px;
}

.event-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
}

.event-title {
    font-size: 20px;
    margin: 12px 0 8px 0;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.event-content {
    text-align: justify;
    white-space: pre-line;
    margin-bottom: 1.5em;
    line-height: 1.8;
    font-size: 25px;
}

.event-main-content {
    display: flex;
    flex-direction: column;
    gap: 20px; 
}

.event-link {
    text-decoration: none;
    color: inherit;
}

.btn {
    position: absolute;
    top: 0;
    left: 59%;
    background-color: #878edb;
    color: #fff;
    border: none;
    padding: 15px 20px;
    z-index: 10;
    border-radius: 0 0 0 20px;
    cursor: pointer;
    font-size: 20px;
    white-space: nowrap;
}

.info-box {
    border: 1px solid #1a237e;
    background: #fff;
    padding: 20px 40px;
}

.info-content {
    display: flex;
    margin-bottom: 10px;
    font-size: 20px;
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
    background-image: url("/public/images/pattern.jpg");
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

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    background-color: #5c64af;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: #fff;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 600px) {
    .event-list {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }

    .section-event {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .event-item {
        width: 100%;
    }

    .section-title {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }

    .span-2 {
        width: 90%;
        margin: 0 auto;
    }

    .map-name {
        padding: 0 20px;
    }

    #map_DM {
        width: 100vw !important;
        min-height: 60vh;
        max-width: 100%;
    }

    .btn{
        right: 0;
        font-size: 18px;
    }

    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
        background-color: transparent;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        top: 50%;
        transform: translateY(-50%);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
}
</style>