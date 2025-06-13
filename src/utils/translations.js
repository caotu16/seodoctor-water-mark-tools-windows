const translations = {
  vi: {
    appTitle: 'SEO Doctor: Image Water Mark Tool',
    imageUpload: {
      title: 'Tải Ảnh Lên',
      dropText: 'Kéo thả ảnh vào đây hoặc',
      browseText: 'chọn file',
      selectedImages: 'ảnh đã chọn'
    },
    logoUpload: {
      title: 'Chọn Logo',
      selectLogo: 'Chọn Logo',
      noLogo: 'Chưa chọn logo',
      logoSelected: 'Logo đã chọn'
    },
    position: {
      title: 'Vị Trí Logo',
      topLeft: 'Góc trên trái',
      topRight: 'Góc trên phải',
      bottomLeft: 'Góc dưới trái',
      bottomRight: 'Góc dưới phải',
      center: 'Giữa',
      size: 'Kích thước logo'
    },
    resize: {
      title: 'Điều Chỉnh Kích Thước Ảnh',
      enable: 'Bật điều chỉnh kích thước',
      width: 'Chiều rộng (px)',
      note: 'Chiều cao sẽ được tính theo tỷ lệ'
    },
    compression: {
      title: 'Nén Ảnh',
      enable: 'Bật nén ảnh',
      quality: 'Chất lượng'
    },
    output: {
      title: 'Thư Mục Xuất',
      select: 'Chọn Thư Mục Xuất',
      selected: 'Thư mục đã chọn'
    },
    processing: {
      title: 'Xử Lý',
      start: 'Bắt Đầu Xử Lý',
      processing: 'Đang xử lý...',
      currentFile: 'Đang xử lý',
      completed: 'Hoàn thành',
      success: 'thành công',
      failed: 'thất bại'
    },
    messages: {
      selectImages: 'Vui lòng chọn ít nhất một ảnh để xử lý.',
      selectOutput: 'Vui lòng chọn thư mục xuất.',
      processingComplete: 'Xử lý hoàn tất!',
      settingsSaved: 'Cài đặt đã được lưu'
    },
    help: {
      title: 'Trợ Giúp',
      website: 'Truy cập Website'
    },
    footer: {
      author: 'Tác giả: Tú Cao',
      websites: 'www.seodoctor.vn - www.nguyencaotu.com'
    },
    language: {
      switch: 'Chuyển sang Tiếng Anh'
    }
  },
  en: {
    appTitle: 'SEO Doctor: Image Water Mark Tool',
    imageUpload: {
      title: 'Upload Images',
      dropText: 'Drag and drop images here or',
      browseText: 'browse files',
      selectedImages: 'images selected'
    },
    logoUpload: {
      title: 'Select Logo',
      selectLogo: 'Select Logo',
      noLogo: 'No logo selected',
      logoSelected: 'Logo selected'
    },
    position: {
      title: 'Logo Position',
      topLeft: 'Top Left',
      topRight: 'Top Right',
      bottomLeft: 'Bottom Left',
      bottomRight: 'Bottom Right',
      center: 'Center',
      size: 'Logo size'
    },
    resize: {
      title: 'Image Resize',
      enable: 'Enable image resize',
      width: 'Width (px)',
      note: 'Height will be calculated proportionally'
    },
    compression: {
      title: 'Image Compression',
      enable: 'Enable compression',
      quality: 'Quality'
    },
    output: {
      title: 'Output Folder',
      select: 'Select Output Folder',
      selected: 'Folder selected'
    },
    processing: {
      title: 'Processing',
      start: 'Start Processing',
      processing: 'Processing...',
      currentFile: 'Processing',
      completed: 'Completed',
      success: 'successful',
      failed: 'failed'
    },
    messages: {
      selectImages: 'Please select at least one image to process.',
      selectOutput: 'Please select an output folder.',
      processingComplete: 'Processing completed!',
      settingsSaved: 'Settings saved'
    },
    help: {
      title: 'Help',
      website: 'Visit Website'
    },
    footer: {
      author: 'Author: Tú Cao',
      websites: 'www.seodoctor.vn - www.nguyencaotu.com'
    },
    language: {
      switch: 'Switch to Vietnamese'
    }
  }
};

function useTranslation(language = 'vi') {
  return translations[language] || translations.vi;
}

window.useTranslation = useTranslation;