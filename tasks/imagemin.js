/* eslint-disable */
const imagemin = require('imagemin-keep-folder');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminSvgo = require('imagemin-svgo');

const path = process.argv[2] === 'wp' ? 'htdocs/assets/images/**/*.{png,svg,jpg}' : 'wp/wp-content/themes/mashup/assets/images/**/*.{png,svg,jpg}';

imagemin([path], {
  plugins: [
    imageminMozjpeg({ quality: 80 }),
    imageminPngquant({ quality: [0.65, 0.8] }),
    imageminSvgo()
  ],
  replaceOutputDir: output => {
    return output.replace(/images\//, 'images/')
  }
}).then(() => {
  console.log('Images optimized');
});
