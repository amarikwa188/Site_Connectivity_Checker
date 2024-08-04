const urls = Object.values(urlListJson);

// handling form data for checking and deleting
$(document).on('submit', '.list-item', function(e){
    e.preventDefault();

    const command = $(this).find("input[type=submit]:focus").val();
    const url = $(this).attr('value');

    updateCheckingMessage(url, "check");

    $.ajax({
        type: 'POST',
        url: '/',
        data:{
            command: command,
            value: url
        }
    }).done(function(output){
        performAction(output);

        if (command === "Delete"){
            const index = urls.indexOf(url);
            urls.splice(index, 1);
        }else{
            updateCheckingMessage(url, "found");
        }    
    })
});

function updateCheckingMessage(url, state){
    const display = document.getElementsByName(`update${url}`)[0];
    switch(state){
        case "check":
            display.textContent = '...';
            break;
        case "found":
            display.textContent = "!";
            setTimeout(clearCheckingMessage(display), 1000);
            break;
    }
}

function clearCheckingMessage(display){
    function inner(){
        display.textContent = "";
    }

    return inner;
}

function performAction(data){
    const parts = data.split('::');
    const command = parts[0];
    const url = parts[1];
    const status = parts[2];
    
    switch (command){
        case "check":
            updateStatusUI(url, status);
            break;
        case "delete":
            deleteListItem(url);
            if (status === "True"){
                displayNoUrlsMessage();
            }
            break;
        default:
            alert("response error");
    }
}

function updateStatusUI(url, status){
    const statusObject = document.getElementsByName(`status${url}`)[0];

    if(status == "True"){
        statusObject.style = "background-color: lightgreen;"
        statusObject.innerHTML = "online";
    }else{
        statusObject.style = "background-color: lightpink;"
        statusObject.innerHTML = "offline";
    }

}

function deleteListItem(url){
    const frm = document.getElementsByName(url)[0];
    frm.remove();
}

function displayNoUrlsMessage(){
    const message = document.getElementById("no-urls");
    message.style = "display: revert";
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
    }else if(urls.includes(url)){
        displayDuplicateMessage();
        return
    }

    document.getElementById('list-box').innerHTML += 
    `
    <form method="POST" class="list-item" value="${url}" name="${url}">
    <table class="table">
    <tr>
        <td class="url-col">${url}</td>
        <td class="data-col">
            <p class="update" name="update${url}"></p>
            <p class="status" name="status${url}">status</p>
            <input type="submit" value="Check" class="check-button" name="${url}">
            <input type="submit" value="Delete" class="delete-button">
        </td>
    </tr>
    </table>
    </form>
    `
    //reset form after data has been sent
    setTimeout(resetForm, 50);

    // add url to list
    urls.push(url);

    //remove 'no current urls' watermark if present 
    if (urls.length === 1){
        const message = document.getElementById("no-urls");
        message.style = "display: none";
    } 
}

function displayDuplicateMessage(){
    const message = document.getElementById("duplicate");
    message.style.color = "lightcoral";

    setTimeout(resetDuplicateMessage, 1500);
}

function resetDuplicateMessage(){
    const message = document.getElementById("duplicate");
    message.style.color = "lightyellow";
}

function resetForm(){
    const frm = document.getElementById("add-url-form");
    frm.reset();
}