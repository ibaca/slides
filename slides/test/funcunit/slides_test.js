steal("funcunit", function(){
	module("slides test", { 
		setup: function(){
			S.open("//slides/slides.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})