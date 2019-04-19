function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

// Call Variables
url_bypass = "https://cors-anywhere.herokuapp.com/";
place_id = get('id');
console.log(place_id);
url_request = url_bypass + "https://uclizard-backend.herokuapp.com/backend?detail=true&place_id=" + place_id;

// Colours
ucl_red = "#93272C";
ucl_yellow = "#F6BE00";
ucl_green = "#8F993E";

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}
if (getWidth() < 512) {
    var width = getWidth();
} else {
    var width = 512;
}

fetch(url_request, {
        method: "GET",
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json);
        var library_list = document.getElementById('spaces-list');
        var name_page = document.getElementById('header-row');
        html_element = '<span class="mdl-layout-title">' + json['surveys'][0]['name'] + '</span>';
        name_page.insertAdjacentHTML('afterbegin', html_element);
        bg_image = "./assets/" + json['surveys'][0]['id'] + ".jpg";
        console.log(bg_image);
        document.getElementById('main-content-bg').style.backgroundImage = "url('" + bg_image + "');";
        console.log(json['surveys'][0]['maps']);
        var places_list = json['surveys'][0]['maps'];

        for (let index = 0; index < places_list.length; index++) {
            places_total = places_list[index]['sensors_absent'] + places_list[index]['sensors_occupied'] + places_list[
                index]['sensors_other'];
            places_ratio = places_list[index]['sensors_absent'] / places_total;
            if (0 < places_ratio < 0.33) {
                colour = ucl_red;
            } else if (0.33 < places_ratio < 0.66) {
                colour = ucl_yellow;
            } else {
                colour = ucl_green;
            }
            html_element_1 =
                '<div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: ' + width + 'px' + ';"><div class="mdl-card__title" style="background: ' +
                colour + ';"><h2 class="mdl-card__title-text">';
            html_element_2 = html_element_1 + places_list[index]['name'] +
                '</h2></div><div class="mdl-card__supporting-text">';
            html_element_3 = html_element_2 + places_list[index]['sensors_absent'] + ' Places Available out of ' +
                places_total + '.</div>';
            html_element_4 = html_element_3 +
                '<div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="color: ' +
                colour + '" href="./maps/map.html?' + 'id=' + place_id + '&' + 'id_map=' + places_list[index]['id'] +
                '">';
            html_element_final = html_element_4 + 'Open Map</a></div></div><br/>';
            library_list.insertAdjacentHTML('beforeend', html_element_final);
        }
    })