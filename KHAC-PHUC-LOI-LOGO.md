# Khắc phục lỗi Logo không hiển thị

## Vấn đề
Ảnh kết quả không được đóng logo mặc dù đã chọn logo và cấu hình.

## Nguyên nhân có thể

### 1. Đường dẫn logo không hợp lệ
- File logo đã bị xóa hoặc di chuyển
- Đường dẫn chứa ký tự đặc biệt

### 2. Kích thước logo quá nhỏ hoặc quá lớn
- Logo size < 5% hoặc > 50%
- Logo lớn hơn ảnh gốc

### 3. Format logo không tương thích
- File logo bị hỏng
- Format không hỗ trợ

### 4. Vị trí logo nằm ngoài ảnh
- Tính toán vị trí sai
- Logo bị đặt ngoài khung ảnh

## Giải pháp đã cải tiến

### 1. Debug logging đầy đủ
```javascript
console.log('Processing logo:', logoPath, 'Size:', logoSize, 'Position:', logoPosition);
console.log('Logo dimensions:', logoWidth, 'x', logoHeight);
console.log('Image dimensions:', image.getWidth(), 'x', image.getHeight());
console.log('Logo position:', x, y);
```

### 2. Validation toàn diện
- Kiểm tra file logo tồn tại
- Giới hạn kích thước logo (5%-50%)
- Kiểm tra vị trí trong khung ảnh
- Xử lý lỗi không crash app

### 3. Cải thiện composite
- Sử dụng Jimp composite đơn giản hơn
- Loại bỏ opacity complex settings
- Đảm bảo tương thích format

## Cách kiểm tra và khắc phục

### Bước 1: Kiểm tra Console Log
1. Mở ứng dụng
2. Bấm F12 để mở Developer Tools
3. Chọn tab Console
4. Chọn logo và xử lý ảnh
5. Quan sát log messages:

```
Processing logo: C:\path\to\logo.png Size: 20 Position: bottom-right
Logo dimensions: 200 x 150
Image dimensions: 1000 x 750
Logo position: 780 580
Logo applied successfully
```

### Bước 2: Kiểm tra Settings
- Logo path không rỗng
- Logo size trong khoảng 10-30%
- Position hợp lý

### Bước 3: Test với logo khác
- Thử logo format PNG với background trong suốt
- Kích thước logo vừa phải (dưới 1MB)
- Tên file không có ký tự đặc biệt

### Bước 4: Kiểm tra file output
- Mở ảnh kết quả với image viewer
- Zoom để tìm logo (có thể nhỏ)
- Kiểm tra góc đã chọn

## Troubleshooting Common Issues

### Logo không thấy nhưng không có lỗi
```
Nguyên nhân: Logo quá nhỏ hoặc trong suốt hoàn toàn
Giải pháp: Tăng logo size lên 25-30%
```

### "Error applying logo: Logo size too large"
```
Nguyên nhân: Logo size > 50% hoặc logo gốc quá lớn
Giải pháp: Giảm logo size hoặc resize logo file
```

### "Error applying logo: Logo position out of bounds"
```
Nguyên nhân: Vị trí tính toán sai
Giải pháp: Chọn position khác hoặc giảm logo size
```

### "Cannot find module 'jimp'"
```
Nguyên nhân: Dependencies không đầy đủ
Giải pháp: npm install lại
```

## Test Manual

### Tạo logo test đơn giản:
1. Mở Paint
2. Tạo canvas 200x200
3. Vẽ hình vuông màu đỏ
4. Save as PNG
5. Test với logo này

### Settings test khuyến nghị:
- Logo size: 20%
- Position: bottom-right
- Image size: 1000px width
- Quality: 85%

## Debug Commands

### Nếu cần debug chi tiết:
1. Mở app với DevTools: `npm start`
2. Console sẽ hiển thị:
   - Logo path
   - Dimensions
   - Position calculations
   - Success/error messages

### Check file manually:
```javascript
// In browser console
console.log('Current logo:', logoPath);
console.log('Current settings:', {logoPosition, logoSize});
```

## Version Info
- Fixed in: v3.0.2
- Engine: Jimp (stable)
- Debug: Full logging enabled
- Validation: Complete bounds checking