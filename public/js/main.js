
// Ajax call to delete post
$(document).ready(function(){
	$('.delete').on('click',function(e){
		e.preventDefault();
		$target=$(e.target);
		const id=$target.attr('data-id');
		var remove= confirm('Are you sure you want to delete the post');
		if(remove) {
		$.ajax({
		type:'DELETE',
		url: '/post/'+id,
		success:function(response) {
			alert('post deleted');
			window.location.href='/';
		},
		error: function(err) {
			console.log(err);
		}
		})
	}
	});
	$('.edit').on('click',function(e){
		$target=$(e.target);
		const id=$target.attr('data-id');
		$.ajax({
			type:'GET',
			url:'/post/edit/'+id,
			success:function(response) {
				console.log('success')
				window.location.href='/post/edit/'+id;
			},
			error: function(err) {
				console.log(err)
			}
		})
	})
	$(".reply-button").click(function(e) {
    // make corresponding reply-block visible
    $(this).closest(".container").find(".reply-block").show();
    // other code here to act on the click
 });
	$(".reply-cancel").click(function(e) {
    // make corresponding reply-block visible
    $(this).closest(".container").find(".reply-block").hide();
    // other code here to act on the click
 });
	$("#post-form").submit(function() {
		if(localStorage.getItem('myUserEntity')==null){
    		alert("login to post an Ad");
    		return false;
  	} else {
  		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:3000/tokensignin',true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function() {
  		console.log('Signed in as: ' + xhr.responseText);
		};	
		console.log('printing id token');
		console.log(id_token);
		xhr.send('idtoken=' + id_token);
  		console.log('entered session Storage else part');
        return true;
  }
	});
});
