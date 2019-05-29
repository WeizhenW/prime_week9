$(document).ready(onReady);

function onReady() {
    console.log('in jq');
    displaySongs();
}

function displaySongs() {
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then(
        (response) => {
            console.log(response[0]);
            response.forEach((song) => {
                $('#ulSongs').append(`<li>${song.artist} - ${song.track} - ${song.published} - ${song.rank}</li>`);
            } )
        }
    )
}
