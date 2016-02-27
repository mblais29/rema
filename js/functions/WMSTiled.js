function WMSTiled(wmsTiledOptions){
	var options = {
		getTileURL: function(coord, zoom){
			var proj = map.getProjection();
			var zfactor = Math.pow(2, zoom);
			var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256 / zfactor, coord.y * 256 / zfactor));	
			var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256 / zfactor, (coord.y + 1) * 256 / zfactor));
			
			var ne = toMercator(top);
			var sw = toMercator(bot);
			var bbox = ne.x = ',' + sw.y + ',' + sw.x + ',' + ne.y;
			
			var url = wmsTiledOptions.url;
			url += '&version=' + wmsTiledOptions.version;
			url += '&request=GetMap';
			url += '&layers=' + wmsTiledOptions.layers;
			url += '&styles=' +  wmsTiledOptions.styles;
			url += '&TRANSPARENT=TRUE';
			url += '&SRS=EPSG:3857';
			url += '&BBOX' + bbox;
			url += '&WIDTH=256';
			url += '&HEIGHT=256';
			url += '&FORMAT=image/png';
			return url;
		},
		tileSize: new google.maps.Size(256,256),
		isPng: true
	};
}

function WMSFeatureInfo(mapObj, options){
	this.map = mapObj;
	this.url = options.url;
	this.version = options.version;
	this.layers = options.layers;
	this.callback = options.callback;
	this.fixedParams = 'REQUEST=GetFeatureInfo&EXCEPTIONS=application%2Fvnd.ogc.se_xml&SERVICE=WMS&FEATURE_COUNT=5000&styles=&srs=EPSG:3857&INFO_FORMAT=text/javascript&format=image%2Fpng';
	
	this.overlay = new google.maps.Overlay();
	this.overlay.draw = function(){};
	this.overlay.setMap(this.map);
}	

WMSFeatureInfo.prototype.url = function(coord){
	var pnt = this.overlay.getProjection().fromLatLngToContainerPixel(coords);
	var mapBounds = this.map.getBounds;
	var ne = mapBounds.getNorthEast();
	var sw = mapBounds.getSouthWest();
	
	var neMerc = toMercator(ne);
	var swMerc = toMercator(sw);
	var bbox = swMerc.x + ',' + swMerc.y + ',' + neMerc.x + ',' + neMerc.y;
	
	var rUrl = this.url + this.fixedParams;
	rUrl += '&version=' + this.version;
	rUrl += '&QUERY_LAYERS=' + this.layers + '&Layers=' + this.layers;
	rUrl += '&BBOX=' + bbox;
	rUrl += '&WIDTH=' + this.map.getDiv().clientWidth + '&HEIGHT=' + this.map.getDiv().clientHeight;
	rUrl += '&x=' + Math.round(pnt.x) + '&y=' + Math.round(pnt.y);
	rUrl += '&format_options=callback:' + this.callback;
	return rUrl;
	
};

function toMercator(coord){
	var lat = coord.lat();
	var lng = coord.lng();
	
	if((Math.abs(lng) > 180 || Math.abs(lat) > 90 ))
		return;
	var num = lng * 0.017453292519943295;
	var x = 6378137.0 * num;
	var a = lat * 0.017453292519943295;
	var merc_lon = x;
	var merc_lat = 3189068.5 * Math.log((1.0 + Math.sin(a))/(1.0 - Math.sin(a)));
	return{x: merc_lon, y: merc_lat};
}

//Example to create tiled image
/*
var tiledWMS = new WMSTiled({
	url: 'http://localhost:8081/geoserver/REMA/wms?',
	version: '1.1.1',
	layers: 'REMA:yt_contours_50k',
	styles: ''
});
map.overlayMapTypes.push(tiledWMS);
*/	

