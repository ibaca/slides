steal("funcunit/qunit", "slides/fixtures", "slides/models/presentation.js", function(){
	module("Model: Slides.Models.Presentation")
	
	test("findAll", function(){
		expect(4);
		stop();
		Slides.Models.Presentation.findAll({}, function(presentations){
			ok(presentations)
	        ok(presentations.length)
	        ok(presentations[0].name)
	        ok(presentations[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Slides.Models.Presentation({name: "dry cleaning", description: "take to street corner"}).save(function(presentation){
			ok(presentation);
	        ok(presentation.id);
	        equals(presentation.name,"dry cleaning")
	        presentation.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Slides.Models.Presentation({name: "cook dinner", description: "chicken"}).
	            save(function(presentation){
	            	equals(presentation.description,"chicken");
	        		presentation.update({description: "steak"},function(presentation){
	        			equals(presentation.description,"steak");
	        			presentation.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Slides.Models.Presentation({name: "mow grass", description: "use riding mower"}).
	            destroy(function(presentation){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})