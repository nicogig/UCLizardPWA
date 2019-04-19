var dialog = document.querySelector('dialog');
var showDialogButton = document.querySelector('#show-dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
});

// Call Variables
url_bypass = "https://cors-anywhere.herokuapp.com/";
url_request = url_bypass + "https://uclizard-backend.herokuapp.com/backend?summary=true";

// Colours
ucl_red = "#93272C";
ucl_yellow = "#F6BE00";
ucl_green = "#8F993E";

fetch(url_request, {
        method: "GET",

    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json);
        var library_list = document.getElementById('content-libraries');
        for (let index = 0; index < json['surveys'].length; index++) {
            console.log(json['surveys'][index]['id']);
            places_total = json['surveys'][index]['sensors_absent'] + json['surveys'][index]['sensors_occupied'] + json[
                'surveys'][index]['sensors_other'];
            places_ratio = json['surveys'][index]['sensors_absent'] / places_total;
            console.log(places_ratio);
            if (0 < places_ratio && places_ratio < 0.33) {
                colour = ucl_red;
            } else if (0.33 < places_ratio && places_ratio < 0.66) {
                colour = ucl_yellow;
            } else if (0.66 < places_ratio) {
                colour = ucl_green;
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
            if (getWidth() < 512) {
                var width = getWidth();
            } else {
                var width = 512;
            }
            html_element_1 =
                '<div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: ' + width + 'px' + ';"><div class="mdl-card__title" style="background: ' +
                colour + ';"><h2 class="mdl-card__title-text">';
            html_element_2 = html_element_1 + json['surveys'][index]['name'] +
                '</h2></div><div class="mdl-card__supporting-text">';
            html_element_3 = html_element_2 + json['surveys'][index]['sensors_absent'] + ' Places Available out of ' +
                places_total + '.</div>';
            html_element_4 = html_element_3 +
                '<div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="color: ' +
                colour + '" href="./places/place_details.html?id=' + json['surveys'][index]['id'] + '" target="_parent">';
            html_element_final = html_element_4 + 'View More</a></div></div><br/>';
            library_list.insertAdjacentHTML('beforeend', html_element_final);
        }
    })
window.onload = function () {
    var cards = document.getElementsByClassName('mdl-card');
    console.log(cards.length);
};