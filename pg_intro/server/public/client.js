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
                $('#ulSongs').append(`
                <li>${song.artist} - ${song.track} - ${song.published} - ${song.rank}
                <button class="deleteButton" data-id="${song.id}">Delete</button>
                <button class="updateArtistButton" data-id="${song.id}">Update Artist</button>
                </li>`);
            } )
        }
    )
}

function deleteSong() {
    let idClicked = $(this).data().id;
    $.ajax({
        method:
    })
}

function updateArtist() {
    let idClicked = $(this).data().id;
    let songObj = {
        
    }
    $.ajax({
        method: 'PUT',
        url: '/songs/' + idClicked
    }).then(
        () => {
            displaySongs();
        }
    )
}
