<template>
    <div class="banner-image">
        <img
            src="/public/images/news/chua_ngoc_truc.jpg"
            alt="Hình ảnh banner du lịch"
        />
    </div>
    <div class="pattern">
        <div class="section-event">
            <div class="span-2 mt-60">

                <div>
                    <h1 class="schedule-title">{{ tour.title }}</h1>
                    <p class="description-content">{{ tour.description }}</p>
                </div>

                <h2 class="schedule-title">LỊCH TRÌNH</h2>
                <div class="schedule-day">
                    <div class="schedule-tabs">
                        <div
                            v-for="(day, idx) in tour.schedule"
                            :key="idx"
                            :class="['schedule-tab', { active: selectedDayIdx === idx }]"
                            @click="selectDay(idx)"
                        >
                            Ngày {{ day.day }}
                        </div>
                    </div>
                    <div
                        v-for="(activity, aIdx) in tour.schedule[selectedDayIdx].activities"
                        :key="aIdx"
                        class="timeline-item show-desktop"
                    >
                        <div class="timeline-margin">
                            <img class="timeline-img" :src="activity.image" alt="" v-if="aIdx % 2 === 0"/>

                            <div v-if="aIdx % 2 === 1">
                                <div class="timeline-time">{{ activity.time }}</div>
                                <div class="timeline-title">{{ activity.title }}</div>
                                <div class="timeline-desc">{{ activity.description }}</div>
                            </div>
                        </div>
                        <div class="timeline-center">
                            <div class="timeline-dot"></div>
                            <div class="timeline-line"></div>
                        </div>
                        <div class="timeline-margin">
                            <img class="timeline-img" :src="activity.image" alt="" v-if="aIdx % 2 === 1"/>

                            <div v-if="aIdx % 2 === 0">
                                <div class="timeline-time">{{ activity.time }}</div>
                                <div class="timeline-title">{{ activity.title }}</div>
                                <div class="timeline-desc">{{ activity.description }}</div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-for="(activity, aIdx) in tour.schedule[selectedDayIdx].activities"
                        :key="aIdx"
                        class="timeline-item show-mobile"
                    >
                        <div class="timeline-margin">
                            <img class="timeline-img" :src="activity.image" alt="" />

                            <div class="timeline-content">
                                <div class="timeline-time">{{ activity.time }}</div>
                                <div class="timeline-title">{{ activity.title }}</div>
                                <div class="timeline-desc">{{ activity.description }}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="mt-60">
                <div id="map_DM"></div>
                <div class="info-box">
                    <div class="info-content">
                        <svg width="24" height="24" style="margin-right: 20px;" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#5f60c2" cx="18" cy="18" r="18"></circle><circle fill="#5f60c2" cx="18" cy="18" r="14"></circle><path fill="#fff" d="M19 18a1 1 0 1 1-2 0V7a1 1 0 0 1 2 0v11z"></path><path fill="#fff" d="M26.66 23a.998.998 0 0 1-1.365.367l-7.795-4.5a.999.999 0 1 1 1-1.732l7.795 4.5A.998.998 0 0 1 26.66 23z"></path></g></svg>                    
                        {{ tour.start_date }} - {{ tour.end_date }}
                    </div>
                    <div class="info-content">
                        <svg width="30" height="30" style="margin-right: 15px;" viewBox="0 0 8.4666669 8.4666669" id="svg8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs2"></defs> <g id="layer1" transform="translate(0,-288.53332)"> <path d="m 15.996094,0.99609375 c -6.0632836,0 -10.9980445,4.93673065 -10.9980471,11.00000025 -3.8e-6,10.668737 10.3789061,18.779297 10.3789061,18.779297 0.364612,0.290384 0.881482,0.290384 1.246094,0 0,0 10.380882,-8.11056 10.380859,-18.779297 C 27.003893,5.9328244 22.059377,0.99609375 15.996094,0.99609375 Z m 0,6.00195315 c 2.749573,0 5.00585,2.2484784 5.005859,4.9980471 C 21.001971,14.7457 18.745685,17 15.996094,17 c -2.749591,0 -4.998064,-2.2543 -4.998047,-5.003906 9e-6,-2.7495687 2.248474,-4.9980471 4.998047,-4.9980471 z" id="path929" style="color:#5f60c2;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#5f60c2;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#5f60c2;solid-opacity:1;vector-effect:none;fill:#5f60c2;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.99999988;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke fill markers;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" transform="matrix(0.26458333,0,0,0.26458333,0,288.53332)"></path> </g> </g></svg>
                        {{ tour.address }}
                    </div>
                    <div class="info-content">
                        <svg width="24" height="24" style="margin-right: 20px;" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#5f61c2" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>tag_fill_round [#5f61c2]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2959.000000)" fill="#5f61c2"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M129.020148,2805.2265 C128.444271,2805.2265 127.976892,2804.76459 127.976892,2804.19545 C127.976892,2803.62631 128.444271,2803.1644 129.020148,2803.1644 C129.596025,2803.1644 130.063404,2803.62631 130.063404,2804.19545 C130.063404,2804.76459 129.596025,2805.2265 129.020148,2805.2265 M143.388913,2809.64763 L139.933649,2806.2328 L139.933649,2806.2328 C134.061161,2800.42903 135.435129,2801.81888 133.157701,2799.41861 C132.961569,2799.22477 132.696582,2799 132.420119,2799 L126.085469,2799 C124.933714,2799 124,2800.15684 124,2801.29511 L124,2807.5546 C124,2807.82886 124.109542,2808.09075 124.304631,2808.28458 C128.396281,2812.32732 125.450126,2809.41564 134.536886,2818.39606 C135.351669,2819.20131 136.672431,2819.20131 137.487214,2818.39606 L137.487214,2818.39606 C142.018074,2813.91926 141.012376,2814.91215 143.388913,2812.56343 C144.203696,2811.75818 144.203696,2810.45287 143.388913,2809.64763" id="tag_fill_round-[#5f61c2]"> </path> </g> </g> </g> </g></svg>                        
                        {{ tour.money }}
                    </div>
                    <div>
                        <button class="info-book-tour-btn">Đặt tour</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="tour-title-name">
        <h3 class="tour-name">Các Tour Khác</h3>
    </div>
    <div class="tour-list">
        <div class="tour-item-container" v-for="(item, idx) in tours.slice(-3)" :key="idx" @click="goToDetailPage(item)">
            <img :src="item.image" :alt="item.title" class="tour-image" />
            <div class="tour-content">
                <div class="tour-title">{{ item.title }}</div>
                <div class="tour-date">
                    <svg fill="#fff" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 612 612" xml:space="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M306,87.735c-120.352,0-218.265,97.914-218.265,218.266S185.648,524.266,306,524.266s218.266-97.912,218.266-218.265 S426.352,87.735,306,87.735z M420.801,328.658H306c-12.513,0-22.658-10.145-22.658-22.656V166.306 c0-12.513,10.143-22.656,22.658-22.656c12.513,0,22.656,10.145,22.656,22.656v117.037h92.145 c12.513,0,22.658,10.145,22.658,22.658C443.457,318.513,433.315,328.658,420.801,328.658z"></path> <path d="M306,0C137.272,0,0,137.272,0,306.002C0,474.73,137.272,612,306,612s306-137.27,306-305.998C612,137.272,474.728,0,306,0z M306,564.923C163.23,564.923,47.077,448.77,47.077,306C47.077,163.228,163.228,47.074,306,47.074 c142.77,0,258.923,116.154,258.923,258.926C564.923,448.77,448.77,564.923,306,564.923z"></path> </g> </g> </g></svg>                        
                    {{ item.start_date }} - {{ item.end_date }}</div>
                <div class="tour-address">
                    <svg fill="#fff" viewBox="0 0 32 32" style="height: 30px; width: 30px; fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer1"> <path d="M16,2c-6.071,0 -11,4.929 -11,11c0,2.778 1.654,6.081 3.699,9.019c2.939,4.224 6.613,7.707 6.613,7.707c0.386,0.365 0.99,0.365 1.376,-0c0,-0 3.674,-3.483 6.613,-7.707c2.045,-2.938 3.699,-6.241 3.699,-9.019c0,-6.071 -4.929,-11 -11,-11Zm0,5.5c-3.036,0 -5.5,2.464 -5.5,5.5c0,3.036 2.464,5.5 5.5,5.5c3.036,-0 5.5,-2.464 5.5,-5.5c0,-3.036 -2.464,-5.5 -5.5,-5.5Zm0,2c1.932,0 3.5,1.568 3.5,3.5c0,1.932 -1.568,3.5 -3.5,3.5c-1.932,-0 -3.5,-1.568 -3.5,-3.5c0,-1.932 1.568,-3.5 3.5,-3.5Z"></path> </g> </g></svg>
                    {{ item.address }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const goToDetailPage = (tour) => {
  router.push(`/travel-tour/${tour.slug}`)
};

const selectedDayIdx = ref(0)
const selectDay = idx => selectedDayIdx.value = idx

const tours = [
  {
    image: '/images/travel-tour/lang-xua.jpg',
    title: 'Về Làng Xưa – Đại Mỗ Cổ Trấn',
    slug: 've-lang-xua-dai-mo-co-tran',
    description: "Khám phá vẻ đẹp văn hóa và lịch sử của Đại Mỗ qua tour du lịch độc đáo này.",
    start_date: '2025/12/19',
    end_date: '2025/12/19',
    money: "0 VNĐ",
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
    schedule: [
        { 
            day: 1, 
            activities: [
                {
                    time: '08:00',
                    title: 'Điểm khởi đầu – Cổng đình & Đình Đại Mỗ',
                    description: 'Bắt đầu tại cổng đình Đại Mỗ, với kiến trúc nghi môn mang dấu ấn cổ kính, nối vào sân đình rợp bóng hai hàng cây',
                    image: '/images/maps/Cong-lang.jpg',
                },
                {
                    time: '09:00',
                    title: 'Nhà thờ họ Nguyễn',
                    description: 'Tiếp tục đến nhà từ đường dòng họ Nguyễn Quý, nơi thờ ba vị đại vương tài danh với những bức hoành phi, bia cổ từ thế kỷ XVIII, tranh lụa và di vật quý giá được lưu giữ đến ngày nay.',
                    image: '/images/travel-tour/nha-tho-ho-nguyen.jpg',
                },
                {
                    time: '10:00',
                    title: 'Đền Hàm Rồng & cầu đá Thiên Khánh',
                    description: `
                        Tản bộ qua cầu đá Thiên Khánh – cây cầu đá xanh độc đáo, từng do Nguyễn Quý Đức xây dựng, chạm mộng rồng lân, là lối giao thương xưa nối đền và đình làng.\n
                        Gặp gỡ Đền Hàm Rồng – nằm sát dòng sông Nhuệ, thờ chung các vị thành hoàng đình làng, không gian thanh tĩnh với nhiều cổ thụ và vườn cây lâu năm.\n
                    `,
                    image: '/images/travel-tour/den-ham-rong.jpg',
                },
                {
                    time: '12:00',
                    title: 'Nghỉ trưa và thưởng thức ẩm thực địa phương',
                    description: 'Ăn trưa tại một quán cơm hoặc quán quê gần đình, với các món Bắc bộ đậm vị: cơm dĩa, canh rau đồng quê, cá đồng hoặc rau luộc…',
                    image: '/images/travel-tour/am-thuc-hue.jpg',
                },
                {
                    time: '13:00',
                    title: 'Hoạt động trải nghiệm/văn hóa',
                    description: 'Tham gia hoạt động như kể chuyện truyền thống về ba vị Đại vương Nguyễn Quý và làng Đại Mỗ – một phần di sản trí thức lâu đời',
                     image: '/images/travel-tour/hoat-dong.jpg',
                },
                {
                    time: '14:00',
                    title: 'Đi bộ qua xóm thôn cũ',
                    description: `
                        Khám phá các xóm cổ như Khế Ngang, Huyền Phố, An Thái, Phú Thứ – từng là các đơn vị hành chính của làng Đại Mỗ xưa.\n
                        Thấy dấu tích nghề dệt lĩnh, nghề dát trang kim hoặc thủ công truyền thống – đặc sản của vùng đất hiếu học và giàu truyền thống văn hóa này.\n
                    `,
                     image: '/images/travel-tour/xom-thon-cu.jpg',
                },
                {
                    time: '15:00',
                    title: 'Ngõ làng, giếng cổ và khám phá phố cổ',
                    description: 'Men theo ngõ nhỏ lát đá hoặc bê tông cũ, đi qua những bức tường gạch, mái ngói rêu phong, sân đình, giếng làng – tái hiện dáng vẻ làng quê xưa.',
                    image: '/images/travel-tour/ngo-lang.jpg',
                },
                {
                    time: '16:00',
                    title: 'Dừng chân thư giãn',
                    description: 'Ghé một quán cà phê sân vườn ven đình hoặc nhà dân địa phương: nhâm nhi trà sen hoặc chè truyền thống, cảm nhận không khí làng quê truyền thống cổ kính.',
                    image: '/images/travel-tour/thu-gian.jpg',
                }
            ]
        },
    ],
  },
  {
    image: '/images/travel-tour/di-san-dai-mo.jpg',
    title: 'Hành trình Di sản Đại Mỗ',
    slug: 'hanh-trinh-di-san-dai-mo',
    description: "Khám phá di sản văn hóa và lịch sử của Đại Mỗ qua hành trình thú vị.",
    start_date: '2025/12/19',
    end_date: '2025/12/19',
    money: "0 VNĐ",
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
    schedule: [
        { 
            day: 1, 
             activities: [
                {
                    time: '08:00',
                    title: 'Khám phá Đình Đại Mỗ',
                    description: `
                        Khởi đầu tại ngôi đình đã được Bộ Văn hóa xếp hạng di tích quốc gia vào năm 1993. Đình thờ Ả Lã Nàng Đê và ba vị Đại vương họ Nguyễn Quý – nhân vật lịch sử tiêu biểu từ thế kỷ XVIII.\n
                        Kiến trúc đình gồm cổng nghi môn, hai dải vũ và tòa đình hình chữ "Nhị" với mái lợp ngói, khung gỗ lim chạm khắc rồng phượng tinh xảo.
                    `,
                    image: '/images/di-tich/Dinh-Dai-Mo.jpg',
                },
                {
                    time: '09:00',
                    title: 'Đền Hàm Rồng & Cầu đá Thiên Khánh',
                    description: `
                        Đi bộ đến Đền Hàm Rồng dọc sông Nhuệ, nơi thờ Thủy Hải Long Vương và Ả Lã Nàng Đê, với một cây duối hàng trăm tuổi tạo không khí trang nghiêm, cổ kính.\n
                        Băng qua cầu đá Thiên Khánh – cây cầu đá xanh độc đáo, bạn sẽ cảm nhận được vẻ đẹp hoài cổ và sự bình yên của nơi đây.
                    `,
                    image: '/images/travel-tour/den-ham-rong.jpg',
                },
                {
                    time: '11:00',
                    title: 'Ngõ làng & giếng làng xưa',
                    description: `
                        Tản bộ qua những ngõ nhỏ lát gạch, tường gạch rêu phong, giếng làng cổ – mang lại cảm giác làng quê Bắc Bộ thuần túy và bình dị.\n
                        Bạn sẽ thấy những dấu tích của nghề dệt lĩnh, nghề dát trang kim truyền thống – đặc sản của vùng đất hiếu học và giàu truyền thống văn hóa này.`,
                    image: '/images/travel-tour/ngo-lang.jpg',
                },
                {
                    time: '12:00',
                    title: 'Nghỉ trưa và thưởng thức ẩm thực địa phương',
                    description: 'Ăn trưa tại một quán cơm hoặc quán quê gần đình, với các món Bắc bộ đậm vị: cơm dĩa, canh rau đồng quê, cá đồng hoặc rau luộc…',
                    image: '/images/travel-tour/am-thuc-hue.jpg',
                },
                {
                    time: '13:00',
                    title: 'Tham gia hoạt động văn hóa',
                    description: 'Tham gia các hoạt động văn hóa truyền thống của địa phương.',
                    image: '/images/travel-tour/Tham-gia-hoat-dong-van-hoa.jpg',
                },
                {
                    time: '15:00',
                    title: 'Khám phá xóm cổ – Khế Ngang, Huyền Phố, An Thái, Phú Thứ',
                    description: `
                        Dạo quanh các xóm cổ từng là bộ phận của Đại Mỗ xưa, cảm nhận dấu tích nghề dệt, thủ công và đời sống làng lâu đời.\n
                        Giao lưu với người dân để nghe kể về lịch sử từng xóm, nghề truyền thống, và hình ảnh làng cổ giữa lòng đô thị.
                    `,
                    image: '/images/travel-tour/xom-co.jpg'
                },
                {
                    time: '17:00',
                    title: 'Thưởng thức ẩm thực',
                    description: 'Thưởng thức ẩm thực địa phương tại nhà hàng nổi tiếng.',
                     image: '/images/travel-tour/Thuong-thuc-am-thuc.jpg',
                }
            ]
        },
    ],
  },
  {
    image: '/images/travel-tour/smart-city.jpg',
    title: 'Đại Mỗ Hiện Đại – Dạo bước giữa đô thị mới',
    slug: 'dai-mo-hien-dai-dao-buoc-giua-do-thi-moi',
    description: "Khám phá Đại Mỗ Hiện Đại – Dạo bước giữa đô thị mới",
    start_date: '2025/12/19',
    end_date: '2025/12/19',
    money: "0 VNĐ",
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
    schedule: [
        { 
            day: 1, 
            activities: [
                {
                    time: '08:00',
                    title: 'Tập trung tại Vinhomes Smart City – Đại Mỗ',
                    description: `
                        Khám phá quảng trường trung tâm, đài phun nước, công viên Nhật.\n
                        Tản bộ hoặc thuê xe đạp quanh hồ điều hòa.
                    `,
                    image: '/images/travel-tour/quang-truong.jpg',
                },
                {
                    time: '09:30',
                    title: 'Tham quan Trung tâm thương mại Vincom Mega Mall Smart City',
                    description: `
                        Khám phá các cửa hàng, thương hiệu nổi tiếng và ẩm thực đa dạng tại Vincom Mega Mall.\n
                        Mua sắm, cà phê, trải nghiệm công nghệ thông minh. Các thương hiệu thời trang, nhà sách, khu giải trí trẻ em.
                    `,
                    image: '/images/travel-tour/trung-tam-thuong-mai.png',
                },
                {
                    time: '11:30',
                    title: 'Ăn trưa tại khu phố ẩm thực Vinhomes',
                    description: 'Thưởng thức các món ăn đa dạng từ ẩm thực Việt Nam đến quốc tế tại khu phố ẩm thực trong khuôn viên Vinhomes Smart City.',
                    image: '/images/travel-tour/am-thuc-vincom.jpg',
                },
                {
                    time: '13:00',
                    title: 'Dạo quanh Công viên thể thao ngoài trời',
                    description: `
                        Hơn 1.000 máy tập thể dục, sân bóng đá, tennis.\n
                        Các hoạt động thể thao ngoài trời như bóng đá, cầu lông, tennis, bóng rổ.\n
                        Không gian xanh mát cho nghỉ ngơi buổi trưa.
                    `,
                    image: '/images/travel-tour/cong-vien-vincoms.jpg',
                },
                {
                    time: '15:00',
                    title: 'Check-in tại Cầu ánh sáng & công viên Nhật Bản',
                    description: 'Vườn thiền, cổng torii, hồ cá Koi – điểm “sống ảo” nổi bật.',
                    image: '/images/travel-tour/cau-anh-sang.jpg',
                },
                {
                    time: '17:00',
                    title: 'Ghé Khu The Miyako – phong cách Nhật hiện đại',
                    description: 'Khám phá kiến trúc, căn hộ mẫu, trải nghiệm cuộc sống tương lai.',
                    image: '/images/travel-tour/khu-miyako.jpg',
                }
            ]
        },
    ],
  },
  {
    image: '/images/travel-tour/mot-ngay-du-ngoan.jpg',
    title: 'Một ngày du ngoạn',
    slug: 'mot-ngay-du-ngoan',
    description: "Khám phá vẻ đẹp của Hồ Tây qua tour du lịch thú vị này.",
    start_date: '2025/12/19',
    end_date: '2025/12/20',
    money: "0 VNĐ",
    address: "Đại Mỗ, Nam Từ Liêm, Hà Nội",
    schedule: [
        { 
            day: 1, 
            activities: [
                {
                    time: '08:00',
                    title: 'Điểm khởi đầu – Cổng đình & Đình Đại Mỗ',
                    description: 'Bắt đầu tại cổng đình Đại Mỗ, với kiến trúc nghi môn mang dấu ấn cổ kính, nối vào sân đình rợp bóng hai hàng cây',
                    image: '/images/maps/Cong-lang.jpg',
                },
                {
                    time: '09:00',
                    title: 'Nhà thờ họ Nguyễn',
                    description: 'Tiếp tục đến nhà từ đường dòng họ Nguyễn Quý, nơi thờ ba vị đại vương tài danh với những bức hoành phi, bia cổ từ thế kỷ XVIII, tranh lụa và di vật quý giá được lưu giữ đến ngày nay.',
                    image: '/images/travel-tour/nha-tho-ho-nguyen.jpg',
                },
                {
                    time: '10:00',
                    title: 'Đền Hàm Rồng & cầu đá Thiên Khánh',
                    description: `
                        Tản bộ qua cầu đá Thiên Khánh – cây cầu đá xanh độc đáo, từng do Nguyễn Quý Đức xây dựng, chạm mộng rồng lân, là lối giao thương xưa nối đền và đình làng.\n
                        Gặp gỡ Đền Hàm Rồng – nằm sát dòng sông Nhuệ, thờ chung các vị thành hoàng đình làng, không gian thanh tĩnh với nhiều cổ thụ và vườn cây lâu năm.\n
                    `,
                    image: '/images/travel-tour/den-ham-rong.jpg',
                },
                {
                    time: '12:00',
                    title: 'Nghỉ trưa và thưởng thức ẩm thực địa phương',
                    description: 'Ăn trưa tại một quán cơm hoặc quán quê gần đình, với các món Bắc bộ đậm vị: cơm dĩa, canh rau đồng quê, cá đồng hoặc rau luộc…',
                    image: '/images/travel-tour/am-thuc-hue.jpg',
                },
                {
                    time: '13:00',
                    title: 'Hoạt động trải nghiệm/văn hóa',
                    description: 'Tham gia hoạt động như kể chuyện truyền thống về ba vị Đại vương Nguyễn Quý và làng Đại Mỗ – một phần di sản trí thức lâu đời',
                     image: '/images/travel-tour/hoat-dong.jpg',
                },
                {
                    time: '14:00',
                    title: 'Đi bộ qua xóm thôn cũ',
                    description: `
                        Khám phá các xóm cổ như Khế Ngang, Huyền Phố, An Thái, Phú Thứ – từng là các đơn vị hành chính của làng Đại Mỗ xưa.\n
                        Thấy dấu tích nghề dệt lĩnh, nghề dát trang kim hoặc thủ công truyền thống – đặc sản của vùng đất hiếu học và giàu truyền thống văn hóa này.\n
                    `,
                     image: '/images/travel-tour/xom-thon-cu.jpg',
                },
                {
                    time: '15:00',
                    title: 'Ngõ làng, giếng cổ và khám phá phố cổ',
                    description: 'Men theo ngõ nhỏ lát đá hoặc bê tông cũ, đi qua những bức tường gạch, mái ngói rêu phong, sân đình, giếng làng – tái hiện dáng vẻ làng quê xưa.',
                    image: '/images/travel-tour/ngo-lang.jpg',
                },
                {
                    time: '16:00',
                    title: 'Dừng chân thư giãn',
                    description: 'Ghé một quán cà phê sân vườn ven đình hoặc nhà dân địa phương: nhâm nhi trà sen hoặc chè truyền thống, cảm nhận không khí làng quê truyền thống cổ kính.',
                    image: '/images/travel-tour/thu-gian.jpg',
                }
            ]
        },
        { 
            day: 2, 
             activities: [
                {
                    time: '08:00',
                    title: 'Khám phá Đình Đại Mỗ',
                    description: `
                        Khởi đầu tại ngôi đình đã được Bộ Văn hóa xếp hạng di tích quốc gia vào năm 1993. Đình thờ Ả Lã Nàng Đê và ba vị Đại vương họ Nguyễn Quý – nhân vật lịch sử tiêu biểu từ thế kỷ XVIII.\n
                        Kiến trúc đình gồm cổng nghi môn, hai dải vũ và tòa đình hình chữ "Nhị" với mái lợp ngói, khung gỗ lim chạm khắc rồng phượng tinh xảo.
                    `,
                    image: '/images/di-tich/Dinh-Dai-Mo.jpg',
                },
                {
                    time: '09:00',
                    title: 'Đền Hàm Rồng & Cầu đá Thiên Khánh',
                    description: `
                        Đi bộ đến Đền Hàm Rồng dọc sông Nhuệ, nơi thờ Thủy Hải Long Vương và Ả Lã Nàng Đê, với một cây duối hàng trăm tuổi tạo không khí trang nghiêm, cổ kính.\n
                        Băng qua cầu đá Thiên Khánh – cây cầu đá xanh độc đáo, bạn sẽ cảm nhận được vẻ đẹp hoài cổ và sự bình yên của nơi đây.
                    `,
                    image: '/images/travel-tour/den-ham-rong.jpg',
                },
                {
                    time: '11:00',
                    title: 'Ngõ làng & giếng làng xưa',
                    description: `
                        Tản bộ qua những ngõ nhỏ lát gạch, tường gạch rêu phong, giếng làng cổ – mang lại cảm giác làng quê Bắc Bộ thuần túy và bình dị.\n
                        Bạn sẽ thấy những dấu tích của nghề dệt lĩnh, nghề dát trang kim truyền thống – đặc sản của vùng đất hiếu học và giàu truyền thống văn hóa này.`,
                    image: '/images/travel-tour/ngo-lang.jpg',
                },
                {
                    time: '12:00',
                    title: 'Nghỉ trưa và thưởng thức ẩm thực địa phương',
                    description: 'Ăn trưa tại một quán cơm hoặc quán quê gần đình, với các món Bắc bộ đậm vị: cơm dĩa, canh rau đồng quê, cá đồng hoặc rau luộc…',
                    image: '/images/travel-tour/am-thuc-hue.jpg',
                },
                {
                    time: '13:00',
                    title: 'Tham gia hoạt động văn hóa',
                    description: 'Tham gia các hoạt động văn hóa truyền thống của địa phương.',
                    image: '/images/travel-tour/Tham-gia-hoat-dong-van-hoa.jpg',
                },
                {
                    time: '15:00',
                    title: 'Khám phá xóm cổ – Khế Ngang, Huyền Phố, An Thái, Phú Thứ',
                    description: `
                        Dạo quanh các xóm cổ từng là bộ phận của Đại Mỗ xưa, cảm nhận dấu tích nghề dệt, thủ công và đời sống làng lâu đời.\n
                        Giao lưu với người dân để nghe kể về lịch sử từng xóm, nghề truyền thống, và hình ảnh làng cổ giữa lòng đô thị.
                    `,
                    image: '/images/travel-tour/xom-co.jpg'
                },
                {
                    time: '17:00',
                    title: 'Thưởng thức ẩm thực',
                    description: 'Thưởng thức ẩm thực địa phương tại nhà hàng nổi tiếng.',
                     image: '/images/travel-tour/Thuong-thuc-am-thuc.jpg',
                }
            ]
        },
    ],
  },
]

const route = useRoute()
const slug = route.params.slug;
const tour = tours.find(item => item.slug === slug) || { name: 'Tour không tìm thấy' };

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

<style scoped>
    .banner-image {
        width: 100vw;
        height: 80vh;
        overflow: hidden;
        position: relative;
    }

    .banner-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
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

    .mt-60 {
        margin-top: 60px;
    }

    .tour-title-name {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        max-width: 1400px;
        margin: 20px auto 0 auto;
        justify-content: center;
    }

    .tour-name {
        font-size: 30px;
        margin-bottom: 20px;
        text-transform: uppercase;
        color: #585d61;
        font-weight: normal;
    }

    .description-content {
        font-size: 20px;
        color: #333;
        margin-bottom: 20px;
    }

    .span-2 {
        grid-column: span 2;
    }

    .color-gray {
        color: #6c757d;
        font-weight: normal;
    }

    .tour-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        max-width: 1200px;
        margin: 10px auto 40px auto;
        justify-content: center;
    }

    .tour-item-container {
        width: 430px;
        border-radius: 20px;
        overflow: hidden;
        background: #8690d3;
        box-shadow: 0 4px 16px rgba(0,0,0,0.13);
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;
        position: relative;
    }

    .tour-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
        display: block;
        transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
    }

    .tour-item-container:hover .tour-image {
        transform: scale(1.12);
        z-index: 0;
    }

    .tour-content {
        padding: 16px 16px;
        color: #fff;
        background: #8690d3;
        z-index: 1;
    }

    .tour-date,
    .tour-address {
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 0.3;
        margin: 5px;
    }

    .tour-title {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .info-box {
        border: 1px solid #1a237e;
        background: #fff;
        padding: 20px 40px;
    }

    .info-content {
        display: flex;
        margin-bottom: 10px;
    }

    .info-book-tour-btn {
        background-color: #fff;
        border: 2px solid #5c64af;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    }

    .info-book-tour-btn:hover {
        background-color: #5c64af;
        color: #fff;
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

    .schedule-title {
        font-size: 28px;
        color: #5f60c2;
        margin-bottom: 16px;
        text-transform: uppercase;
    }

    .schedule-day-title {
        font-size: 22px;
        color: #333;
        margin: 24px 0 16px 0;
        font-weight: bold;
    }

    .timeline-item {
        display: grid;
        grid-template-columns: 1fr 60px 1fr;
        align-items: center;
        position: relative;
    }

    .timeline-img {
        display: flex;
        justify-content: start;
        width: 100%;
        height: 300px;
        border-radius: 14px;
        box-shadow: 0 8px 32px rgba(50, 50, 100, 0.28);
    }

    .timeline-center {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        min-width: 60px;
    }

    .timeline-dot {
        width: 20px;
        height: 20px;
        background: #5f60c2;
        border-radius: 50%;
        border: 4px solid #fff;
        box-shadow: 0 0 0 2px #5f60c2;
        z-index: 2;
    }

    .timeline-line {
        width: 2px;
        flex: 1;
        background: repeating-linear-gradient(
            to bottom,
            #5f60c2 0 10px,
            transparent 5px 20px
        );
        margin: 0;
    }

    .timeline-time {
        font-size: 26px;
        font-weight: bold;
        color: #5f60c2;
    }

    .timeline-title {
        font-size: 25px;
        font-weight: bold;
        color: #222;
        margin: 10px 0;
    }

    .timeline-desc {
        font-size: 20px;
        color: #000;
        text-align: justify;
        white-space: pre-line;
    }

    .timeline-margin {
        margin: 20px 0;
    }

    .schedule-tabs {
        display: flex;
        gap: 16px;
        margin-bottom: 18px;
        margin-top: 10px;
    }

    .schedule-tab {
        padding: 8px 24px;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        font-size: 20px;
        color: #5c5d63;
        border-radius: 8px 8px 0 0;
        transition: all 0.2s;
    }

    .schedule-tab.active {
        border-bottom: 3px solid #5f60c2;
        color: #222;
        font-weight: bold;
    }

    .show-mobile {
        display: none;
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

    .tour-list {
        grid-template-columns: 1fr;
    }

    .tour-item-container {
        width: 90%;
    }

    .section-title {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }

    .span-2 {
        grid-column: span 1;
        padding: 0 20px;
    }

    .tour-name {
        padding: 0 20px;
    }

    #map_DM {
        width: 100vw !important;
        min-height: 60vh;
        max-width: 100%;
    }
    
    .show-desktop {
        display: none;
    }

    .show-mobile {
        display: block;
    }

    .timeline-content {
        margin: 20px 0;
    }
}
</style>
