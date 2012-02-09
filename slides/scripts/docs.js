//js slides/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('slides/slides.html', {
		markdown : ['slides']
	});
});