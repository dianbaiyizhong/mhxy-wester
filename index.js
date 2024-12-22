const {menubar} = require("menubar");
const {getCpuInfo} = require("./util/CpuUtil.js");
const path = require("path");

const mb = menubar({
    browserWindow: {
        transparent: true,
        width: 350,
        height: 550,
    },
    icon: "./resource/16x16.png",
    alwaysOnTop: true,
    showOnRightClick: true
});

let playTime = 120;
let trayAnimation = null;
let currentMode = 1;
mb.on("ready", () => {

    trayAnimation = setInterval(frame, playTime * 11);


    setInterval(function () {

        let cpuValue = getCpuInfo();
        if (cpuValue > 50) {
            currentMode = 2;
            clearInterval(trayAnimation);
            playTime = 40;
            trayAnimation = setInterval(frame, playTime * 11);
        } else {
            if (currentMode !== 1) {
                currentMode = 1;
            } else {
                return;
            }
            clearInterval(trayAnimation);
            playTime = 120;
            trayAnimation = setInterval(frame, playTime * 11);
        }

    }, 5000);
});


function frame() {
    for (let i = 0; i < 12; i++) {
        let file = path.join(__dirname, "resources", "mhxy_five_" + `${i}`.padStart(2, "0") + ".png");
        setTimeout(() => mb.tray.setImage(file), playTime * (i + 1));
    }


}

