// ==========================================
// APP.JS — Roamify v2.0
// Single Page Application
// Tính năng: Auth, Admin/User, Light/Dark, VI/EN
// ==========================================

// ── 1. GLOBAL STATE ──────────────────────────────────────────
const AppState = {
  currentTab: 'tab-explore',
  lang: 'vi',
  isDark: false,
  isLoggedIn: false,
  currentUser: null,
  authMode: 'login',
  itinerary: {
    days: [{ id: 1, label: 'Ngày 1', activities: [] }],
    currentDayIndex: 0,
  },
  explore: {
    activeFilter: 'all',
    searchQuery: '',
    bookingTarget: null,
    promoApplied: false,
  },
  admin: {
    bookings: [],
    tours: [],
  },
  ui: {
    explanationOpen: false,
    activeExpTab: 'architecture',
    activeExpIndex: 0,
  },
};

// ── 2. DATA ───────────────────────────────────────────────────
const USERS_DB = [
  { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin Roamify' },
  { username: 'user', password: 'user123', role: 'user', name: 'Khách Hàng Demo' },
];

const DESTINATIONS_DATA = [
  {
    id: 1, category: 'beach',
    title: 'Phú Quốc Thiên Đường',
    titleEn: 'Phu Quoc Paradise',
    location: 'Kiên Giang', locationEn: 'Kien Giang',
    desc: 'Bãi biển xanh ngọc bích, rừng nhiệt đới nguyên sinh và những resort đẳng cấp thế giới.',
    descEn: 'Crystal-clear beaches, pristine tropical forests and world-class resorts.',
    price: '4,200,000', code: 'RM-PQ-0294', rating: 4.9, reviews: 312,
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
  },
  {
    id: 2, category: 'mountain',
    title: 'Hà Giang Mùa Hoa',
    titleEn: 'Ha Giang Bloom Season',
    location: 'Hà Giang', locationEn: 'Ha Giang',
    desc: 'Vùng cao nguyên đá huyền thoại với cung đường đèo ngoạn mục và sắc hoa tam giác mạch.',
    descEn: 'Legendary rocky plateau with spectacular mountain passes and buckwheat flower fields.',
    price: '3,500,000', code: 'RM-HG-0581', rating: 4.8, reviews: 218,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
  },
  {
    id: 3, category: 'culture',
    title: 'Hội An Phố Cổ',
    titleEn: 'Hoi An Ancient Town',
    location: 'Quảng Nam', locationEn: 'Quang Nam',
    desc: 'Phố cổ UNESCO với đèn lồng lung linh, kiến trúc cổ kính và ẩm thực đặc sắc.',
    descEn: 'UNESCO ancient town with glowing lanterns, historic architecture and unique cuisine.',
    price: '2,800,000', code: 'RM-HA-0729', rating: 4.7, reviews: 485,
    image: 'https://images.unsplash.com/photo-1559592414-e56e2f4f9673?w=800&q=80',
  },
  {
    id: 4, category: 'beach',
    title: 'Đà Nẵng Sơn Trà',
    titleEn: 'Da Nang Son Tra',
    location: 'Đà Nẵng', locationEn: 'Da Nang',
    desc: 'Thành phố biển sôi động với bãi Mỹ Khê thơ mộng và bán đảo Sơn Trà hoang dã.',
    descEn: 'Vibrant coastal city with the scenic My Khe beach and wild Son Tra peninsula.',
    price: '3,100,000', code: 'RM-DN-0438', rating: 4.8, reviews: 567,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
  },
  {
    id: 5, category: 'adventure',
    title: 'Hang Sơn Đoòng',
    titleEn: 'Son Doong Cave',
    location: 'Quảng Bình', locationEn: 'Quang Binh',
    desc: 'Khám phá hệ thống hang động lớn nhất thế giới – trải nghiệm chỉ dành cho 1000 người mỗi năm.',
    descEn: 'Explore the world\'s largest cave system — an experience limited to 1000 people per year.',
    price: '69,000,000', code: 'RM-QB-0001', rating: 5.0, reviews: 89,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    id: 6, category: 'culture',
    title: 'Vịnh Hạ Long',
    titleEn: 'Ha Long Bay',
    location: 'Quảng Ninh', locationEn: 'Quang Ninh',
    desc: 'Di sản thế giới UNESCO với hàng nghìn đảo đá vôi hùng vĩ trên làn nước ngọc bích.',
    descEn: 'UNESCO World Heritage with thousands of limestone islands on jade-green waters.',
    price: '5,500,000', code: 'RM-HL-0162', rating: 4.9, reviews: 721,
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80',
  },
];

const WEATHER_DATA = {
  halong: { temp: 27, status: 'Mây Rải Rác', statusEn: 'Partly Cloudy', icon: '⛅', humidity: 72, wind: 14, forecast: [
    { day: 'T3', dayEn: 'Wed', icon: '⛅', temp: '26°' },
    { day: 'T4', dayEn: 'Thu', icon: '🌧️', temp: '24°' },
    { day: 'T5', dayEn: 'Fri', icon: '🌦️', temp: '25°' },
    { day: 'T6', dayEn: 'Sat', icon: '☀️', temp: '28°' },
  ]},
  phuquoc: { temp: 29, status: 'Nắng Đẹp', statusEn: 'Sunny', icon: '☀️', humidity: 65, wind: 12, forecast: [
    { day: 'T3', dayEn: 'Wed', icon: '☀️', temp: '30°' },
    { day: 'T4', dayEn: 'Thu', icon: '⛅', temp: '28°' },
    { day: 'T5', dayEn: 'Fri', icon: '☀️', temp: '31°' },
    { day: 'T6', dayEn: 'Sat', icon: '☀️', temp: '29°' },
  ]},
  hagiang: { temp: 18, status: 'Sương Mù', statusEn: 'Foggy', icon: '🌫️', humidity: 88, wind: 8, forecast: [
    { day: 'T3', dayEn: 'Wed', icon: '🌫️', temp: '17°' },
    { day: 'T4', dayEn: 'Thu', icon: '⛅', temp: '20°' },
    { day: 'T5', dayEn: 'Fri', icon: '☀️', temp: '22°' },
    { day: 'T6', dayEn: 'Sat', icon: '⛅', temp: '19°' },
  ]},
  hoian: { temp: 30, status: 'Nắng Gắt', statusEn: 'Hot & Sunny', icon: '🌞', humidity: 70, wind: 10, forecast: [
    { day: 'T3', dayEn: 'Wed', icon: '☀️', temp: '31°' },
    { day: 'T4', dayEn: 'Thu', icon: '🌤️', temp: '29°' },
    { day: 'T5', dayEn: 'Fri', icon: '🌦️', temp: '27°' },
    { day: 'T6', dayEn: 'Sat', icon: '☀️', temp: '30°' },
  ]},
};

const PACKING_LIST = [
  { id: 'pk1', vi: 'Hộ chiếu / CMND còn hạn', en: 'Valid Passport / ID Card' },
  { id: 'pk2', vi: 'Vé máy bay & voucher khách sạn', en: 'Flight tickets & hotel vouchers' },
  { id: 'pk3', vi: 'Bảo hiểm du lịch', en: 'Travel Insurance' },
  { id: 'pk4', vi: 'Kem chống nắng SPF 50+', en: 'Sunscreen SPF 50+' },
  { id: 'pk5', vi: 'Thuốc say sóng / say xe', en: 'Motion sickness medication' },
  { id: 'pk6', vi: 'Quần áo phù hợp thời tiết', en: 'Weather-appropriate clothing' },
  { id: 'pk7', vi: 'Giày đi bộ thoải mái', en: 'Comfortable walking shoes' },
  { id: 'pk8', vi: 'Bộ sạc và cáp điện thoại', en: 'Phone charger & cables' },
  { id: 'pk9', vi: 'Tiền mặt địa phương', en: 'Local cash / currency' },
  { id: 'pk10', vi: 'Balo du lịch / Túi xách nhỏ', en: 'Day backpack / small bag' },
];

// ── 3. i18n DICTIONARY ────────────────────────────────────────
const DICTIONARY = {
  // NAVBAR
  nav_explore:    { vi: 'Khám Phá',    en: 'Explore' },
  nav_itinerary:  { vi: 'Lịch Trình',  en: 'Itinerary' },
  nav_utilities:  { vi: 'Tiện Ích',    en: 'Utilities' },
  nav_admin:      { vi: 'Quản Trị',    en: 'Admin' },
  nav_login:      { vi: 'Đăng Nhập',   en: 'Login' },
  nav_logout:     { vi: 'Đăng Xuất',   en: 'Logout' },
  // HERO
  hero_title:     { vi: 'Khám Phá Hành Trình Tiếp Theo Của Bạn', en: 'Discover Your Next Journey' },
  hero_desc:      { vi: 'Tìm kiếm các tour du lịch độc quyền, được thiết kế riêng với các điểm đến đẹp nhất Việt Nam.', en: 'Find exclusive tours, specially designed with the most beautiful destinations in Vietnam.' },
  search_label_dest:      { vi: 'Điểm Đến',      en: 'Destination' },
  search_placeholder:     { vi: 'Bạn muốn đi đâu?', en: 'Where do you want to go?' },
  search_label_cat:       { vi: 'Loại Hình',      en: 'Category' },
  cat_all:        { vi: 'Tất Cả',      en: 'All Types' },
  cat_beach:      { vi: 'Du lịch Biển', en: 'Beach Tours' },
  cat_mountain:   { vi: 'Khám phá Núi', en: 'Mountain Treks' },
  cat_culture:    { vi: 'Văn Hóa',     en: 'Cultural' },
  cat_adventure:  { vi: 'Phiêu Lưu',   en: 'Adventure' },
  search_btn:     { vi: 'Tìm Kiếm',    en: 'Search' },
  // EXPLORE PILLS
  sec_title_popular: { vi: 'Điểm Đến Hấp Dẫn', en: 'Top Destinations' },
  pill_all:       { vi: 'Tất cả',      en: 'All' },
  pill_beach:     { vi: 'Biển',        en: 'Beach' },
  pill_mountain:  { vi: 'Núi',         en: 'Mountain' },
  pill_culture:   { vi: 'Văn Hóa',     en: 'Culture' },
  pill_adventure: { vi: 'Phiêu Lưu',   en: 'Adventure' },
  // CARD
  card_book_btn:  { vi: 'Đặt Ngay',    en: 'Book Now' },
  card_review:    { vi: 'đánh giá',    en: 'reviews' },
  // ITINERARY
  itinerary_title: { vi: 'Lên Kế Hoạch Lịch Trình Chi Tiết', en: 'Plan Your Detailed Itinerary' },
  itinerary_days: { vi: 'Các Ngày Đi', en: 'Travel Days' },
  itinerary_add_day: { vi: '+ Thêm Ngày Mới', en: '+ Add New Day' },
  itinerary_del_day: { vi: 'Xóa Ngày', en: 'Delete Day' },
  stats_total_act: { vi: 'Tổng số hoạt động:', en: 'Total activities:' },
  stats_total_cost: { vi: 'Dự kiến chi phí:', en: 'Estimated cost:' },
  act_add_title:  { vi: '+ Thêm Hoạt Động Mới', en: '+ Add New Activity' },
  act_label_time: { vi: 'Thời Gian', en: 'Time' },
  act_label_type: { vi: 'Loại Hình', en: 'Type' },
  act_type_sight: { vi: 'Tham Quan', en: 'Sightseeing' },
  act_type_hotel: { vi: 'Khách Sạn', en: 'Hotel' },
  act_type_dining:{ vi: 'Ẩm Thực',  en: 'Dining' },
  act_type_flight:{ vi: 'Di Chuyển', en: 'Transport' },
  act_label_title: { vi: 'Tên Hoạt Động', en: 'Activity Title' },
  act_placeholder_title: { vi: 'Ví dụ: Ăn sáng đặc sản...', en: 'E.g.: Breakfast at local market...' },
  act_label_cost: { vi: 'Chi Phí (VNĐ)', en: 'Cost (VND)' },
  act_label_note: { vi: 'Ghi Chú', en: 'Notes' },
  act_placeholder_note: { vi: 'Địa chỉ, nhắc nhở...', en: 'Address, reminders...' },
  act_btn_save:   { vi: 'Lưu Hoạt Động', en: 'Save Activity' },
  // UTILITIES
  utils_title:    { vi: 'Công Cụ Hỗ Trợ Chuyến Đi', en: 'Trip Planning Tools' },
  utils_weather_heading: { vi: 'Dự Báo Thời Tiết', en: 'Weather Forecast' },
  utils_weather_sync: { vi: 'Cập nhật tự động', en: 'Auto updated' },
  utils_packing_heading: { vi: 'Đồ Dùng Cần Mang', en: 'Packing Checklist' },
  utils_packing_desc: { vi: 'Tự động gợi ý danh sách chuẩn bị theo địa điểm.', en: 'Smart packing suggestions for your trip.' },
  // AUTH
  auth_card_title_login: { vi: 'Thành Viên Roamify', en: 'Roamify Member' },
  auth_card_desc_login: { vi: 'Đăng nhập tài khoản để quản lý lịch trình du lịch.', en: 'Sign in to manage your travel itineraries.' },
  auth_card_title_register: { vi: 'Tạo Tài Khoản Mới', en: 'Create New Account' },
  auth_card_desc_register: { vi: 'Tham gia Roamify để trải nghiệm những chuyến đi tuyệt vời.', en: 'Join Roamify for amazing travel experiences.' },
  auth_tab_login: { vi: 'Đăng Nhập', en: 'Sign In' },
  auth_tab_register: { vi: 'Đăng Ký', en: 'Register' },
  auth_label_username: { vi: 'Tên đăng nhập', en: 'Username' },
  auth_placeholder_user: { vi: 'user hoặc admin', en: 'user or admin' },
  auth_label_email: { vi: 'Email', en: 'Email' },
  auth_label_password: { vi: 'Mật khẩu', en: 'Password' },
  auth_placeholder_pass: { vi: 'user123 hoặc admin123', en: 'user123 or admin123' },
  auth_label_role: { vi: 'Vai trò', en: 'Role' },
  role_user:      { vi: 'Khách hàng (User)', en: 'Customer (User)' },
  role_admin:     { vi: 'Quản trị viên (Admin)', en: 'Administrator (Admin)' },
  auth_btn_submit_login: { vi: 'Đăng Nhập Ngay', en: 'Sign In Now' },
  auth_btn_submit_register: { vi: 'Đăng Ký Miễn Phí', en: 'Register for Free' },
  // ADMIN
  admin_panel_title: { vi: 'Trang Quản Trị Hệ Thống', en: 'System Admin Panel' },
  admin_stat_sales: { vi: 'Doanh Thu', en: 'Revenue' },
  admin_stat_tours: { vi: 'Tổng Số Tour', en: 'Total Tours' },
  admin_stat_bookings: { vi: 'Số Đơn Booking', en: 'Total Bookings' },
  admin_form_heading: { vi: 'Thêm Tour Mới', en: 'Add New Tour' },
  admin_label_title: { vi: 'Tên Tour', en: 'Tour Name' },
  admin_label_loc: { vi: 'Vị Trí', en: 'Location' },
  admin_label_code: { vi: 'Mã Tour', en: 'Tour Code' },
  admin_label_price: { vi: 'Giá Tiền (VNĐ)', en: 'Price (VND)' },
  admin_label_cat: { vi: 'Loại Hình', en: 'Category' },
  admin_label_img: { vi: 'Hình Ảnh (URL)', en: 'Image (URL)' },
  admin_label_desc: { vi: 'Mô Tả Tour', en: 'Tour Description' },
  admin_btn_submit: { vi: 'Đăng Tải Tour', en: 'Publish Tour' },
  admin_table_heading: { vi: 'Danh Sách Khách Đặt Tour', en: 'Booking List' },
  th_passenger: { vi: 'Hành Khách', en: 'Passenger' },
  th_tour:      { vi: 'Tour', en: 'Tour' },
  th_date:      { vi: 'Ngày Đi', en: 'Depart Date' },
  th_guests:    { vi: 'Khách', en: 'Guests' },
  th_total:     { vi: 'Tổng Chi Phí', en: 'Total Cost' },
  th_status:    { vi: 'Trạng Thái', en: 'Status' },
  // BOOKING MODAL
  booking_label_name:   { vi: 'Họ & Tên Trưởng Đoàn', en: 'Lead Passenger Name' },
  booking_label_phone:  { vi: 'Số Điện Thoại', en: 'Phone Number' },
  booking_label_date:   { vi: 'Ngày Khởi Hành', en: 'Departure Date' },
  booking_label_guests: { vi: 'Số Lượng Khách', en: 'Number of Guests' },
  booking_label_service:{ vi: 'Gói Dịch Vụ', en: 'Service Package' },
  service_standard:     { vi: 'Tiêu chuẩn (3⭐)', en: 'Standard (3⭐)' },
  service_premium:      { vi: 'Cao cấp (5⭐ VIP)', en: 'Premium (5⭐ VIP)' },
  bill_title:           { vi: 'Chi Tiết Hóa Đơn', en: 'Bill Summary' },
  bill_base:            { vi: 'Đơn giá cơ bản:', en: 'Base price:' },
  bill_surcharge:       { vi: 'Phụ thu dịch vụ:', en: 'Service surcharge:' },
  bill_qty:             { vi: 'Số lượng khách:', en: 'Number of guests:' },
  bill_discount:        { vi: 'Mã giảm giá (ROAM50):', en: 'Promo (ROAM50):' },
  bill_total:           { vi: 'TỔNG THANH TOÁN:', en: 'TOTAL PAYMENT:' },
  promo_placeholder:    { vi: 'Nhập mã ưu đãi (Thử: ROAM50)', en: 'Enter promo code (Try: ROAM50)' },
  promo_apply_btn:      { vi: 'Áp dụng', en: 'Apply' },
  booking_btn_pay:      { vi: 'Thanh Toán Ngay & Nhận Vé', en: 'Pay Now & Get Ticket' },
  // SUCCESS
  success_modal_title:  { vi: 'Đặt Tour Thành Công!', en: 'Booking Confirmed!' },
  success_heading:      { vi: 'Cảm ơn bạn đã đồng hành cùng Roamify!', en: 'Thank you for traveling with Roamify!' },
  success_sub:          { vi: 'Vé điện tử đã được sinh tự động:', en: 'Your e-ticket has been generated:' },
  tkt_name:  { vi: 'Hành khách', en: 'Passenger' },
  tkt_code:  { vi: 'Mã tour', en: 'Tour code' },
  tkt_dep:   { vi: 'Khởi hành', en: 'Depart from' },
  tkt_dest:  { vi: 'Điểm đến', en: 'Destination' },
  tkt_date:  { vi: 'Ngày đi', en: 'Date' },
  tkt_qty:   { vi: 'Số khách', en: 'Passengers' },
  success_btn_done: { vi: 'Hoàn Tất', en: 'Done' },
  // EXPLANATION
  explanation_btn:   { vi: 'Giải Thích Code & Kiến Trúc', en: 'Code & Architecture Guide' },
  explanation_panel_title: { vi: 'Developer Dashboard', en: 'Developer Dashboard' },
  exp_tab_arch:  { vi: 'Kiến Trúc SPA', en: 'SPA Architecture' },
  exp_tab_state: { vi: 'Quản Lý State', en: 'State Management' },
  exp_tab_style: { vi: 'Thiết Kế CSS', en: 'CSS Design System' },
  exp_tab_live:  { vi: 'Trực Quan Hóa', en: 'Live Visualization' },
};

const EXPLANATION_DATA = {
  architecture: {
    title: '📐 Kiến Trúc Single Page Application',
    titleEn: '📐 Single Page Application Architecture',
    topics: [
      {
        titleVi: '🔍 Tổng quan SPA', titleEn: '🔍 SPA Overview',
        contentVi: 'Roamify sử dụng kiến trúc SPA (Single Page Application) thuần túy, không dùng framework. Toàn bộ giao diện được quản lý bằng JavaScript, các "trang" thực chất là các <section> HTML được ẩn/hiện bằng display:none.',
        contentEn: 'Roamify uses a pure SPA architecture without any framework. The entire UI is managed by JavaScript, and "pages" are HTML <sections> toggled with display:none.',
        code: `// Hàm điều hướng chính
function switchTab(tabId) {
  // Ẩn tab hiện tại
  const prev = document.getElementById(AppState.currentTab);
  if (prev) prev.style.display = 'none';

  // Hiển thị tab mới
  const next = document.getElementById(tabId);
  if (next) next.style.display = 'block';
  
  AppState.currentTab = tabId;
  updateActiveNavItem(tabId);
}`,
        lang: 'javascript',
      },
      {
        titleVi: '🔐 Auth Guard & Route Protection', titleEn: '🔐 Auth Guard & Route Protection',
        contentVi: 'Hệ thống bảo vệ route bằng cách kiểm tra AppState.isLoggedIn trước khi điều hướng. Nếu chưa đăng nhập, user sẽ bị redirect về tab đăng nhập.',
        contentEn: 'Routes are protected by checking AppState.isLoggedIn before navigation. Unauthorized users are redirected to the login tab.',
        code: `function switchTab(tabId) {
  // Auth Guard
  const protectedRoutes = ['tab-itinerary', 'tab-admin'];
  if (protectedRoutes.includes(tabId) && !AppState.isLoggedIn) {
    switchTab('tab-auth');
    return;
  }
  // Admin-only guard
  if (tabId === 'tab-admin' && AppState.currentUser?.role !== 'admin') {
    return; // Chặn truy cập
  }
  // ... điều hướng bình thường
}`,
        lang: 'javascript',
      },
    ],
  },
  state: {
    title: '🧠 Quản Lý State Tập Trung',
    titleEn: '🧠 Centralized State Management',
    topics: [
      {
        titleVi: '📦 Cấu trúc AppState', titleEn: '📦 AppState Structure',
        contentVi: 'Toàn bộ trạng thái ứng dụng được lưu trong một object duy nhất gọi là AppState. Đây là pattern "Single Source of Truth" — mọi thay đổi giao diện đều phải đi qua state này.',
        contentEn: 'All application state is stored in a single AppState object — the "Single Source of Truth" pattern. All UI updates must flow through this state.',
        code: `const AppState = {
  currentTab: 'tab-explore',
  lang: 'vi',           // VI hoặc EN
  isDark: false,        // Light/Dark mode
  isLoggedIn: false,    // Trạng thái auth
  currentUser: null,    // { username, role, name }
  
  itinerary: {
    days: [{ id: 1, label: 'Ngày 1', activities: [] }],
    currentDayIndex: 0,
  },
  
  explore: {
    activeFilter: 'all', // Bộ lọc category
    bookingTarget: null, // Tour đang được đặt
    promoApplied: false, // Mã giảm giá
  },
  
  admin: {
    bookings: [],  // Danh sách đơn đặt
    tours: [],     // Tour admin thêm
  },
};`,
        lang: 'javascript',
      },
      {
        titleVi: '🔄 Luồng Cập Nhật UI', titleEn: '🔄 UI Update Flow',
        contentVi: 'Khi user tương tác → Event Handler cập nhật AppState → Gọi hàm render() tương ứng → DOM được cập nhật. Đây là luồng một chiều (unidirectional data flow).',
        contentEn: 'User interaction → Event Handler updates AppState → Calls corresponding render() → DOM is updated. This is a unidirectional data flow.',
        code: `// Ví dụ: Thêm hoạt động mới
function handleAddActivity() {
  const time = document.getElementById('act-time').value;
  const title = document.getElementById('act-title-input').value;

  // 1. Cập nhật State
  const currentDay = AppState.itinerary.days[AppState.itinerary.currentDayIndex];
  currentDay.activities.push({ time, title, id: Date.now() });

  // 2. Re-render chỉ phần cần thiết
  renderTimeline();
  renderItineraryStats();
}`,
        lang: 'javascript',
      },
    ],
  },
  styling: {
    title: '🎨 Hệ Thống Thiết Kế CSS',
    titleEn: '🎨 CSS Design System',
    topics: [
      {
        titleVi: '🪄 CSS Variables & Design Tokens', titleEn: '🪄 CSS Variables & Design Tokens',
        contentVi: 'Toàn bộ màu sắc, khoảng cách và hiệu ứng được định nghĩa bằng CSS Custom Properties trong :root. Khi chuyển Dark Mode, chỉ cần thay đổi các biến này.',
        contentEn: 'All colors, spacing, and effects are defined as CSS Custom Properties in :root. Dark mode is achieved by simply overriding these variables.',
        code: `:root {
  /* Background */
  --bg-main: hsl(215, 60%, 97%);
  --bg-card: hsla(0, 0%, 100%, 0.88);

  /* Brand Colors */
  --primary: hsl(188, 100%, 38%);
  --secondary: hsl(265, 80%, 55%);
  
  /* Glassmorphism */
  --glass-bg: hsla(0, 0%, 100%, 0.8);
  --backdrop-blur: blur(14px);
}

/* Dark Mode Override */
body.dark-mode {
  --bg-main: hsl(224, 71%, 4%);
  --primary: hsl(180, 100%, 45%);
  --glass-bg: hsla(222, 47%, 7%, 0.65);
}`,
        lang: 'css',
      },
      {
        titleVi: '✨ Glassmorphism Effect', titleEn: '✨ Glassmorphism Effect',
        contentVi: 'Kỹ thuật glassmorphism tạo hiệu ứng kính mờ đẹp mắt bằng backdrop-filter:blur() kết hợp với background có độ trong suốt.',
        contentEn: 'Glassmorphism creates a frosted glass effect using backdrop-filter:blur() combined with semi-transparent backgrounds.',
        code: `.navbar {
  background: var(--glass-bg);         /* Semi-transparent */
  backdrop-filter: var(--backdrop-blur); /* Blur behind */
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

/* Card hover: lift + glow */
.card:hover {
  transform: translateY(-8px);
  border-color: var(--primary);
  box-shadow: 
    0 16px 32px rgba(0,0,0,0.08),
    0 0 18px var(--border-glow); /* Glow effect */
}`,
        lang: 'css',
      },
    ],
  },
  interactive: {
    title: '⚡ Trực Quan Hóa Luồng Dữ Liệu',
    titleEn: '⚡ Live Data Flow Visualization',
    topics: [
      {
        titleVi: '🗂️ Cấu Trúc File Dự Án', titleEn: '🗂️ Project File Structure',
        contentVi: 'Dự án chỉ gồm 3 file: index.html (cấu trúc), styles.css (giao diện), app.js (logic). Không cần build step hay dependency nào.',
        contentEn: 'The project only has 3 files: index.html (structure), styles.css (UI), app.js (logic). No build step or dependencies needed.',
        code: `travel-app/
├── index.html      ← Cấu trúc DOM, 5 sections
├── styles.css      ← Design System (800+ dòng)
│   ├── CSS Variables (Light/Dark tokens)
│   ├── Glassmorphism Components
│   └── Animations & Transitions
└── app.js          ← Logic SPA (~600+ dòng)
    ├── AppState    ← Global state object
    ├── DICTIONARY  ← i18n translations
    ├── EVENT HANDLERS
    └── RENDER FUNCTIONS`,
        lang: 'text',
      },
      {
        titleVi: '🌐 Hệ Thống Đa Ngôn Ngữ i18n', titleEn: '🌐 i18n Multilingual System',
        contentVi: 'Mỗi phần tử HTML có thuộc tính data-i18n với key tương ứng. Khi đổi ngôn ngữ, hệ thống duyệt toàn bộ DOM và thay thế text content theo DICTIONARY.',
        contentEn: 'Each HTML element has a data-i18n attribute with a corresponding key. On language switch, the system scans the DOM and replaces text content from the DICTIONARY.',
        code: `// HTML: Data attribute
<span data-i18n="nav_explore">Khám Phá</span>

// DICTIONARY definition
const DICTIONARY = {
  nav_explore: { vi: 'Khám Phá', en: 'Explore' },
};

// Hàm apply i18n
function applyTranslations() {
  const lang = AppState.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (DICTIONARY[key]) {
      el.textContent = DICTIONARY[key][lang];
    }
  });
}`,
        lang: 'javascript',
      },
    ],
  },
};

// ── 4. UTILITY FUNCTIONS ───────────────────────────────────────
const t = (key) => DICTIONARY[key]?.[AppState.lang] || key;
const fmt = (num) => Number(num).toLocaleString('vi-VN') + ' đ';
const $ = (id) => document.getElementById(id);

function applyTranslations() {
  const lang = AppState.lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (DICTIONARY[key]) el.textContent = DICTIONARY[key][lang];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (DICTIONARY[key]) el.placeholder = DICTIONARY[key][lang];
  });
}

// ── 5. NAVIGATION (SPA ROUTING) ───────────────────────────────
function switchTab(tabId) {
  const protectedRoutes = ['tab-itinerary'];
  if (protectedRoutes.includes(tabId) && !AppState.isLoggedIn) {
    switchTab('tab-auth');
    return;
  }
  if (tabId === 'tab-admin') {
    if (!AppState.isLoggedIn || AppState.currentUser?.role !== 'admin') return;
  }

  const prev = document.getElementById(AppState.currentTab);
  if (prev) prev.style.display = 'none';

  const next = document.getElementById(tabId);
  if (next) next.style.display = 'block';

  AppState.currentTab = tabId;
  updateActiveNavItem(tabId);
  applyTranslations();

  if (tabId === 'tab-itinerary') { renderItinerary(); }
  if (tabId === 'tab-explore') { renderDestinations(); }
  if (tabId === 'tab-admin') { renderAdminPanel(); }
  if (tabId === 'tab-utilities') { renderWeather(); renderPackingList(); }
}

function updateActiveNavItem(tabId) {
  document.querySelectorAll('.nav-item').forEach(li => {
    li.classList.toggle('active', li.dataset.tab === tabId);
  });
}

// ── 6. AUTH ───────────────────────────────────────────────────
function handleLogin(username, password) {
  const user = USERS_DB.find(u => u.username === username && u.password === password);
  if (user) {
    AppState.isLoggedIn = true;
    AppState.currentUser = user;
    updateAuthUI();
    if (user.role === 'admin') {
      switchTab('tab-admin');
    } else {
      switchTab('tab-explore');
    }
    return true;
  }
  return false;
}

function handleRegister(username, password, role) {
  if (USERS_DB.find(u => u.username === username)) return false;
  USERS_DB.push({ username, password, role: role || 'user', name: username });
  return handleLogin(username, password);
}

function handleLogout() {
  AppState.isLoggedIn = false;
  AppState.currentUser = null;
  updateAuthUI();
  switchTab('tab-explore');
}

function updateAuthUI() {
  const user = AppState.currentUser;
  const isLoggedIn = AppState.isLoggedIn;
  const lang = AppState.lang;

  const authActionText = $('auth-action-text');
  const authActionIcon = $('auth-action-icon');
  const btnAuth = $('btn-auth-action');
  const adminNavItem = $('nav-item-admin');

  if (isLoggedIn) {
    authActionText.textContent = t('nav_logout');
    authActionIcon.className = 'bx bx-log-out-circle';
    btnAuth.removeAttribute('data-tab');
    btnAuth.onclick = () => { handleLogout(); return false; };
    adminNavItem.style.display = user?.role === 'admin' ? '' : 'none';
  } else {
    authActionText.dataset.i18n = 'nav_login';
    authActionText.textContent = t('nav_login');
    authActionIcon.className = 'bx bx-log-in-circle';
    btnAuth.dataset.tab = 'tab-auth';
    btnAuth.onclick = null;
    adminNavItem.style.display = 'none';
  }
}

// ── 7. RENDER: EXPLORE / DESTINATIONS ─────────────────────────
function renderDestinations() {
  const container = $('destinations-container');
  if (!container) return;

  const filter = AppState.explore.activeFilter;
  const query = AppState.explore.searchQuery.toLowerCase();
  const lang = AppState.lang;

  const allDest = [...DESTINATIONS_DATA, ...AppState.admin.tours];
  const filtered = allDest.filter(d => {
    const matchCat = filter === 'all' || d.category === filter;
    const title = lang === 'vi' ? d.title : (d.titleEn || d.title);
    const loc = lang === 'vi' ? d.location : (d.locationEn || d.location);
    const matchQ = !query || title.toLowerCase().includes(query) || loc.toLowerCase().includes(query);
    return matchCat && matchQ;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem;">
      ${lang === 'vi' ? '😕 Không tìm thấy điểm đến phù hợp.' : '😕 No destinations found.'}
    </p>`;
    return;
  }

  container.innerHTML = filtered.map(d => {
    const title = lang === 'vi' ? d.title : (d.titleEn || d.title);
    const loc = lang === 'vi' ? d.location : (d.locationEn || d.location);
    const desc = lang === 'vi' ? d.desc : (d.descEn || d.desc);
    const catLabel = { beach: lang === 'vi' ? 'Biển' : 'Beach', mountain: lang === 'vi' ? 'Núi' : 'Mountain', culture: lang === 'vi' ? 'Văn Hóa' : 'Culture', adventure: lang === 'vi' ? 'Phiêu Lưu' : 'Adventure' }[d.category] || d.category;
    return `
    <div class="card" data-category="${d.category}">
      <div class="card-image-wrapper">
        <img class="card-img" src="${d.image}" alt="${title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=60'">
        <div class="card-badge">${catLabel}</div>
        <div class="card-rating">⭐ ${d.rating} <span style="font-weight:400;font-size:0.7rem;opacity:0.8;">(${d.reviews} ${lang === 'vi' ? 'đánh giá' : 'reviews'})</span></div>
      </div>
      <div class="card-content">
        <div class="card-location"><i class='bx bx-map-pin'></i> ${loc}</div>
        <h3 class="card-title">${title}</h3>
        <p class="card-desc">${desc}</p>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-label">${lang === 'vi' ? 'Từ / khách' : 'From / pax'}</span>
            <span class="price-val">${d.price.includes(',') ? d.price : Number(d.price).toLocaleString('vi-VN')} đ</span>
          </div>
          <button class="btn-book" onclick="openBookingModal('${d.id}')">
            <i class='bx bx-calendar-check'></i>
            ${lang === 'vi' ? 'Đặt Ngay' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ── 8. RENDER: ITINERARY ──────────────────────────────────────
function renderItinerary() {
  renderDayTabs();
  renderTimeline();
  renderItineraryStats();
}

function renderDayTabs() {
  const container = $('day-tabs-container');
  const { days, currentDayIndex } = AppState.itinerary;
  container.innerHTML = days.map((day, idx) => `
    <button class="day-tab ${idx === currentDayIndex ? 'active' : ''}" onclick="selectDay(${idx})">
      ${day.label}
      <span style="font-size:0.75rem;opacity:0.7;">(${day.activities.length})</span>
    </button>
  `).join('');
  $('current-day-title').textContent = days[currentDayIndex].label;
}

function selectDay(idx) {
  AppState.itinerary.currentDayIndex = idx;
  renderDayTabs();
  renderTimeline();
}

function renderTimeline() {
  const container = $('timeline-events-container');
  const lang = AppState.lang;
  const day = AppState.itinerary.days[AppState.itinerary.currentDayIndex];

  if (!day || day.activities.length === 0) {
    container.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:3rem;">
      <div style="font-size:3rem;">🗓️</div>
      <p style="margin-top:0.5rem;">${lang === 'vi' ? 'Chưa có hoạt động nào. Thêm bên dưới nhé!' : 'No activities yet. Add one below!'}</p>
    </div>`;
    return;
  }

  const typeIconMap = { sightseeing: '🏛️', hotel: '🏨', dining: '🍽️', flight: '✈️' };
  const sorted = [...day.activities].sort((a, b) => a.time.localeCompare(b.time));
  container.innerHTML = sorted.map(act => `
    <div class="timeline-item">
      <div class="timeline-header">
        <span class="time-tag"><i class='bx bx-time'></i>${act.time}</span>
        <button class="btn-remove-item" onclick="removeActivity(${act.id})"><i class='bx bx-trash'></i></button>
      </div>
      <div class="timeline-content">
        <h4>${typeIconMap[act.type] || '📍'} ${act.title}</h4>
        ${act.note ? `<p><i class='bx bx-note' style="font-size:0.85rem;"></i> ${act.note}</p>` : ''}
      </div>
      <div class="timeline-footer">
        <span class="item-type">${act.type.toUpperCase()}</span>
        <span class="item-cost">${act.cost ? fmt(act.cost) : (lang === 'vi' ? '(Không tính phí)' : '(No charge)')}</span>
      </div>
    </div>
  `).join('');
}

function renderItineraryStats() {
  const allActivities = AppState.itinerary.days.flatMap(d => d.activities);
  const totalCost = allActivities.reduce((sum, a) => sum + (Number(a.cost) || 0), 0);
  $('stat-total-activities').textContent = allActivities.length;
  $('stat-total-cost').textContent = fmt(totalCost);
}

function addActivity() {
  const time = $('act-time').value;
  const type = $('act-type').value;
  const titleInput = $('act-title-input').value.trim();
  const cost = $('act-cost').value;
  const note = $('act-note').value.trim();

  if (!titleInput) { alert(AppState.lang === 'vi' ? 'Vui lòng nhập tên hoạt động!' : 'Please enter an activity title!'); return; }

  const day = AppState.itinerary.days[AppState.itinerary.currentDayIndex];
  day.activities.push({ id: Date.now(), time, type, title: titleInput, cost, note });

  $('act-title-input').value = '';
  $('act-cost').value = '';
  $('act-note').value = '';

  renderTimeline();
  renderItineraryStats();
}

function removeActivity(actId) {
  const day = AppState.itinerary.days[AppState.itinerary.currentDayIndex];
  day.activities = day.activities.filter(a => a.id !== actId);
  renderTimeline();
  renderItineraryStats();
}

function addNewDay() {
  const n = AppState.itinerary.days.length + 1;
  const label = AppState.lang === 'vi' ? `Ngày ${n}` : `Day ${n}`;
  AppState.itinerary.days.push({ id: Date.now(), label, activities: [] });
  AppState.itinerary.currentDayIndex = AppState.itinerary.days.length - 1;
  renderDayTabs();
  renderTimeline();
}

function deleteCurrentDay() {
  const { days, currentDayIndex } = AppState.itinerary;
  if (days.length === 1) { alert(AppState.lang === 'vi' ? 'Phải có ít nhất 1 ngày trong lịch trình!' : 'Itinerary must have at least one day!'); return; }
  days.splice(currentDayIndex, 1);
  days.forEach((d, i) => { d.label = AppState.lang === 'vi' ? `Ngày ${i + 1}` : `Day ${i + 1}`; });
  AppState.itinerary.currentDayIndex = Math.max(0, currentDayIndex - 1);
  renderItinerary();
}

// ── 9. RENDER: WEATHER & PACKING ──────────────────────────────
function renderWeather() {
  const city = $('weather-city-select').value;
  const data = WEATHER_DATA[city];
  if (!data) return;
  const lang = AppState.lang;

  $('weather-icon-current').textContent = data.icon;
  $('weather-temp-current').textContent = `${data.temp}°C`;
  $('weather-status-current').textContent = lang === 'vi' ? data.status : data.statusEn;
  $('weather-sub-current').textContent = lang === 'vi'
    ? `Độ ẩm: ${data.humidity}% | Sức gió: ${data.wind} km/h`
    : `Humidity: ${data.humidity}% | Wind: ${data.wind} km/h`;

  $('weather-forecast-container').innerHTML = data.forecast.map(f => `
    <div class="forecast-day">
      <div class="forecast-name">${lang === 'vi' ? f.day : f.dayEn}</div>
      <div class="forecast-icon">${f.icon}</div>
      <div class="forecast-temp">${f.temp}C</div>
    </div>
  `).join('');
}

function renderPackingList() {
  const container = $('packing-checklist-container');
  const lang = AppState.lang;
  container.innerHTML = PACKING_LIST.map(item => `
    <label class="checklist-item">
      <input type="checkbox" onchange="this.parentNode.classList.toggle('checked', this.checked)">
      <span class="checklist-text">${lang === 'vi' ? item.vi : item.en}</span>
    </label>
  `).join('');
}

// ── 10. RENDER: ADMIN ─────────────────────────────────────────
function renderAdminPanel() {
  const { bookings } = AppState.admin;
  const revenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
  $('admin-stat-revenue').textContent = fmt(revenue);
  $('admin-stat-tours-count').textContent = DESTINATIONS_DATA.length + AppState.admin.tours.length;
  $('admin-stat-bookings-count').textContent = bookings.length;

  const tbody = $('admin-bookings-rows');
  if (bookings.length === 0) {
    const lang = AppState.lang;
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);">
      ${lang === 'vi' ? 'Chưa có đơn đặt tour nào.' : 'No bookings yet.'}
    </td></tr>`;
    return;
  }
  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td>${b.name}</td>
      <td>${b.tourTitle}</td>
      <td>${b.date}</td>
      <td>${b.guests} ${AppState.lang === 'vi' ? 'khách' : 'pax'}</td>
      <td style="font-weight:700;color:var(--accent);">${fmt(b.total)}</td>
      <td><span class="status-badge paid">${AppState.lang === 'vi' ? '✓ Đã thanh toán' : '✓ Paid'}</span></td>
    </tr>
  `).join('');
}

// ── 11. BOOKING MODAL ─────────────────────────────────────────
function openBookingModal(destId) {
  const allDest = [...DESTINATIONS_DATA, ...AppState.admin.tours];
  const dest = allDest.find(d => String(d.id) === String(destId));
  if (!dest) return;

  AppState.explore.bookingTarget = dest;
  AppState.explore.promoApplied = false;

  const lang = AppState.lang;
  $('booking-modal-title').textContent = lang === 'vi'
    ? `Đặt Tour: ${dest.title}`
    : `Book Tour: ${dest.titleEn || dest.title}`;

  const today = new Date().toISOString().split('T')[0];
  $('booking-date').value = today;
  $('booking-guests').value = 1;
  $('booking-service').value = 'standard';
  $('promo-code').value = '';
  $('bill-discount-row').style.display = 'none';

  updateBillUI();

  $('booking-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  $('booking-modal').style.display = 'none';
  document.body.style.overflow = '';
  AppState.explore.bookingTarget = null;
  AppState.explore.promoApplied = false;
}

function updateBillUI() {
  const dest = AppState.explore.bookingTarget;
  if (!dest) return;

  const basePrice = parseFloat(String(dest.price).replace(/,/g, '').replace(' đ', ''));
  const guests = parseInt($('booking-guests').value) || 1;
  const service = $('booking-service').value;
  const surcharge = service === 'premium' ? Math.round(basePrice * 0.3) : 0;
  const subtotal = (basePrice + surcharge) * guests;
  const discount = AppState.explore.promoApplied ? Math.round(subtotal * 0.5) : 0;
  const total = subtotal - discount;

  $('bill-base-price').textContent = fmt(basePrice);
  $('bill-service-charge').textContent = fmt(surcharge);
  $('bill-guests-count').textContent = `x ${guests}`;
  $('bill-discount-val').textContent = `- ${fmt(discount)}`;
  $('bill-total-price').textContent = fmt(total);
}

function applyPromoCode() {
  const code = $('promo-code').value.trim().toUpperCase();
  if (code === 'ROAM50') {
    AppState.explore.promoApplied = true;
    $('bill-discount-row').style.display = 'flex';
    updateBillUI();
  } else {
    alert(AppState.lang === 'vi' ? 'Mã không hợp lệ! Thử "ROAM50"' : 'Invalid code! Try "ROAM50"');
  }
}

function submitBooking() {
  const dest = AppState.explore.bookingTarget;
  if (!dest) return;

  const name = $('booking-name').value.trim();
  const phone = $('booking-phone').value.trim();
  const date = $('booking-date').value;
  const guests = parseInt($('booking-guests').value) || 1;
  const service = $('booking-service').value;

  if (!name || !phone || !date) {
    alert(AppState.lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin!' : 'Please fill in all fields!');
    return;
  }

  const basePrice = parseFloat(String(dest.price).replace(/,/g, '').replace(' đ', ''));
  const surcharge = service === 'premium' ? Math.round(basePrice * 0.3) : 0;
  const subtotal = (basePrice + surcharge) * guests;
  const discount = AppState.explore.promoApplied ? Math.round(subtotal * 0.5) : 0;
  const total = subtotal - discount;

  const booking = {
    id: `BK${Date.now()}`,
    name, phone, date, guests, service, total,
    tourTitle: dest.title,
    tourCode: dest.code,
    destName: dest.title,
  };
  AppState.admin.bookings.push(booking);

  closeBookingModal();
  showSuccessModal(booking, dest, service);
}

// ── 12. SUCCESS MODAL ─────────────────────────────────────────
function showSuccessModal(booking, dest, service) {
  const lang = AppState.lang;
  $('ticket-passenger-name').textContent = booking.name.toUpperCase();
  $('ticket-tour-code').textContent = dest.code;
  $('ticket-destination-name').textContent = (lang === 'vi' ? dest.title : (dest.titleEn || dest.title)).toUpperCase();
  $('ticket-departure-date').textContent = booking.date;
  $('ticket-guests-qty').textContent = `${String(booking.guests).padStart(2, '0')} ${lang === 'vi' ? 'KHÁCH' : 'GUEST(S)'}`;
  $('ticket-service-class').textContent = service === 'premium' ? 'VIP PREMIUM CLASS' : 'STANDARD CLASS';

  $('success-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  spawnConfetti();
}

function spawnConfetti() {
  const colors = ['#00c7de', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti';
      el.style.left = `${Math.random() * 100}vw`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = `${1.5 + Math.random() * 2}s`;
      el.style.animationDelay = `${Math.random() * 0.5}s`;
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.width = `${6 + Math.random() * 6}px`;
      el.style.height = `${6 + Math.random() * 6}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 25);
  }
}

// ── 13. EXPLANATION PANEL ─────────────────────────────────────
function toggleExplanationPanel() {
  AppState.ui.explanationOpen = !AppState.ui.explanationOpen;
  const panel = $('explanation-panel-console');
  panel.classList.toggle('open', AppState.ui.explanationOpen);
  if (AppState.ui.explanationOpen) renderExplanationContent();
}

function renderExplanationContent() {
  const tab = AppState.ui.activeExpTab;
  const data = EXPLANATION_DATA[tab];
  if (!data) return;
  const lang = AppState.lang;
  const title = lang === 'vi' ? data.title : data.titleEn;

  const indexHtml = data.topics.map((t, i) => `
    <button class="exp-index-item ${i === AppState.ui.activeExpIndex ? 'active' : ''}" onclick="selectExpIndex(${i})">
      ${lang === 'vi' ? t.titleVi : t.titleEn}
    </button>
  `).join('');
  $('exp-index-container').innerHTML = indexHtml;

  const topic = data.topics[AppState.ui.activeExpIndex];
  const content = lang === 'vi' ? topic.contentVi : topic.contentEn;
  const code = topic.code;
  const codeLabel = { javascript: 'JavaScript', css: 'CSS', text: 'Cấu Trúc' }[topic.lang] || topic.lang;

  $('exp-content-display').innerHTML = `
    <h4>${title} / ${lang === 'vi' ? topic.titleVi : topic.titleEn}</h4>
    <p>${content}</p>
    <div class="code-block-wrapper">
      <div class="code-header">
        <span>${codeLabel}</span>
        <span>Roamify v2.0</span>
      </div>
      <div class="code-block">${syntaxHighlight(code, topic.lang)}</div>
    </div>
  `;
}

function selectExpIndex(i) {
  AppState.ui.activeExpIndex = i;
  renderExplanationContent();
}

function syntaxHighlight(code, lang) {
  if (lang === 'text') return escapeHtml(code);
  let html = escapeHtml(code);
  if (lang === 'javascript') {
    html = html
      .replace(/\b(const|let|var|function|return|if|else|new|this|true|false|null|undefined|forEach|map|filter|find|includes|push|join|reduce|split|trim|parseInt|parseFloat|toUpperCase|toLowerCase|replace|querySelector|querySelectorAll|getElementById|textContent|innerHTML|style|classList|toggle|add|remove|dataset|addEventListener|setTimeout|setInterval|clearTimeout|Math|Number|String|Date|Object|Array)\b/g, '<span class="code-kw">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="code-cmt">$1</span>')
      .replace(/(&apos;|&#39;|&#x27;|'[^']*')/g, '<span class="code-str">$&</span>')
      .replace(/(&quot;|"[^"]*")/g, '<span class="code-str">$&</span>')
      .replace(/`[^`]*`/g, '<span class="code-str">$&</span>');
  } else if (lang === 'css') {
    html = html
      .replace(/(--[\w-]+)/g, '<span class="code-fn">$1</span>')
      .replace(/(\/\*.*?\*\/)/gs, '<span class="code-cmt">$1</span>');
  }
  return html;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── 14. THEME & LANGUAGE ──────────────────────────────────────
function toggleTheme() {
  AppState.isDark = !AppState.isDark;
  document.body.classList.toggle('dark-mode', AppState.isDark);
  $('theme-toggle-icon').className = AppState.isDark ? 'bx bx-sun' : 'bx bx-moon';
}

function toggleLanguage() {
  AppState.lang = AppState.lang === 'vi' ? 'en' : 'vi';
  $('btn-lang-toggle').textContent = AppState.lang === 'vi' ? 'EN' : 'VI';
  applyTranslations();
  updateAuthUI();
  if (AppState.currentTab === 'tab-explore') renderDestinations();
  if (AppState.currentTab === 'tab-itinerary') renderItinerary();
  if (AppState.currentTab === 'tab-utilities') { renderWeather(); renderPackingList(); }
  if (AppState.currentTab === 'tab-admin') renderAdminPanel();
  if (AppState.ui.explanationOpen) renderExplanationContent();
}

// ── 15. ADMIN: ADD TOUR ───────────────────────────────────────
function handleAdminAddTour() {
  const title = $('admin-tour-title').value.trim();
  const location = $('admin-tour-location').value.trim();
  const code = $('admin-tour-code').value.trim();
  const price = $('admin-tour-price').value.trim();
  const category = $('admin-tour-category').value;
  const image = $('admin-tour-image').value.trim();
  const desc = $('admin-tour-desc').value.trim();

  if (!title || !location || !code || !price || !image || !desc) {
    alert(AppState.lang === 'vi' ? 'Vui lòng điền đầy đủ thông tin tour!' : 'Please fill in all tour fields!');
    return;
  }

  AppState.admin.tours.push({
    id: `adm_${Date.now()}`,
    title, titleEn: title,
    location, locationEn: location,
    code, price, category,
    image, desc, descEn: desc,
    rating: 4.5, reviews: 0,
  });

  $('admin-add-tour-form').reset();
  alert(AppState.lang === 'vi' ? `✅ Tour "${title}" đã được thêm thành công!` : `✅ Tour "${title}" added successfully!`);
  renderAdminPanel();
}

// ── 16. EVENT LISTENERS ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // NAVIGATION TABS
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = el.dataset.tab;
      if (tabId && tabId !== 'tab-auth') switchTab(tabId);
      else if (tabId === 'tab-auth') switchTab('tab-auth');
    });
  });

  // THEME TOGGLE
  $('btn-theme-toggle').addEventListener('click', toggleTheme);

  // LANGUAGE TOGGLE
  $('btn-lang-toggle').addEventListener('click', toggleLanguage);

  // AUTH FORM
  $('form-auth-submit').addEventListener('submit', () => {
    const username = $('auth-username').value.trim();
    const password = $('auth-password').value.trim();

    if (AppState.authMode === 'login') {
      const ok = handleLogin(username, password);
      if (!ok) alert(AppState.lang === 'vi' ? '❌ Sai tên đăng nhập hoặc mật khẩu!\n\nThử: user/user123 hoặc admin/admin123' : '❌ Invalid username or password!\n\nTry: user/user123 or admin/admin123');
    } else {
      const role = $('auth-role').value;
      const ok = handleRegister(username, password, role);
      if (!ok) alert(AppState.lang === 'vi' ? '❌ Tên đăng nhập đã tồn tại!' : '❌ Username already exists!');
    }
  });

  // AUTH TABS (Login/Register)
  $('auth-toggle-login').addEventListener('click', () => {
    AppState.authMode = 'login';
    $('auth-toggle-login').classList.add('active');
    $('auth-toggle-register').classList.remove('active');
    $('auth-email-group').style.display = 'none';
    $('auth-role-group').style.display = 'none';
    $('auth-title').dataset.i18n = 'auth_card_title_login';
    $('auth-subtitle').dataset.i18n = 'auth_card_desc_login';
    $('btn-auth-submit-text').dataset.i18n = 'auth_btn_submit_login';
    applyTranslations();
  });

  $('auth-toggle-register').addEventListener('click', () => {
    AppState.authMode = 'register';
    $('auth-toggle-register').classList.add('active');
    $('auth-toggle-login').classList.remove('active');
    $('auth-email-group').style.display = '';
    $('auth-role-group').style.display = '';
    $('auth-title').dataset.i18n = 'auth_card_title_register';
    $('auth-subtitle').dataset.i18n = 'auth_card_desc_register';
    $('btn-auth-submit-text').dataset.i18n = 'auth_btn_submit_register';
    applyTranslations();
  });

  // FILTER PILLS
  $('category-filter-pills').addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    AppState.explore.activeFilter = pill.dataset.filter;
    renderDestinations();
  });

  // SEARCH
  $('btn-submit-search').addEventListener('click', () => {
    AppState.explore.searchQuery = $('search-destination').value.trim();
    AppState.explore.activeFilter = $('search-category').value;
    const pills = document.querySelectorAll('.pill');
    pills.forEach(p => p.classList.toggle('active', p.dataset.filter === AppState.explore.activeFilter));
    renderDestinations();
  });
  $('search-destination').addEventListener('keydown', e => {
    if (e.key === 'Enter') $('btn-submit-search').click();
  });

  // ITINERARY
  $('btn-add-new-day').addEventListener('click', addNewDay);
  $('btn-delete-current-day').addEventListener('click', deleteCurrentDay);
  $('btn-submit-activity').addEventListener('click', addActivity);

  // WEATHER
  $('weather-city-select').addEventListener('change', renderWeather);

  // BOOKING MODAL
  $('btn-close-booking').addEventListener('click', closeBookingModal);
  $('booking-modal').addEventListener('click', e => { if (e.target === $('booking-modal')) closeBookingModal(); });
  $('booking-guests').addEventListener('input', updateBillUI);
  $('booking-service').addEventListener('change', updateBillUI);
  $('btn-apply-promo').addEventListener('click', applyPromoCode);
  $('booking-form').addEventListener('submit', submitBooking);

  // SUCCESS MODAL
  $('btn-close-success').addEventListener('click', () => {
    $('success-modal').style.display = 'none';
    document.body.style.overflow = '';
  });
  $('btn-dismiss-success').addEventListener('click', () => {
    $('success-modal').style.display = 'none';
    document.body.style.overflow = '';
  });

  // EXPLANATION PANEL
  $('btn-toggle-explanation').addEventListener('click', toggleExplanationPanel);
  $('btn-close-explanation').addEventListener('click', () => {
    AppState.ui.explanationOpen = false;
    $('explanation-panel-console').classList.remove('open');
  });
  document.querySelectorAll('.exp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.ui.activeExpTab = tab.dataset.exptab;
      AppState.ui.activeExpIndex = 0;
      renderExplanationContent();
    });
  });

  // ADMIN ADD TOUR
  $('admin-add-tour-form').addEventListener('submit', handleAdminAddTour);

  // LOGO
  $('logo-link').addEventListener('click', e => { e.preventDefault(); switchTab('tab-explore'); });

  // ── INITIAL RENDER ──
  renderDestinations();
  applyTranslations();
  updateAuthUI();
});
