# Khắc phục lỗi "Cannot find module 'sharp'"

## Nguyên nhân
Lỗi này xảy ra vì Sharp là native module cần được biên dịch lại cho môi trường Electron. Khi build file .exe, Sharp module không được đóng gói đúng cách.

## Giải pháp 1: Sử dụng script tự động (Khuyến nghị)

### Bước 1: Chạy script sửa lỗi
```cmd
fix-and-build.bat
```

Script này sẽ:
- Xóa build cũ và module Sharp
- Cài đặt lại dependencies
- Rebuild Sharp cho Electron
- Build lại ứng dụng

## Giải pháp 2: Thực hiện thủ công

### Bước 1: Xóa build cũ
```cmd
rmdir /s /q dist
rmdir /s /q node_modules\sharp
```

### Bước 2: Cài đặt lại Sharp
```cmd
npm install --save-exact sharp@0.33.4
```

### Bước 3: Rebuild Sharp cho Electron
```cmd
npm rebuild sharp --runtime=electron --target=30.0.0 --disturl=https://electronjs.org/headers --build-from-source
```

### Bước 4: Build lại ứng dụng
```cmd
npx electron-builder --win --x64
```

## Giải pháp 3: Sử dụng electron-rebuild

### Bước 1: Cài đặt electron-rebuild
```cmd
npm install --save-dev electron-rebuild
```

### Bước 2: Rebuild tất cả native modules
```cmd
npx electron-rebuild
```

### Bước 3: Build ứng dụng
```cmd
npx electron-builder --win --x64
```

## Giải pháp 4: Kiểm tra Node.js và npm version

### Yêu cầu hệ thống:
- Node.js: 18.x hoặc 20.x
- npm: 8.x hoặc mới hơn
- Python: 3.8+ (cho native compilation)
- Visual Studio Build Tools (Windows)

### Kiểm tra version:
```cmd
node --version
npm --version
```

### Cập nhật nếu cần:
- Tải Node.js mới từ https://nodejs.org
- Cài đặt Visual Studio Build Tools từ Microsoft

## Giải pháp 5: Alternative - Sử dụng Jimp thay Sharp

Nếu vẫn gặp lỗi với Sharp, có thể thay thế bằng Jimp (pure JavaScript):

### Bước 1: Uninstall Sharp
```cmd
npm uninstall sharp
```

### Bước 2: Install Jimp
```cmd
npm install jimp
```

### Bước 3: Sửa code trong main.js
Thay `require('sharp')` thành `require('jimp')`

## Kiểm tra sau khi sửa

### Test ứng dụng trước khi build:
```cmd
npm start
```

### Test file .exe sau khi build:
1. Vào thư mục `dist`
2. Chạy file .exe
3. Thử upload và xử lý ảnh

## Lưu ý quan trọng

1. **Đảm bảo internet ổn định** khi rebuild native modules
2. **Chạy Command Prompt với quyền Administrator** 
3. **Tắt antivirus tạm thời** khi build (có thể chặn compilation)
4. **Kiểm tra Windows Defender** không block các file build

## Hỗ trợ thêm

Nếu vẫn gặp lỗi, hãy:
1. Chụp màn hình lỗi chi tiết
2. Kiểm tra log trong Command Prompt
3. Gửi thông tin hệ thống (Windows version, Node.js version)

**Liên hệ hỗ trợ:**
- Website: https://seodoctor.vn
- Email: info@seodoctor.vn