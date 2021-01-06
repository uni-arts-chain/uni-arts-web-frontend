export function getBlockTimestamp(
    blockHeight,
    lastBlockHeight,
    lastBlockTimetamp
) {
    let sign_timestamp =
        parseInt(lastBlockTimetamp) -
        (lastBlockHeight - parseInt(blockHeight)) * 6000;
    return parseInt(sign_timestamp / 1000);
}

export function DateFormat(inputTime) {
    if (!inputTime) return "";
    var date = new Date(inputTime * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}
