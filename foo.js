function a() {
    console.log('Call From A');
}

function b() {
    console.log('Call From B');
}

module.exports.a = a;

module.exports.b = b;