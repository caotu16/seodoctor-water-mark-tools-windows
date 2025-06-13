# Hướng Dẫn Cài Đặt và Build Image Watermark Tool

## Yêu Cầu Hệ Thống

### Windows:
- Windows 10 hoặc mới hơn
- Node.js 18 hoặc mới hơn
- npm (đi kèm với Node.js)

### macOS:
- macOS 10.15 hoặc mới hơn
- Node.js 18 hoặc mới hơn
- Xcode Command Line Tools

### Linux:
- Ubuntu 18.04 hoặc tương đương
- Node.js 18 hoặc mới hơn

## Cách 1: Chạy Trực Tiếp (Khuyến Nghị)

### Bước 1: Cài đặt Node.js
1. Truy cập https://nodejs.org
2. Tải và cài đặt phiên bản LTS
3. Khởi động lại máy tính

### Bước 2: Chuẩn bị project
1. Tải toàn bộ source code về máy
2. Mở Command Prompt (Windows) hoặc Terminal (Mac/Linux)
3. Chuyển đến thư mục chứa source code:
   ```
   cd đường-dẫn-đến-thư-mục-source
   ```

### Bước 3: Cài đặt dependencies
```bash
npm install
```

### Bước 4: Chạy ứng dụng
```bash
npm start
```

## Cách 2: Tạo File Cài Đặt (.exe cho Windows)

### Trên Windows:
1. Làm theo Cách 1 để cài đặt Node.js và dependencies
2. Chạy file build:
   ```
   build-installer.bat
   ```
   HOẶC trong Command Prompt:
   ```
   npx electron-builder --config electron-builder.config.js --win
   ```

3. File installer sẽ được tạo trong thư mục `dist/`
4. Tìm file `.exe` và chạy để cài đặt

### Trên macOS:
1. Làm theo Cách 1 để cài đặt Node.js và dependencies
2. Chạy trong Terminal:
   ```bash
   chmod +x build-installer.sh
   ./build-installer.sh
   ```
   HOẶC:
   ```bash
   npx electron-builder --config electron-builder.config.js --mac
   ```

3. File `.dmg` sẽ được tạo trong thư mục `dist/`

### Trên Linux:
1. Làm theo Cách 1 để cài đặt Node.js và dependencies
2. Chạy trong Terminal:
   ```bash
   chmod +x build-installer.sh
   ./build-installer.sh
   ```
   HOẶC:
   ```bash
   npx electron-builder --config electron-builder.config.js --linux
   ```

3. File `.AppImage` sẽ được tạo trong thư mục `dist/`

## Cách Sử Dụng Ứng Dụng

1. **Upload Ảnh**: Click vào khu vực "Drag and drop images" để chọn ảnh
2. **Chọn Logo**: Click "Select Logo" để chọn logo watermark
3. **Cài Đặt Vị Trí**: Chọn vị trí đặt logo (góc trên/dưới, trái/phải, giữa)
4. **Điều Chỉnh Kích Thước**: Thay đổi tỷ lệ kích thước logo
5. **Cài Đặt Nén**: Bật/tắt nén ảnh và điều chỉnh chất lượng
6. **Chọn Thư Mục Xuất**: Click để chọn nơi lưu ảnh đã xử lý
7. **Xử Lý**: Click "Start Processing" để bắt đầu

## Lưu Ý

- Ứng dụng hỗ trợ các định dạng: JPG, PNG, BMP, TIFF, WebP
- Logo có thể là: JPG, PNG, SVG
- Ảnh xuất ra sẽ ở định dạng JPG
- Tên file sẽ được tối ưu hóa (loại bỏ ký tự đặc biệt)

## Khắc Phục Sự Cố

### Lỗi "node: command not found":
- Cài đặt lại Node.js từ nodejs.org
- Khởi động lại Command Prompt/Terminal

### Lỗi khi build:
- Đảm bảo đã chạy `npm install` trước
- Kiểm tra quyền ghi file trong thư mục

### Ứng dụng không mở:
- Thử chạy với quyền Administrator (Windows)
- Kiểm tra antivirus có chặn không

## Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:
1. Phiên bản Node.js: `node --version`
2. Phiên bản npm: `npm --version`
3. Log lỗi trong Console khi chạy ứng dụng