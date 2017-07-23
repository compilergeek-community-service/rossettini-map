/*
     Copyright (C) 2017 Yoland Gao

     This program is free software: you can redistribute it and/or modify
     it under the terms of the GNU Affero General Public License as published
     by the Free Software Foundation, either version 3 of the License, or
     (at your option) any later version.

     This program is distributed in the hope that it will be useful,
     but WITHOUT ANY WARRANTY; without even the implied warranty of
     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     GNU Affero General Public License for more details.

     You should have received a copy of the GNU Affero General Public License
     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function triggerModal(){
    $('#modal').modal('show');
}

$('#modal').on('show.bs.modal', function(){
    $('#modal').find('.modal-body').html(
        "<img style='max-height: 500px; max-width: 100%; display: block;margin-left: auto;margin-right: auto' src=\'assets/images/{0}.jpg\'/>"
            .format(location.hash.split("#")[1])
    );
});

function showCoordinates (e) {
    alert(e.latlng);
}
var map = L.map('map', {
    crs: L.CRS.Simple,
    // contextmenu: true,
    // contextmenuWidth: 140,
    // contextmenuItems: [{
    //     text: 'Show coordinates',
    //     callback: showCoordinates
    // }],
    maxZoom: 1
});
var bounds = [[0,0], [848, 1203]];
L.imageOverlay('assets/school_scan.png', bounds).addTo(map);
map.fitBounds(bounds);
map.setMaxBounds(new L.LatLngBounds([0,1203], [848, 0]));

function addMarker(x, y, message, url){
    html = "{0}<br><a href='javascript:location.hash=\"#{1}\";triggerModal();' target='_blank'>Image</a>".format(message, url);
    var m = L.marker(L.latLng(x, y)).addTo(map).bindPopup(html);
}