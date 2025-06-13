# Khắc Phục Lỗi Symbolic Link Khi Build Trên Windows

## Lỗi Bạn Gặp Phải:
```
ERROR: Cannot create symbolic link. A required privilege is not held by the client.
```

## Nguyên Nhân:
Windows không cho phép tạo symbolic link mà không có quyền đặc biệt.

## Giải Pháp Chi Tiết:

### CÁCH 1: Bật Developer Mode (KHUYẾN NGHỊ - 90% thành công)

#### Bước 1: Bật Developer Mode
1. Nhấn **Windows + I** để mở Settings
2. Chọn **Update & Security** (hoặc **Privacy & Security** trên Windows 11)
3. Chọn **For developers** ở menu bên trái
4. Bật **Developer mode**
5. Xác nhận khi Windows hỏi
6. **Khởi động lại máy tính** (quan trọng!)

#### Bước 2: Build lại
```cmd
cd đường-dẫn-đến-thư-mục
fix-and-build.bat
```

### CÁCH 2: Chạy Với Quyền Administrator

#### Bước 1: Mở Command Prompt với quyền cao
1. Nhấn **Windows + R**
2. Gõ: `cmd`
3. Nhấn **Ctrl + Shift + Enter** (chạy với quyền admin)
4. Chọn **Yes** khi UAC hỏi

#### Bước 2: Build
```cmd
cd đường-dẫn-đến-thư-mục
fix-and-build.bat
```

### CÁCH 3: Tạo Portable App (Không cần installer)

Nếu vẫn lỗi, tạo app portable thay vì installer:

```cmd
npm install
npx electron-builder --win --dir --config electron-builder.config.js
```

Kết quả: Thư mục `dist/win-unpacked/` chứa app có thể chạy trực tiếp

### CÁCH 4: Sử dụng Script Khắc Phục Tự Động

Chạy file `fix-and-build.bat` - script này sẽ:
- Kiểm tra Developer Mode
- Xóa cache npm
- Cài đặt lại dependencies
- Thử build nhiều cách khác nhau
- Tự động chuyển sang portable nếu installer fail

## Kiểm Tra Kết Quả:

### Build Thành Công:
- Xuất hiện file `.exe` trong thư mục `dist/`
- Kích thước khoảng 150-200MB
- Có thể cài đặt bình thường

### Build Portable Thành Công:
- Thư mục `dist/win-unpacked/`
- File `Image Watermark Tool.exe` bên trong
- Chạy trực tiếp không cần cài đặt

## Lưu Ý:
- Developer Mode an toàn và được Microsoft khuyến khích cho dev
- Script khắc phục sẽ thử tất cả phương pháp tự động
- Portable app vẫn đầy đủ tính năng như installer