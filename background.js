function conv2GeoCode( place, callback ) {
    var url = "https://map.yahooapis.jp/geocode/V1/geoCoder?"
            + "appid=dj0zaiZpPUp3ZjNhQUVvM3p5VCZzPWNvbnN1bWVyc2VjcmV0Jng9ZTA-"
            + "&query=" + encodeURIComponent(place);
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if( req.readyState == 4 ) {// 通信完了
            if( req.status == 200 ) { // 通信成功
                callback({'text': req.responseText});
            }
        }
    }
    req.open("GET", url, true);
    req.send();
}

function onMessage( request, sender, callback ) {
    if( request.action == "getGeoCode" ) {
        conv2GeoCode( request.place, callback );
    }
    return true;
}
chrome.runtime.onMessage.addListener(onMessage);
