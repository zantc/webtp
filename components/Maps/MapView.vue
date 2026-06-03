<template>
  <div style="text-align: center">
    <h2 class="section-title">BẢN ĐỒ 360</h2>
  </div>
  <div class="map-container">
    <div id="map_DM"></div>

    <div class="note-list" v-if="showNote && !props.place">
      <div class="calendar-holes">
        <img
          v-for="i in 4"
          :key="i"
          src="/icons/Ellip.png"
          alt="Notes"
          class="box-img-calendar"
        />
      </div>
      <h2 class="note-title">Danh sách điểm đến</h2>
      <ul>
        <li>
          <input
            type="checkbox"
            v-model="selectAll"
            @change="handleChange('all')"
          />
          Chọn tất cả
        </li>
        <li v-for="item in noteList" :key="item.key">
          <input
            type="checkbox"
            :value="item.key"
            v-model="checkedList"
            @change="handleChange()"
          />
          {{ item.title }}
        </li>
      </ul>
      <div class="btn-hide" @click="showNote = false">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15 7L10 12L15 17"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <div v-if="!showNote && !props.place" class="btn-show-note" @click="showNote = true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="matrix(-1, 0, 0, 1, 0, 0)"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M18.3636 7.75736L16.9494 6.34315L11.2926 12L16.9494 17.6569L18.3636 16.2426L14.121 12L18.3636 7.75736Z"
            fill="#fff"
          ></path>
          <path
            d="M11.2926 6.34315L12.7068 7.75736L8.46417 12L12.7068 16.2426L11.2926 17.6568L5.63574 12L11.2926 6.34315Z"
            fill="#fff"
          ></path>
        </g>
      </svg>
    </div>

    <button class="btn" @click="goToMap" v-if="props.place">Xem chỉ đường</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import  allMockData from "~/public/allMockData.json";

const props = defineProps<{ place?: any }>();

const goToMap = () => {
  const map = props.place.map || "https://www.google.com/maps";
  window.open(map);
};

const noteList = [
  {
    key: 1,
    title: "Di tích văn hóa lịch sử",
  },
  {
    key: 2,
    title: "Danh lam",
  },
  {
    key: 3,
    title: "Lễ hội",
  },
  {
    key: 4,
    title: "Làng nghề",
  },
  {
    key: 5,
    title: "Cơ quan hành chính",
  },
  {
    key: 6,
    title: "Trung tâm hội nghị sự kiện",
  },
  {
    key: 7,
    title: "Khách sạn",
  },
  {
    key: 8,
    title: "Nhà hàng quán ăn",
  },
  {
    key: 9,
    title: "Dịch vụ hỗ trợ du lịch",
  },
];

const selectAll = ref(true);
const checkedList = ref(noteList.map((item) => item.key));
const showNote = ref(true);

const handleChange = (type?: "all") => {
  if (type === "all") {
    checkedList.value = selectAll.value ? noteList.map((item) => item.key) : [];
  } else {
    selectAll.value = checkedList.value.length === noteList.length;
  }
};

// Leaflet types
import type * as L from "leaflet";

onMounted(async () => {
  // Load CSS Leaflet
  const leafletCss = document.createElement("link");
  leafletCss.rel = "stylesheet";
  leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(leafletCss);

  // Load JS Leaflet từ CDN
  await new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = resolve;
    document.body.appendChild(script);
  });

  const L = (window as any).L as typeof import("leaflet");

  // Khởi tạo bản đồ
  const map = L.map("map_DM").setView(
    [20.996661711588775, 105.7709099134942],
    15
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  const redIcon = {
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [35, 57] as [number, number],
    iconAnchor: [17, 57] as [number, number],
    popupAnchor: [1, -57] as [number, number],
    shadowSize: [57, 57] as [number, number],
  };

  const markers: any[] = [];
  const allLocations = Object.values(allMockData).flat();

  function renderMarkers() {
    markers.forEach((marker) => marker.remove());
    markers.length = 0; 
    // Nếu có props.place thì chỉ hiển thị marker đó
    let filtered;
    if (props.place) {
      filtered = [props.place]
    } else {
      filtered = allLocations.filter(loc => typeof loc.type === 'number' && checkedList.value.includes(loc.type as number))
    }
    filtered.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: L.icon({...redIcon, iconUrl: location.iconUrl}),
      }).addTo(map);
      marker.bindTooltip(location.name);

      marker.on("click", () => {
        const popupContent = `
              <div>
                <div style="text-align: center;">
                  <img src="${location.imageUrl}" alt="${location.name}" style="width: 100%; height: 170px; object-fit: cover; border-radius: 5px;">
                </div>
                <div style="margin-top: 0">
                  <p style="margin-bottom: 5px; font-weight: bold;">${location.name}</p>
                  <p style="margin-top: 0;">Địa chỉ: ${location.address}</p>
                </div>
              </div>
            `;
        const popup = L.popup({ autoPan: true })
          .setLatLng([location.lat, location.lng])
          .setContent(popupContent)
          .openOn(map);
      });

      markers.push(marker);
    });
  }
  renderMarkers();
  watch(checkedList, renderMarkers);
});
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 70vh;
}
#map_DM {
  width: 100%;
  height: 70vh;
  z-index: 1;
}
.note-list {
  position: absolute;
  top: 0;
  left: 70px;
  background-color: #878edb;
  padding: 20px 60px;
  width: 300px;
  height: 400px;
  z-index: 9;
  border-radius: 0 20px 20px 0;
  transition: 1s;
}
.btn-show-note {
  position: absolute;
  left: 50px;
  top: 10px;
  z-index: 10000;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: #5c64af;
  color: #fff;
  font-size: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: 0.3s;
}
.btn-hide {
  position: absolute;
  right: -30px;
  top: 180px;
  opacity: 1;
  transition: 0.5s;
  z-index: 9999;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: #5c64af;
  color: #fff;
}
.calendar-holes {
  position: absolute;
  left: -25px;
  top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 9999;
}
.box-img-calendar {
  width: 60px;
  height: 60px;
}
.note-title {
  color: #ffffff;
  font-size: 24px;
}
.note-list ul {
  list-style: none;
  padding-left: 0;
}
.note-list li {
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 8px;
}
.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}
.section-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #333;
  margin: 0.5rem auto 0;
}

.btn {
  position: absolute;
  top: 0;
  left: 90%;
  background-color: #878edb;
  color: #fff;
  border: none;
  padding: 15px 20px;
  z-index: 10;
  border-radius: 0 0 0 20px;
  cursor: pointer;
  white-space: nowrap;
}

@media (max-width: 600px) {
 .note-title {
  color: #ffffff;
  font-size: 17px;
 }

 .note-list {
  position: absolute;
  top: 0;
  left: 30px;
  background-color: #878edb;
  padding: 10px 40px;
    /* THAY ĐỔI Ở ĐÂY: Bỏ width cố định và thay bằng fit-content */
  width: fit-content;
  height: 350px;
  z-index: 9;
  border-radius: 0 20px 20px 0;
  transition: 1s;
 }

 .note-list li {
  color: #ffffff;
  font-size: 15px;
  margin-bottom: 8px;
    white-space: nowrap;
 }

 .box-img-calendar {
  width: 40px;
  height: 40px;
 }

 .calendar-holes {
  position: absolute;
  left: -15px;
  top: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  z-index: 9999;
 }

 .btn-hide {
  top: 120px;
 }

 .btn {
  left: 67%;
 }
}
</style>
