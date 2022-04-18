const XMLHttpRequest = require('xhr2');
const config = require('./config.json')
var url = "https://discord.com/api/v9/users/@me/settings";
const status = require('./models/savedStatus')
const moment = require('moment')

loop()

async function loop() {
    if (moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds') < 5) {
        updateStatus()
    }
    setTimeout(() => {
        loop()
    }, 5000);
}

async function updateStatus() {
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);

    xhr.setRequestHeader("authorization", config.auth);
    xhr.setRequestHeader("Content-Type", "application/json");

    const userStatus = await status.findOne()

    if (!userStatus) {
        return;
    } else {
        xhr.onreadystatechange = async function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    await status.findOneAndRemove({
                        status: userStatus.status
                    })
                    return;
                } else {
                    return;
                }
            }
        };

        var data = `{"custom_status":{"text":"${userStatus.status}"}}`;

        xhr.send(data);

        return;
    }
}

module.exports = { updateStatus }