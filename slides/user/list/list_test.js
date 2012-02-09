steal('funcunit',function(){

module("Slides.User.List", { 
	setup: function(){
		S.open("//slides/user/list/list.html");
	}
});

test("delete users", function(){
	S('#create').click()
	
	// wait until grilled cheese has been added
	S('h3:contains(Grilled Cheese X)').exists();
	
	S.confirm(true);
	S('h3:last a').click();
	
	
	S('h3:contains(Grilled Cheese)').missing(function(){
		ok(true,"Grilled Cheese Removed")
	});
	
});


});