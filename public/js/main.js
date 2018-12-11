
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
});
