/**
 * Created by admin on 2016/12/20.
 */

$(document).ready(function () {
    ~function (desW) {
        var winW = document.documentElement.clientWidth,

            oMain = document.getElementById("oMain"),
            n = winW / desW;
        if (winW > 750) {
            $('#quick_wapper').css("left", (winW - 750) / 2);
        }
        if (winW > desW) {
            oMain.style.width = desW + "px";
            return;
        }
        document.documentElement.style.fontSize = n * 100 + "px";

    }(750);
});
//区域滚动
var myScroll, myScroll_quick, oImg, gueData, LI, LL, ray, num;
var oBtn = $('#header').children(), aDiv = $('.page').children();
setTimeout(function () {
    myScroll = new IScroll('#circum', {
        freeScroll: true,
        checkDOMChange: true,
        useTransition: true,
        momentum: true,
        click: true,
        bounce: false
    });
    myScroll_quick = new IScroll('#quick_wapper', {
        freeScroll: true,
        checkDOMChange: true,
        useTransition: true,
        momentum: true,
        click: true,
        bounce: false
    });

}, 300);
for (var i = 0; i < oBtn.length; i++) {
    oBtn[i].index = i;
    oBtn[i].onclick = function () {
        for (var i = 0; i < oBtn.length; i++) {
            oBtn[i].className = '';
            $(aDiv[i]).hide();
        }
        oBtn[this.index].className = 'bg';
        $(aDiv[this.index]).show();
        myScroll.refresh();
    }
}
//接收轮播图参数
function getImg(data) {
    oImg = JSON.parse(JSON.stringify(data));
    bindImg(oImg);
}
//接收guess-like页面数据
function getGuss(data) {
    gueData = JSON.parse(JSON.stringify(data));
    bindGuess(gueData);
}
//绑定轮播
function bindImg(data) {
    var str = '';
    if (data.length) {
        for (var i = 0; i < (data.length); i++) {
            if (i == 0) {
                str += '<div class="mui-slider-group mui-slider-loop">';
                str += '<div id="' + data[i].id + '"  class="mui-slider-item mui-slider-item-duplicate">';
                str += '<a href="#">';
                str += '<img src="' + data[data.length - 1].imgSrc + '">';
                str += '</a>';
                str += '</div>';
                str += '<div id="' + data[i].id + '" class="mui-slider-item mui-active">';
                str += '<a href="#">';
                str += '<img src="' + data[0].imgSrc + '">';
                str += '</a>';
                str += '</div>';
            } else if (i >= 1 && i < data.length - 1) {
                str += '<div id="' + data[i].id + '" class="mui-slider-item">';
                str += '<a href="#">';
                str += '<img src="' + data[i].imgSrc + '">';
                str += '</a>';
                str += '</div>';
            } else if (i == data.length - 1) {
                str += '<div id="' + data[i].id + '" class="mui-slider-item">';
                str += '<a href="#">';
                str += '<img src="' + data[i].imgSrc + '">';
                str += '</a>';
                str += '</div>';
                str += '<div id="' + data[i].id + '" class="mui-slider-item mui-slider-item-duplicate">';
                str += '<a href="#">';
                str += '<img src="' + data[0].imgSrc + '">';
                str += '</a>';
                str += '</div>';
                str += '</div>';
            }

        }
        for (var n = 0; n < data.length; n++) {
            if (n == 0) {
                str += '<div class="mui-slider-indicator">';
                str += '<div class="mui-indicator mui-active"></div>';
            } else if (n >= 1 && n < data.length - 1) {
                str += '<div class="mui-indicator"></div>';
            } else if (n == data.length - 1) {
                str += '<div class="mui-indicator"></div>';
                str += '</div>'
            }

        }
    }
    $('.banner').append(str);
    str = '';
    banner();
}
//图片轮播
function banner() {
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 2000
    });
    var items = mui('.mui-indicator');
    for (var i = 0; i < items.length; i++) {
        items[i].index = i;
        mui('.mui-slider-indicator').on('tap', '.mui-indicator', function () {
            gallery.slider().gotoItem(this.index, true);
        })
    }
}
//绑定guess-like页面
function bindGuess(data) {
    var guessStr = '';
    for (var m = 0; m < data.length; m++) {
        var curGue = data[m];
        guessStr += '<li id="' + curGue["id"] + '" class="mui-table-view-cell mui-media guess_list">';
        guessStr += '<a href="javascript:;" class="">';
        guessStr += '<img class="mui-media-object mui-pull-left" src="' + curGue["imgUrl"] + '">';
        guessStr += '<div class="mui-media-body">' + curGue["name"] + '';
        guessStr += '<p class="mui-ellipsis">￥' + curGue["price"] + '</p>';
        guessStr += '<p class="about">';
        guessStr += '<span>' + curGue["evaluate"] + '条评价</span>';
        guessStr += '<span>' + curGue["rating"] + '%好评</span>';
        guessStr += '<span>' + curGue["place"] + '<i>' + curGue["Distance"] + '</i></span>';
        guessStr += '</p></div></a></li>';
    }
    $('.guess-like ul').append(guessStr);
    guessStr = '';
    try {
        myScroll.refresh();
    } catch (e) {

    }
}
function onTap() {
    //guess-like区域tap事件区
    $('.guess-like').on('click', '.guess_list', function () {
        var _type = $(".guess-like").attr("id");
        sendData.call(this, _type);
    })
        .on('click', '.search', function () {
            initCircumMap(LI, LL, 13,$(this).attr('index'));
        });
    // gps区域tap事件区
    $('.gps').on('click', '.gps_icon', function () {
        var _s;
        switch ($(this).attr('id')) {
            case 'ATM':
                _s = '银行';
                break;
            case 'CVS':
                _s = '便利店';
                break;
            case 'Hospital':
                _s = '医院';
                break;
            case 'hotel':
                _s = "酒店住宿";
                break;
            default:
                _s = "咖啡茶社";
        }
        initCircumMap(LI, LL, 13, _s);
        setTimeout(function () {
            myScroll.refresh();
        },500)
    });
    $('.banner').on('click', ".mui-slider-item", function () {
        var _type = $(".banner").attr("id");
        sendData.call(this, _type);
    });
    //quick事件区
    $('.quick_nav li').on('click', function () {
        // alert(this.id);
        $('#shade').css({top: this.offsetTop, left: this.offsetLeft, display: "block"});
        var _type = $('#quick').attr('id');
        sendData.call(this, _type);
    });
    $('.call_quick').on('click', function () {
        var _type = $('#quick').attr('id');
        sendData.call(this, _type);
    });
}
function isiOSPlatform() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return true;
    } else {
        return false;
    }
}
function isAndroidPlatform() {
    var ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) {
        return true;
    } else {
        return false;
    }
}
function sendData(type, x, y) {
    if (type == "map") {
        data = {
            "type": "",
            "id": "",
            "gnote": ""
        };
        var arr = [];
        arr.push(x, y);
        data.id = type;
        data.type = type;
        data.gnote = arr;
    }
    else if (type == 'guide') {
        var id = this.getAttribute("id"), data;
        data = {
            "type": "",
            "id": "",
            "data": ""
        };
        data.data = x;
        data.id = id;
        data.type = type;
    } else {
        id = this.getAttribute("id");
        data = {
            "type": "",
            "id": ""
        };
        data.id = id;
        data.type = type;
    }
    // iOS 平台
    console.log(data);
    var jsonData = JSON.stringify(data);
    if (isiOSPlatform()) {
        window.webkit.messageHandlers.discovery_onClick.postMessage(jsonData);
    }
    //android 平台
    if (isAndroidPlatform()) {
        window.list.discovery_onClick(jsonData);
    }

}
function initQuickMap(I, L, z, p) {
    var map, features = [];

    function loadFeatures() {
        for (var feature, data, i = 0, len = features.length, j, jl, path; i < len; i++) {
            data = features[i];
            switch (data.type) {
                case "Marker":
                    feature = new AMap.Marker({
                        map: map,
                        position: new AMap.LngLat(data.lnglat.lng, data.lnglat.lat),
                        zIndex: 3,
                        extData: data,
                        offset: new AMap.Pixel(data.offset.x, data.offset.y),
                        title: data.name,
                        content: '<div class="icon icon-' + data.icon + ' icon-' + data.icon + '-' + data.color + '"></div>'
                    });
                    break;
                case "Polyline":
                    for (j = 0, jl = data.lnglat.length, path = []; j < jl; j++) {
                        path.push(new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat));
                    }
                    feature = new AMap.Polyline({
                        map: map,
                        path: path,
                        extData: data,
                        zIndex: 2,
                        strokeWeight: data.strokeWeight,
                        strokeColor: data.strokeColor,
                        strokeOpacity: data.strokeOpacity
                    });
                    break;
                case "Polygon":
                    for (j = 0, jl = data.lnglat.length, path = []; j < jl; j++) {
                        path.push(new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat));
                    }
                    feature = new AMap.Polygon({
                        map: map,
                        path: path,
                        extData: data,
                        zIndex: 1,
                        strokeWeight: data.strokeWeight,
                        strokeColor: data.strokeColor,
                        strokeOpacity: data.strokeOpacity,
                        fillColor: data.fillColor,
                        fillOpacity: data.fillOpacity
                    });
                    break;
                default:
                    feature = null;
            }
            if (feature) {
                AMap.event.addListener(feature, "click", mapFeatureClick);
            }
        }
    }

    var cen = [];
    cen.push(I, L);
    var zom = z == '' ? 13 : z;
    map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: zom,
        center: cen
    });
    loadFeatures();
    map.on('complete', function () {
        map.plugin(["AMap.ToolBar", "AMap.OverView", "AMap.Scale"], function () {
            map.addControl(new AMap.ToolBar);
            map.addControl(new AMap.Scale);
        });
    });
    if (p !== undefined) {
        p = JSON.parse(p);
        var markers = [], curL = {};
        curL.name = "当前位置";
        curL.center = I + "," + L;
        curL.type = 0;
        p.push(curL);
        function Rad(d) {
            return d * Math.PI / 180.0;
        }

        function GetDistance(lat1, lng1, lat2, lng2) {
            var radLat1 = Rad(lat1);
            var radLat2 = Rad(lat2);
            var a = radLat1 - radLat2;
            var b = Rad(lng1) - Rad(lng2);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378.137;// EARTH_RADIUS;
            s = Math.round(s * 10000) / 10000; //输出为公里
            return s;
        }

        for (var i = 0; i < p.length; i += 1) {
            var curLat = cen[0], curLng = cen[1];
            var nextLa = p[i].center.split(',')[0], nextLg = p[i].center.split(',')[1];
            var marker;
            if (p[i].type === 0) {
                var icon = new AMap.Icon({
                    image: './img/dangqianweizhi-@2x.png',
                    size: new AMap.Size(20, 20),
                    imageSize: new AMap.Size(20, 20)
                });
                marker = new AMap.Marker({
                    icon: icon,
                    position: p[i].center.split(','),
                    offset: new AMap.Pixel(-0, -0),
                    zIndex: 120,
                    map: map
                });

            } else if (0 < GetDistance(curLat, curLng, nextLa, nextLg) && GetDistance(curLat, curLng, nextLa, nextLg) <= 1) {
                icon = new AMap.Icon({
                    image: './img/dianbiao@2x.png',
                    size: new AMap.Size(24, 31),
                    imageSize: new AMap.Size(24, 31)
                });
                marker = new AMap.Marker({
                    icon: icon,
                    position: p[i].center.split(','),
                    offset: new AMap.Pixel(-0, -0),
                    zIndex: 101,
                    map: map
                });
            } else if (1 < (GetDistance(curLat, curLng, nextLa, nextLg)) && (GetDistance(curLat, curLng, nextLa, nextLg)) <= 3) {
                icon = new AMap.Icon({
                    image: './img/dianbiao@2x.png',
                    size: new AMap.Size(19, 25),
                    imageSize: new AMap.Size(19, 25)
                });
                marker = new AMap.Marker({
                    icon: icon,
                    position: p[i].center.split(','),
                    offset: new AMap.Pixel(-0, -0),
                    zIndex: 101,
                    map: map
                });
            } else if (3 < GetDistance(curLat, curLng, nextLa, nextLg) && GetDistance(curLat, curLng, nextLa, nextLg) <= 5) {
                icon = new AMap.Icon({
                    image: './img/dianbiao@2x.png',
                    size: new AMap.Size(15, 20),
                    imageSize: new AMap.Size(15, 20)
                });
                marker = new AMap.Marker({
                    icon: icon,
                    position: p[i].center.split(','),
                    offset: new AMap.Pixel(-0, -0),
                    zIndex: 101,
                    map: map
                });
            }
            markers.push(marker);
        }

    } else {
        icon = new AMap.Icon({
            image: './img/blue-pin.png',
            size: new AMap.Size(30, 30),
            imageSize: new AMap.Size(30, 30)
        });
        marker = new AMap.Marker({
            icon: icon,
            position: cen,
            offset: new AMap.Pixel(-0, -0),
            zIndex: 101,
            map: map
        });
    }
}
function initCircumMap(I, L, z, s) {
    var infowindow, map, features = [], marker, markers = [], cen = [];
    var zom = z == '' ? 13 : z;
    LI = I;
    LL = L;
    cen.push(I, L);
    function loadFeatures() {
        for (var feature, data, i = 0, len = features.length, j, jl, path; i < len; i++) {
            data = features[i];
            switch (data.type) {
                case "Marker":
                    feature = new AMap.Marker({
                        map: map,
                        position: new AMap.LngLat(data.lnglat.lng, data.lnglat.lat),
                        zIndex: 3,
                        extData: data,
                        offset: new AMap.Pixel(data.offset.x, data.offset.y),
                        title: data.name,
                        content: '<div class="icon icon-' + data.icon + ' icon-' + data.icon + '-' + data.color + '"></div>'
                    });
                    break;
                case "Polyline":
                    for (j = 0, jl = data.lnglat.length, path = []; j < jl; j++) {
                        path.push(new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat));
                    }
                    feature = new AMap.Polyline({
                        map: map,
                        path: path,
                        extData: data,
                        zIndex: 2,
                        strokeWeight: data.strokeWeight,
                        strokeColor: data.strokeColor,
                        strokeOpacity: data.strokeOpacity
                    });
                    break;
                case "Polygon":
                    for (j = 0, jl = data.lnglat.length, path = []; j < jl; j++) {
                        path.push(new AMap.LngLat(data.lnglat[j].lng, data.lnglat[j].lat));
                    }
                    feature = new AMap.Polygon({
                        map: map,
                        path: path,
                        extData: data,
                        zIndex: 1,
                        strokeWeight: data.strokeWeight,
                        strokeColor: data.strokeColor,
                        strokeOpacity: data.strokeOpacity,
                        fillColor: data.fillColor,
                        fillOpacity: data.fillOpacity
                    });
                    break;
                default:
                    feature = null;
            }
            if (feature) {
                AMap.event.addListener(feature, "click", mapFeatureClick);
            }
        }
    }

    map = new AMap.Map('cirMap', {
        resizeEnable: true,
        zoom: zom,
        center: cen,
        doubleClickZoom: true
    });
    loadFeatures();
    map.on('complete', function () {
        map.plugin(["AMap.ToolBar", "AMap.OverView", "AMap.Scale"], function () {
            map.addControl(new AMap.ToolBar);
            map.addControl(new AMap.Scale);

        });
    });
    map.on('zoomend', function () {
        num = map.getZoom();
    });
    var icon = new AMap.Icon({
        image: './img/dangqianweizhi-@2x.png',
        size: new AMap.Size(20, 20),
        imageSize: new AMap.Size(20, 20)
    });
    marker = new AMap.Marker({
        icon: icon,
        position: cen,
        offset: new AMap.Pixel(-6, 0),
        zIndex: 120,
        map: map
    });
    if (isNaN(s) && s !== '' && s !== undefined) {
        AMap.service(["AMap.PlaceSearch"], function() {
            var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                pageSize: 10,
                pageIndex: 1,
                map: map,
                //panel: "panel"
            });
            var cpoint = [];
            cpoint.push(I,L);
            placeSearch.searchNearBy(s, cpoint, 2000, function(status, result) {

            });
        });
    }
    AMap.event.addListener(map, "touchmove", function () {
        myScroll.disable();
    });
    AMap.event.addListener(map, "touchend", function () {
        myScroll.enable();
    });
}
function insertSort(ary) {
    var left = ary.splice(0, 1);
    for (var i = 0; i < ary.length; i++) {
        for (var j = left.length - 1; j >= 0;) {
            if (ary[i].distance < left[j].distance) {
                j--;
                if (j == -1) {
                    left.unshift(ary[i]);
                }
            } else {
                left.splice(j + 1, 0, ary[i]);
                break;
            }
        }
    }
    return left;
}
var provinces = JSON.stringify([
    {
        "center": "116.30589, 39.964373",
        "type": 1,
    }, {
        "center": "116.30000, 39.964373",
        "type": 1,
    },
    {
        "center": "116.28000, 39.964373",
        "type": 1,
    },
    {
        "center": "116.27000, 39.964373",
        "type": 1,
    }
]);

initQuickMap(116.308489, 39.964373, 13, provinces);
initCircumMap(116.308489, 39.964373, 13);
// console.log(a);
// utils.getImg();
// utils.getGuss();
onTap();














