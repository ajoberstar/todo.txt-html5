var client = new Dropbox.Client({
    key: "FBRihWELovA=|N8m9X5d6C7sC3HFtSfHX732vz03vJDrYArXjmYyq0w=="
});
client.authDriver(new Dropbox.Drivers.Redirect({
    rememberUser: true
}));

function dropbox_auth() {
    client.authenticate(function(error, client) {
	if (error) {
	    $('#errors').html(error);
	    return;
	}
	$('#todo-dropbox-auth').remove();
	dropbox_load();
    });
}

function dropbox_load() {
    client.readFile("todo/todo.txt", function(error, data) {
	if (error) {
	    $('#errors').html(error);
	    return;
	}
	controller.createTodos(data);
    });
}
function dropbox_save_todo(content) {
    if (!client.isAuthenticated()) {
	$('#errors').html("<p>Not connected to Dropbox!");
	return;
    }
    client.writeFile("todo/todo.txt", content, function(error, stat) {
	if (error)
	    $('#errors').html(error);
    });
}
function dropbox_save_done(content) {
    if (!client.isAuthenticated()) {
	$('#errors').html("<p>Not connected to Dropbox!");
	return;
    }
    client.writeFile("todo/done.txt", content, function(error, stat) {
	if (error)
	    $('#errors').html(error);
    });
}
function dropbox_save_report(content) {
    if (!client.isAuthenticated()) {
	$('#errors').html("<p>Not connected to Dropbox!");
	return;
    }
    client.writeFile("todo/report.txt", content, function(error, stat) {
	if (error)
	    $('#errors').html(error);
    });
}

window.onload = function() {
    var dropboxdiv = $('#todo-dropbox')
    if (!client.isAuthenticated()) {
	dropboxdiv.append("<p><a id='todo-dropbox-auth'>Link to Dropbox</a></p>");
	$('#todo-dropbox-auth').click(dropbox_auth);
    }
};
