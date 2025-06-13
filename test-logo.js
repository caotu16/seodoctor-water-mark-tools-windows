// Simple test script to verify logo processing
const Jimp = require('jimp');
const path = require('path');

async function testLogoProcessing() {
  try {
    console.log('Testing logo processing...');
    
    // Create a test image (100x100 red square)
    const testImage = new Jimp(100, 100, 0xFF0000FF);
    
    // Create a test logo (20x20 blue square)
    const testLogo = new Jimp(20, 20, 0x0000FFFF);
    
    // Apply logo at position 10,10
    testImage.composite(testLogo, 10, 10);
    
    // Save test result
    await testImage.writeAsync('./test-result.png');
    
    console.log('✓ Logo processing test successful');
    console.log('✓ Test image saved as test-result.png');
    
  } catch (error) {
    console.error('✗ Logo processing test failed:', error);
  }
}

if (require.main === module) {
  testLogoProcessing();
}

module.exports = testLogoProcessing;