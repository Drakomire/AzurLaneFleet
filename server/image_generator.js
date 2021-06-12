const sharp = require('sharp')
var temp = require('temp');
var fs = require('fs');

module.exports.imageGenerator = (data,callback) => {
    const width = 1280;
    const height = 720;
    const channels = 4;
    const rgbaPixel = 0x00000000;

    const canvas = Buffer.alloc(width * height * channels, rgbaPixel);

    var tempName = temp.path({suffix: '.png'});

    let image = sharp(canvas, { raw : { width, height, channels } })
    .toFile(tempName, (err, info) => {
        callback(tempName)
     });


}