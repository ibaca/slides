steal( 'jquery/controller',
	   'jquery/view/ejs',
	   'jquery/controller/view',
	   'slides/models' )
.then( './views/init.ejs', 
       './views/presentation.ejs', 
       function($){

/**
 * @class Slides.Presentation.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists presentations and lets you destroy them.
 */
$.Controller('Slides.Presentation.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view('init',Slides.Models.Presentation.findAll()) )
	},
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.presentation').model().destroy();
		}
	},
	"{Slides.Models.Presentation} destroyed" : function(Presentation, ev, presentation) {
		presentation.elements(this.element).remove();
	},
	"{Slides.Models.Presentation} created" : function(Presentation, ev, presentation){
		this.element.append(this.view('init', [presentation]))
	},
	"{Slides.Models.Presentation} updated" : function(Presentation, ev, presentation){
		presentation.elements(this.element)
		      .html(this.view('presentation', presentation) );
	}
});

});