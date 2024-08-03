// handling form data for checking and deleting
$(document).on('submit', '.list-item', function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/',
        data:{
            command: $(this).find("input[type=submit]:focus").val(),
            value: $(this).attr('value')
        },
        success:function()
        {
            console.log('data sent');
        }
    }).done(function(output){
        alert(output);
    })
});

//handling form data for addition
$(document).on('submit', '#add-url-form', function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/',
        data:{
            command: 'Add',
            value: $('#added-url').val() 
        },
        success:function(){
            console.log('add done');
        }
    })
});

// front-end functions to handle ui changes
function addUrl(){
    const url = document.getElementById('added-url').value;
    document.getElementById('list-box').innerHTML += 
    `
    <form method="POST" class="list-item" value="${url}">
    <table border="1">
    <tr>
        <td class="url-col">${url}</td>
        <td class="data-col">
            <p class="status">offline</p>
            <input type="submit" value="Check" class="data-button">
            <input type="submit" value="Delete" class="data-button">
        </td>
    </tr>
    </table>
    </form>
    `
}