$(document).ready(onReady);

function onReady() {
    console.log('in jq');
    //get all the shoes and display
    displayShoes();
    //add click event listener to update price button
    $('#shoeTableBody').on('click', '.updatePriceButton', updatePrice);
}

function displayShoes() {
    $.ajax({
        method: 'GET',
        url: '/shoes'
    }).then(
        (response) => {
            $('#shoeTableBody').empty();
            response.forEach(shoe => {
                $('#shoeTableBody').append(`
                <tr>
                    <td>${shoe.name}</td>
                    <td>${shoe.cost}</td>
                    <td class='inputTd'><input  value=${shoe.cost} class="newPrice" /></td>
                    <td><button class="updatePriceButton" data-id='${shoe.id}'>Update Price</button></td>
                </tr>
            `)}
            )
        }
    )
}

//function to update price
function updatePrice() {
    let idClicked = $(this).data().id;
    let newPrice = $(this).closest('tr').find('input').val();
    console.log(idClicked, newPrice);

    $.ajax({
        method: 'PUT',
        url: '/shoes',
        data: {cost: newPrice,
                id: idClicked}       
    }).then(
        () => {
            displayShoes();
        }
    ).catch(
        error => {
            console.log(error);
        }
    )
}