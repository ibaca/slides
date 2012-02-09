//steal/js slides/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build').then('steal/build/scripts','steal/build/styles',function(){
	steal.build('slides/scripts/build.html',{to: 'slides'});
});
