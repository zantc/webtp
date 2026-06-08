# Dự án VN

tính năng dùng chung:
    -Trải nghiệm cốt lõi: Xem không gian VR 360 độ, di chuyển qua lại giữa các điểm tham quan
    -Xem thông tin: Đọc bài viết giới thiệu về "Di tích", "Danh lam", xem danh sách "Khách sạn"
    -Tìm kiếm & Điều hướng: Sử dụng thanh tìm kiếm địa điểm, xem bản đồ khu du lịch
    -Tài khoản: Nút Đăng ký và Đăng nhập.
Tính năng dành riêng cho Người dùng (User)
    -Quản lý hồ sơ: Đổi ảnh đại diện (avatar), cập nhật họ tên, đổi mật khẩu,...
    -Tương tác (Nếu có): Thích (Like) hoặc Viết bình luận/đánh giá (Review) trải nghiệm tại một ngôi chùa hay khách sạn.
    -Lưu trữ: Nút "Lưu địa điểm" (Bookmark) yêu thích để xem lại sau này mà không cần tìm kiếm.
    -Lời chào & Avatar: Góc phải hiện ra ảnh đại diện tròn nhỏ kèm dòng chữ "Chào, [Tên người dùng]".
    -Quả chuông Thông báo (Notifications): Kế bên Avatar sẽ xuất hiện biểu tượng Quả chuông.
        Nếu họ từng viết đánh giá về "Chùa Phùng Khoang" và có người thả tim, quả chuông sẽ hiện chấm đỏ (VD: +1).
        Bấm vào chuông sẽ xổ ra list: "Admin đã phản hồi bình luận của bạn tại Chùa Phùng Khoang".
Tính năng của Quản trị viên (Admin)
    Quản lý Nội dung (CRUD): Thêm/Sửa/Xóa các Địa điểm (Chùa, Công viên), Khách sạn, Menu điều hướng.
    Quản lý Ảnh 360: Tải lên các file ảnh Panorama mới, gắn điểm ảnh (hotspot) lên không gian 360.
    Quản lý Người dùng: Xem danh sách toàn bộ tai_khoan trong hệ thống. Có quyền bấm nút Khóa/Mở khóa tài khoản của những User có hành vi phá hoại.
    Thanh Công Cụ Đen (Admin Bar): Đây là một dải băng màu đen mỏng, chạy ngang sát trên cùng mép trình duyệt (Nằm đè lên trên cả thanh Navbar hiện tại của bạn). Tính năng này rất nổi tiếng trên mã nguồn WordPress.
    Các nút "Lối tắt" trên Admin Bar: * ⚡ Trang Quản trị: Bấm vào để bay thẳng vào khu vực Dashboard phía sau.

        ➕ Thêm mới nhanh: Có một nút dấu +. Bấm vào sẽ xổ ra: [Thêm Địa điểm], [Thêm Khách sạn], [Tạo Menu mới]. Admin có thể thêm dữ liệu ngay lập tức mà không cần phải vòng vèo vào tận trang quản trị.

        🛠️ Chế độ Chỉnh sửa: (Đây là tính năng ăn tiền nhất). Ví dụ Admin đang đứng ở bài viết "Đình Phùng Khoang". Trên thanh Admin Bar sẽ hiện nút "Sửa địa điểm này". Bấm một cái là nó mở sẵn form chứa thông tin của Đình để Admin sửa chữ ngay tại chỗ.

    Phân hệ Quản lý Nội dung Văn hóa & Địa điểm
        -Biên tập Bài viết (Rich Text Editor): Nơi viết lại lịch sử, kiến trúc của các Di tích, Danh lam. Nơi này cần trình soạn thảo giống như Microsoft Word để Admin in đậm, chèn ảnh lịch sử, tạo danh sách.

        -Quản lý Bản đồ (Tích hợp Leaflet): Mình để ý trong file package.json của bạn có cài thư viện @types/leaflet (dùng để vẽ bản đồ). Admin sẽ có một giao diện bản đồ, họ chỉ cần click ghim vị trí của ngôi chùa lên bản đồ số, hệ thống sẽ tự lưu vĩ độ/kinh độ (lat, lng) vào Database để hiển thị đường đi cho khách.

        -Thư viện Ảnh (Media Gallery): Ngoài ảnh 360, một địa điểm sẽ có thư viện ảnh 2D bình thường (ảnh góc chụp đẹp, ảnh lễ hội). Admin dùng nơi này để kéo thả, sắp xếp ảnh.
    Phân hệ Quản lý Dịch vụ Lưu trú & Cẩm nang
        -Danh bạ Khách sạn / Nhà hàng: Nơi Admin cập nhật bảng khach_san. Thay đổi số điện thoại, sửa lại danh sách "Tiện nghi" (thêm hồ bơi, cắt wifi...), hoặc cập nhật Link dẫn sang trang web gốc của khách sạn để khách tự đặt phòng.

        -Quản lý Bài viết Cẩm nang: Thêm các bài blog dạng chia sẻ kinh nghiệm (ví dụ: "Ăn gì ở Đại Mỗ?", "Lịch trình chơi 1 ngày").

        -Quản lý Đánh giá / Bình luận (Review Moderation): Mọi bình luận của User tại các địa điểm sẽ đổ về đây. Admin có nhiệm vụ "Duyệt" (Approve) những bình luận hay và "Xóa/Ẩn" (Reject) những bình luận có từ ngữ không phù hợp trước khi nó được hiện công khai lên web.
    Phân hệ Quản lý Trải nghiệm VR 360
        -Quản lý Cảnh (Scenes / Panoramas): Nơi Admin tải lên những bức ảnh toàn cảnh (ảnh dạng Equirectangular). Mỗi bức ảnh đại diện cho một góc nhìn (ví dụ: Cổng chùa, Sân chính, Chánh điện).

        -Trình tạo Điểm chạm (Hotspot Builder): * Hotspot Di chuyển (Portal): Admin được cấp công cụ click lên không gian 360 để gắn mũi tên. Khi khách bấm vào mũi tên ở Cổng chùa, nó sẽ load ảnh 360 của Sân chính. Đây là cách Admin xây dựng một chuyến tham quan ảo (Virtual Tour) xuyên suốt.

            Hotspot Thông tin (Info): Admin gắn các biểu tượng chữ i (Information) hoặc 🎧 (Audio) lên các đồ vật. Ví dụ: Gắn lên một bức tượng Phật, nhập đoạn mô tả chi tiết hoặc tải lên file ghi âm thuyết minh để khi Khách bấm vào thì nó tự động đọc.
        -Tùy biến Menu Động: Chính là giao diện để Admin thao tác với cái bảng menus lúc nãy. Họ có thể thêm một mục mới toanh vào thanh Navbar ngang (Ví dụ thêm mục "Khuyến mãi") chỉ bằng cách gõ tên và chọn parent_id mà không cần bạn phải mở VS Code ra sửa code.
        - Bảng Thống kê Du lịch (Analytics): Không phải biểu đồ doanh thu, mà là biểu đồ tương tác:

     Bản đồ Menu Sidebar chuẩn xác cho Admin
        Khi Admin đăng nhập, thanh menu bên trái (Sidebar) của họ sẽ được phân cấp rõ ràng theo đúng logic nghiệp vụ của một web VR 360, không thừa không thiếu:
        📊 Tổng quan (Dashboard): Thống kê lượt truy cập, tổng số địa điểm, bình luận mới nhất.
        🌐 Quản lý Không gian VR (Core):
            Thư viện Panorama: Nơi upload và lưu trữ ảnh 360 (Tách riêng với ảnh thường vì ảnh 360 dung lượng rất lớn).
            Trình dựng bản đồ ảo (Tour Builder): Giao diện trực quan để nối các ảnh 360 lại với nhau bằng Hotspot.
        📍 Quản lý Điểm đến:
            Di tích & Danh lam: Thêm bài viết, tọa độ bản đồ, gán link ảnh 360 tương ứng.
            Khách sạn & Dịch vụ: Quản lý thông tin lưu trú, tiện nghi, link đặt phòng.
        💬 Quản lý Tương tác:
            Duyệt bình luận: Danh sách các đánh giá của User đang chờ duyệt hoặc bị báo cáo.
        ⚙️ Cài đặt Hệ thống:
            Quản lý Tài khoản: Cấp quyền Admin mới hoặc Khóa tài khoản User vi phạm.
            Cấu hình Menu: Chỉnh sửa thanh điều hướng ngoài trang chủ (bảng menus).


1. Thay đổi tại Thanh điều hướng (Navbar) & Header
    Khách vãng lai (Guest): Chỉ thấy thanh menu điều hướng thông thường (Điểm đến, Cẩm nang...) và cụm nút [Đăng nhập] | [Đăng ký].
    Người dùng (User): Cụm nút đăng nhập biến mất, thay bằng Avatar nhỏ và Tên hiển thị. Có thêm biểu tượng "Trái tim" (hoặc Bookmark) trên thanh Navbar để bấm vào xem nhanh các địa điểm họ đã lưu.
    Quản trị viên (Admin): Ngoài Avatar, Admin sẽ thấy thêm một Thanh công cụ (Admin Bar) màu đen chạy ngang sát mép trên cùng của trình duyệt (giống như thanh của WordPress). Trên thanh này có các lối tắt nhanh: [+ Thêm địa điểm mới], [Quản lý bình luận], [Vào trang Dashboard].
2. Thay đổi bên trong Màn hình Không gian 360 độ (VR View)
    Đây là màn hình cốt lõi của bạn, và sự khác biệt sẽ cực kỳ rõ nét:
    User / Guest: Màn hình hoàn toàn sạch sẽ, góc nhìn rộng (Full-screen). Họ chỉ việc dùng chuột kéo để xoay 360 độ và click vào các điểm Hotspot (dấu +) để di chuyển hoặc xem thông tin.
    Admin: Khi Admin mở trình xem 360 độ, góc màn hình sẽ hiện thêm một bảng công cụ "Chế độ chỉnh sửa (Edit Mode)". Khi bật chế độ này lên:
    Admin có thể click đúp chuột vào bất kỳ đâu trên ảnh 360 để Tạo Hotspot mới ngay lập tức.
    Các Hotspot hiện tại sẽ hiện thêm biểu tượng cây bút chì (Sửa) và thùng rác (Xóa).
    Kéo thả (Drag & Drop) để dời vị trí các Hotspot bị đặt lệch.
3. Thay đổi tại Trang Chi tiết (Ví dụ: Chi tiết Chùa, Khách sạn)
    User / Guest: Chỉ xem được nội dung (hình ảnh, bài viết, số điện thoại, tiện nghi). Cuối trang có khu vực để họ bấm [Thích] và ô nhập liệu để viết [Bình luận / Đánh giá].
    Admin: Sẽ thấy các nút "Quyền lực" xuất hiện ngay cạnh tiêu đề bài viết:
    Nút [Sửa bài viết]: Bấm vào sẽ đổi giao diện chữ bình thường thành các ô Input/Textarea để gõ lại nội dung trực tiếp.
    Nút [Ẩn địa điểm]: Nếu khách sạn đó đóng cửa, Admin bấm nút này để User không thấy nữa, nhưng dữ liệu vẫn còn trong Database.
    Khung Quản lý bình luận: Admin sẽ có nút [Xóa bình luận] ngay bên dưới bình luận của User khác nếu họ chat những từ ngữ không phù hợp.

4. Thay đổi về Bố cục trang (Layout) - Vùng không gian riêng
    Đây là sự khác biệt lớn nhất về mặt cấu trúc code trong Nuxt:
Với Người dùng (User): Trang Hồ Sơ (Profile)
    Bố cục vẫn giữ nguyên Navbar và Footer của trang web chính.
    Nội dung ở giữa là một bảng điều khiển đơn giản với các tab dọc:
    Thông tin cá nhân (Đổi tên, cập nhật avatar).
    Bảo mật (Đổi mật khẩu).
    Địa điểm đã lưu (Danh sách các thẻ card khách sạn/danh lam mà họ đã thả tim).
Với Quản trị viên (Admin): Trang Bảng Điều Khiển (Admin Dashboard)
    Thoát ly hoàn toàn khỏi giao diện web chính. Hệ thống sẽ chuyển sang một Layout hoàn toàn khác (không còn Navbar du lịch, không còn hình nền 360).
    Sidebar bên trái (Menu dọc): Chứa các danh mục quản lý cốt lõi:
        📊 Tổng quan (Thống kê lượt truy cập, tổng số user).
        🗺️ Quản lý Địa điểm (Thêm/Sửa/Xóa dữ liệu vào bảng dia_diem).
        🏨 Quản lý Khách sạn (Tác động vào bảng khach_san).
        👥 Quản lý Người dùng (Danh sách tài khoản, nút Khóa tài khoản).
    Khu vực chính giữa: Là các Bảng dữ liệu (Table) khổng lồ có thanh tìm kiếm, phân trang (Pagination) và bộ lọc để Admin dễ dàng quản lý hàng nghìn bản ghi.