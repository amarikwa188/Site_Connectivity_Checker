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
        performAction(output);
    })
});

function performAction(data){
    const parts = data.split('::');
    const command = parts[0];
    const url = parts[1];
    
    switch (command){
        case "check":
            const status = parts[2];
            break;
        case "delete":
            deleteListItem(url);
            break;
        default:
            alert("response error");
    }
}

function deleteListItem(url){
    const frm = document.getElementsByName(url)[0];
    frm.remove();
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

    if(url === ""){
        return;
    }

    document.getElementById('list-box').innerHTML += 
    `
    <form method="POST" class="list-item" value="${url}" name="${url}">
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

    setTimeout(resetForm, 50);
}

function resetForm(){
    const frm = document.getElementById("add-url-form");
    frm.reset();
}