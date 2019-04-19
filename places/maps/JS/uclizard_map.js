function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

// Call Variables
url_bypass = "https://cors-anywhere.herokuapp.com/";
place_id = get('id');
map_id = get('id_map');
url_request = url_bypass + "https://uclizard-backend.herokuapp.com/backend?map=true&place_id=" + place_id + '&map_id=' + map_id;
url_request_name = url_bypass + "https://uclizard-backend.herokuapp.com/backend?detail=true&place_id=" + place_id;
fetch(url_request_name, {
    method: "GET",
}).then((response) => {
    return response.json()
}).then((json) => {
    console.log(json);
    var places_list = json['surveys'][0]['maps'];
    for (let index = 0; index < places_list.length; index++) {
        if (places_list[index]['id'] == map_id) {
            var name_page = document.getElementById('header-row');
            html_element = '<span class="mdl-layout-title">' + places_list[index]['name'] + '</span>';
            name_page.insertAdjacentHTML('afterbegin', html_element);
        }
    }
})

window.onload = function () {
    //load '../path/to/your.svg' in the canvas with id = 'canvas'
    var canvas = document.getElementById('canvas');
    style_tag = "width: " + getWidth() + "; height: " + (getHeight() - 84) + ";";
    fetch(url_request)
        .then(response => response.text())
        .then(svg => {
            document.getElementById('map_canvas').insertAdjacentHTML("afterbegin", svg);
            map_canvas = document.getElementsByTagName("svg")[0];
            console.log(document.getElementsByTagName("svg").length);
            map_canvas.setAttribute('style', style_tag);
            var panZoomMap = svgPanZoom(map_canvas, {
                zoomEnabled: true,
                controlIconsEnabled: true,
                fit: true,
                center: true,
            })
        });
};