function onGetGeoCode( data ) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(data.text, "text/xml");
    var places = dom.getElementsByTagName("Name");
    var coordinates = dom.getElementsByTagName("Coordinates");
    var latlng = coordinates[0].textContent;
    var idokeido = latlng.split(',');
    var ido =idokeido[1];
    var keido = idokeido[0];
    window.open("https://disaportal.gsi.go.jp/maps/index.html?ll=" + ido +"," + keido + "&z=14&base=pale&ls=tameike_raster%2C0.8%7Cflood_list%2C0.8%7Cflood_list_l2%2C0.8%7Ctsunamishinsui_raster%2C0.8%7Cseamless%7Cdosha_kiken_nadare%2C0.8%7Cdosha_kiken_jisuberi%2C0.8%7Cdosha_kiken_kyukeisha%2C0.8%7Cdosha_kiken_dosekiryu%2C0.8%7Cdosha_keikai_jisuberi%2C0.8%7Cdosha_keikai_dosekiryu%2C0.8%7Cdosha_keikai_kyukeisha%2C0.8%7Cyoboukiseikukan_multi%2C0.8%7Cjizenkisei_00_multi%2C0.8%7Ckansui_multi%2C0.8%7Cdisaster1%7Cdisaster5%7Cdisaster2&disp=101101111111111000&vs=c1j0l0u0");
}

var params = {
    'action' : 'getGeoCode',
    'place' : '東京都町田市'
}


//background処理と同期
function map(params){
    chrome.runtime.sendMessage(params, onGetGeoCode);
}

//全要素取得
var address = document.querySelectorAll('.cassetteitem_detail-col1');


address.forEach(function (button) {
    //クリックした時にクリックした要素を取得してそれをparams.placeに渡してmapを起動
    button.addEventListener("click", function(event) {
        params.place = button.textContent;//クリックしたaddressの住所文字列をplaceに格納
        map(params);//22行目のparamsに渡す
    },false);
});

//右端の広告たちを消す
//document.querySelectorAll(".sub").forEach(e => e.parentNode.removeChild(e))
