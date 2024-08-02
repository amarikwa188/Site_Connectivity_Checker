// handling form data for checking and deleting
$(document).on('submit', '.list-item', function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/',
        data:{
            // 'this' refers the form, not the button
            command: $('button').val(),
            value: $(this).attr('value')
        },
        success:function()
        {
            console.log("action succesful");
        }
    })
});