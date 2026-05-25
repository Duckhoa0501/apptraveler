# Roamify - Phần Mềm Du Lịch Chi Tiết & Hướng Dẫn Kỹ Thuật

Roamify là một ứng dụng Web Single Page Application (SPA) cao cấp được xây dựng bằng công nghệ thuần túy (HTML5, Vanilla CSS3, và JavaScript ES6) giúp tối ưu hóa hiệu năng, vận hành mượt mà và giao diện bắt mắt với phong cách Glassmorphism.

Ứng dụng tích hợp sẵn một **Bảng Giải Thích Kỹ Thuật (Developer Console)** ở góc màn hình, giúp lập trình viên hoặc người học dễ dàng theo dõi kiến trúc mã nguồn và sự thay đổi trạng thái (State) của hệ thống theo thời gian thực.

## 📁 Cấu trúc Thư mục

- `index.html`: Khung giao diện HTML5 và giao diện Console giải thích.
- `styles.css`: Hệ thống thiết kế (Design Tokens) HSL, Glassmorphism và hiệu ứng chuyển động.
- `app.js`: Quản lý logic, định tuyến SPA nội bộ, dữ liệu du lịch và Live State.
- `package.json`: Cấu hình hỗ trợ khởi chạy Vite dev server (nếu máy có sẵn Node.js).

## 🚀 Hướng Dẫn Khởi Chạy

Vì dự án được xây dựng bằng công nghệ thuần túy (Vanilla Web), bạn có 2 cách cực kỳ đơn giản để chạy ứng dụng:

### Cách 1: Chạy trực tiếp (Không cần cài đặt)
1. Truy cập vào thư mục `C:\Users\admin\.gemini\antigravity\scratch\travel-app`.
2. Click đúp chuột vào file `index.html` để mở trực tiếp trên trình duyệt của bạn (Chrome, Edge, Safari...).

### Cách 2: Chạy qua Python Local Server (Nếu máy có Python)
Chạy lệnh sau trong Command Prompt / Terminal tại thư mục dự án:
```bash
python -m http.server 8000
```
Sau đó mở trình duyệt và truy cập: `http://localhost:8000`

---

## 💡 Các Tính Năng Đáng Chú Ý Của Ứng Dụng

1. **Khám Phá Địa Điểm**: Tìm kiếm điểm đến và phân lọc theo danh mục (Biển, Núi, Văn hóa...) với bộ lọc phản hồi tức thời.
2. **Đặt Tour Du Lịch**: Điền thông tin và mô phỏng hóa đơn chi tiết, hỗ trợ áp dụng coupon `ROAM50` giảm giá 50%.
3. **Vé Điện Tử Đẹp Mắt**: Sau khi thanh toán thành công, hệ thống tạo ra một Boarding Pass tự động có tên hành khách và thông số tour.
4. **Lập Lịch Trình Chi Tiết**: Cho phép thêm/xóa ngày du lịch, lập lịch trình cụ thể từng hoạt động kèm chi phí, tự động tính tổng chi tiêu.
5. **Tiện Ích Hành Trình**: Dự báo thời tiết động cho từng thành phố và đề xuất danh mục đồ dùng cần đóng gói.
6. **Bảng Giải Thích Kỹ Thuật (Dev Console)**: Bấm nút ở góc dưới bên phải để bật bảng điều khiển hiển thị cấu trúc code, phân tích CSS HSL và xem trực tiếp **dữ liệu JSON State** biến động khi bạn tương tác!
