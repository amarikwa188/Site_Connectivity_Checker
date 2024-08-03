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
        // const command = output.split('::');
        // alert(command);
        performAction(output);
    })
});

function performAction(data){
    const parts = data.split('::');
    const url = parts[1];
    
    switch (parts[0]){
        case "check":
            alert(parts[1]);
            alert(parts[2]);
            break;
        case "delete":
            alert(parts[1]);
            const frm = document.getElementsByName(url)[0];
            alert(frm.name);
            frm.remove();
            break;
        default:
            alert("response error");
    }
}

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
    <table>
    <tr>
        <td class="url-col">${url}</td>
        <td class="data-col">
            <p class="status">offline</p>
            <input type="submit" value="Check" class="check-button">
            <input type="submit" value="Delete" class="delete-button">
        </td>
    </tr>
    </table>
    </form>
    `
}