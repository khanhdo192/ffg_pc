const compression = require('compression')
const express = require('express');
const app = express();
const favicon = require('serve-favicon')
const path = require('path');
const port = 5000

app.use(compression())

app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/marketplace', function (req, res) {
    res.sendFile(path.join(__dirname + '/marketplace.html'));
});
app.get('/marketplace-vendor', function (req, res) {
    res.sendFile(path.join(__dirname + '/marketplace-vendor.html'));
});
app.get('/vendor-profile', function (req, res) {
    res.sendFile(path.join(__dirname + '/vendor-profile.html'));
});

app.get('/b2b', function (req, res) {
    res.sendFile(path.join(__dirname + '/b2b.html'));
});
app.get('/about-us', function(req, res) {
    res.sendFile(path.join(__dirname + '/about-us.html'));
});
app.get('/what-happening', function(req, res) {
    res.sendFile(path.join(__dirname + '/what-happening.html'));
});
app.get('/b2b-experience', function(req, res) {
    res.sendFile(path.join(__dirname + '/b2b_experience.html'));
});
app.get('/workshop', function(req, res) {
    res.sendFile(path.join(__dirname + '/workshop.html'));
});
app.get('/conversation', function(req, res) {
    res.sendFile(path.join(__dirname + '/conversation.html'));
});
app.get('/stage', function(req, res) {
    res.sendFile(path.join(__dirname + '/stage.html'));
});

app.listen(port, () => console.log(`Server running at: http://localhost:${port}`))