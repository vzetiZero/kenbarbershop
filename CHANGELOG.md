# 📝 CHANGELOG - KenBarbershop Website

**Dự án:** Chuyển đổi từ SuperHairo → KenBarbershop  
**Ngày bắt đầu:** 22/04/2026  
**Trạng thái:** 🔄 Đang thực hiện

---

## ✅ DANH SÁCH THAY ĐỔI CẦN THỰC HIỆN

### 1️⃣ THAY ĐỔI TIÊU ĐỀ & THƯƠNG HIỆU
- [ ] **Site Title**: Đổi từ "SuperHairo.cz" → "KenBarbershop"
  - WordPress → Settings → General → Site Title
- [ ] **Tagline**: Cập nhật thẻ mô tả website
  - WordPress → Settings → General → Tagline
- [ ] **Logo**: Thay đổi logo (nếu cần)
  - WordPress → Appearance → Logo
- [ ] **Meta Description**: Cập nhật mô tả trang chủ
  - Elementor → Edit Page 45 → Meta Tags

### 2️⃣ BỎ "OBCHOD" KHỎI MENU
- [ ] **Ẩn/Xóa menu item "Obchod"**
  - WordPress → Appearance → Menus → Edit Menu
  - Tìm "Obchod" và xóa khỏi menu
- [ ] **Vị trí menu cần sửa:**
  - Menu chính (top-left): Domů → O nás → Ceník → ~~Obchod~~ ❌
  - Menu phụ (top-right): Galerie → Kontakt → Košík

### 3️⃣ THÊMMULTIPLE LANGUAGES (Tiếng Anh bổ sung)
- [ ] **TranslatePress Settings** (đã cài plugin)
  - WordPress → TranslatePress → Languages
  - Thêm "English" nếu chưa có
- [ ] **Dịch các phần chính:**
  - [ ] Menu items
  - [ ] Tiêu đề sections (O nás, Ceník, Galerie, Kontakt)
  - [ ] Nội dung trang chủ
  - [ ] Form liên hệ

### 4️⃣ CẬP NHẬT THÔNG TIN LIÊN HỆ
- [ ] **Contact Information:**
  - [ ] Phone/Mobile
  - [ ] Email
  - [ ] Address
  - [ ] Business Hours
- [ ] **Vị trí cần sửa:**
  - Elementor Page 45 → Contact Section
  - Footer thông tin

### 5️⃣ NGÔN NGỮ HIỆN CÓ
```
✅ Tiếng Czech (cs-CZ) - Primary
✅ Tiếng Anh (en-GB) - Secondary (đã có)
🔄 Cần kiểm tra xem có đầy đủ không
```

---

## 📂 CẤU TRÚC THƯMỤC WEBSITE

```
superhairo.cz/
├── wp-admin/                 # WordPress Admin
├── wp-content/
│   ├── plugins/              # Các plugin (WooCommerce, Elementor, etc.)
│   ├── themes/hello-elementor/
│   └── uploads/              # Hình ảnh & media
├── wp-includes/              # WordPress Core
├── en/                        # English version (subdirectory)
├── cs/                        # Czech version (nếu dùng)
└── index.html                # Trang chủ HTML
```

---

## 🔧 HƯỚNG DẪN THỰC HIỆN

### **Bước 1: Truy cập WordPress Admin**
```
URL: https://superhairo.cz/wp-admin/
```

### **Bước 2: Thay đổi Site Title & Tagline**
1. Vào **Settings → General**
2. Thay "SuperHairo.cz" thành "KenBarbershop"
3. Cập nhật Tagline (mô tả ngắn)
4. Nhấn **Save Changes**

### **Bước 3: Quản lý Menu**
1. Vào **Appearance → Menus**
2. Chọn menu chính (có Domů, O nás, Ceník, Obchod)
3. **Xóa** hoặc **Ẩn** menu item "Obchod"
4. **Lưu Menu**

### **Bước 4: Cấu hình Languages (TranslatePress)**
1. Vào **TranslatePress → Languages**
2. Kiểm tra "English" đã thêm chưa
3. Nếu chưa, nhấn **Add Language** → Chọn English
4. Dịch các items chính

### **Bước 5: Cập nhật Contact Info**
1. Vào **Elementor → Edit Pages → Page 45 (Trang chủ)**
2. Tìm section "Kontakt"
3. Cập nhật:
   - Phone
   - Email
   - Address
   - Hours

---

## 📋 DANH SÁCH PLUGIN HIỆN CÓ

| Plugin | Phiên bản | Mục đích |
|--------|-----------|---------|
| **WordPress** | 6.9.4 | CMS Core |
| **WooCommerce** | 10.6.2 | E-commerce |
| **Elementor** | 4.0.1 | Page Builder |
| **Elementor Pro** | 4.0.3 | Advanced Features |
| **TranslatePress** | 3.1.7 | Multi-language |
| **Woo Cart All in One** | 1.1.23 | Shopping Cart |
| **Essential Addons** | 6.6.2 | Extra Widgets |
| **Woo Stripe Payment** | 3.3.106 | Payment Gateway |
| **Google Business Reviews** | 6.9.4 | Review Manager |
| **Packeta** | - | Shipping |

---

## ⚠️ LƯU Ý QUAN TRỌNG

### **1. Các file .html trong thư mục này là STATIC COPIES**
- Được tạo bởi **HTTrack Website Copier**
- **KHÔNG phải là tệp WordPress thực**
- Khi sửa WordPress Admin → Website tự động cập nhật
- Các HTML file này cần xóa hoặc cập nhật lại

### **2. Các file cần Bỏ/Cảnh báo**
```
❌ index9f20.html          - Bản mirror cũ, có thể xóa
❌ en/index.html           - English mirror
❌ obchod/                 - Thư mục Shop (sẽ xóa)
✅ wp-admin/               - Không động
✅ wp-content/             - Không động
✅ wp-includes/            - Không động
```

### **3. Backup trước khi thay đổi**
```bash
# Nên backup:
- wp-content/uploads/ (hình ảnh)
- Database (wp_* tables)
- wp-config.php (cài đặt)
```

---

## 📊 TIẾN ĐỘ THỰC HIỆN

### Phase 1: Cấu hình cơ bản
- [ ] Thay tên site (SuperHairo → KenBarbershop)
- [ ] Cập nhật logo
- [ ] Xóa menu "Obchod"

### Phase 2: Ngôn ngữ
- [ ] Kiểm tra TranslatePress
- [ ] Dịch menu tiếng Anh
- [ ] Dịch content chính

### Phase 3: Thông tin liên hệ
- [ ] Cập nhật phone/email/address
- [ ] Cập nhật giờ làm việc

### Phase 4: Kiểm tra & Deploy
- [ ] Kiểm tra giao diện 2 ngôn ngữ
- [ ] Test menu
- [ ] Xóa các file HTML cũ
- [ ] Test toàn bộ website

---

## 📞 LIÊN HỆ VÀ HỖ TRỢ

**Nếu gặp vấn đề:**
1. Kiểm tra WordPress Error Log: `/wp-content/debug.log`
2. Test trên page tạm (Draft) trước khi deploy
3. Backup database thường xuyên

---

## 📝 GHI CHÚ THÊM

_Thêm ghi chú của bạn ở đây_

---

**Last updated:** 22/04/2026  
**Updated by:** Admin
