// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("presentation", 5, function(i, presentation){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			id: i,
			name: (i == 0) ? "inftel" : "presentation-"+i,
			currentSlide: 0,
			description: $.fixture.rand( descriptions , 1)[0],
			dateCreated: new Date().getTime(),
			lastUpdate: new Date().getTime()
		}
	})
	$.fixture("/presentations.json?name=inftel", function(){
		return { 
			id: 0,
			name: "inftel",
			currentSlide: 0,
			dateCreated: new Date().getTime(),
			lastUpdate: new Date().getTime()
		};
	});
	$.fixture.make("user", 5, function(i, user){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "user "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
})