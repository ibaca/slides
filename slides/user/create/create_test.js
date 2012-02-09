steal('funcunit',function(){

module("Slides.User.Create", { 
	setup: function(){
		S.open("//slides/user/create/create.html");
	}
});

test("create users", function(){
	//S("[name=type,value=view]").check();
	S("[name=session]").type("a-session");
	S("[name=nick]").type("a-nick");
	S("[type=submit]").click();
	S('h3:contains(a-nick)')
		.exists(function(){
			ok(true, "a-session added");
			equals(S("[name=session]").val() , "", "form reset");
			equals(S("[name=nick]").val() , "", "form reset");
		})
});


});