//imports and global variables
var NodeWebcam = require( "node-webcam" );
var ocrSpaceApi = require('ocr-space-api');
var fs = require('fs');
var Motion = require('motion-detect').Motion;
var motion = new Motion();
var image = 1;
var hasMotion;
//create required folders if dont exist
if (!fs.existsSync('frames')){
    fs.mkdirSync('frames');
}
if (!fs.existsSync('saved')){
    fs.mkdirSync('saved');
}
//logo
`
..%%%%....%%%%...%%%%%....%%%%....%%%%...%%%%%%...%%%%...%%..%%...%%%%...%%%%%...%%%%%..
.%%......%%..%%..%%..%%..%%..%%..%%......%%......%%......%%..%%..%%..%%..%%..%%..%%..%%.
.%%.%%%..%%%%%%..%%%%%...%%%%%%..%%.%%%..%%%%....%%.%%%..%%..%%..%%%%%%..%%%%%...%%..%%.
.%%..%%..%%..%%..%%..%%..%%..%%..%%..%%..%%......%%..%%..%%..%%..%%..%%..%%..%%..%%..%%.
..%%%%...%%..%%..%%..%%..%%..%%...%%%%...%%%%%%...%%%%....%%%%...%%..%%..%%..%%..%%%%%..
........................................................................................
Welcome to the Garage Guard, Copyright S. Frydrych 2020
`
//config
var detectOrientation = 'True';
var scale = 'True'
var delay = 1000;
var apikey = 'ebbac6394288957'; //orc.space api key
var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
    delay: 0,
    saveShots: true,
    output: "png",
    callbackReturn: "base64",
    device: false,
    verbose: false
};
//main loop
function main() {
    var Webcam = NodeWebcam.create( opts );
    var frame = 1;
    Webcam.capture("frames/frame" + frame, async function (error1, data1) {
        frame++;
        Webcam.clear();
        try{await new Promise(resolve => setTimeout(resolve, delay));}catch (e){console.log(e)}
        Webcam.capture("frames/frame" + frame, function (error2, data2) {
            hasMotion = motion.detect("frames/frame1.png", "frames/frame2.png");
            //if motion between two photos detected
            if (hasMotion == true) {
                let ts = Date.now();
                let date_ob = new Date(ts);
                let date = date_ob.getDate();
                let month = date_ob.getMonth() + 1;
                let year = date_ob.getFullYear();
                let hour = date_ob.getHours();
                let minute = (date_ob.getMinutes()<10?'0':'') + date_ob.getMinutes();
                var stream = fs.createReadStream('frames/frame2.png').pipe(fs.createWriteStream(`saved/${year}-${month}-${date}-${hour}-${minute}_${image}.png`));
                stream.close()
                image++;
                console.log(year + "-" + month + "-" + date + " " + hour + ":" + minute + ' /!\\ MOTION HAS BEEN DETECTED /!\\')
                //ocr.space api
                var options = {
                    apikey: apikey,
                    imageFormat: 'image/png',
                    detectOrientation: detectOrientation,
                    scale: scale,
                    OCREngine: 2
                };
                const imageFilePath = "frames/frame2.png";
                ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
                    .then(function (parsedResult) {
                        console.log('Vehicle Registration Plate: ', parsedResult.parsedText);
                        Webcam.clear();
                        main();
                    }).catch(function (err) {
                    console.log('ERROR:', err);
                    Webcam.clear();
                    main();
                });
            }
        });
    });
}

main();