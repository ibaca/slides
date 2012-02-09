steal( 'jquery/controller',
	   'slides/models', 
	   function($){

/**
 * @class Slides.Presentation
 * @parent index
 * @inherits jQuery.Controller
 * Creates presentations
 */
$.Controller('Slides.Presentation',
/** @Prototype */
{
	init : function(){
		this.presentationList = new $.Model.List([]);
		this.presentationList.bind("add",this.callback("addNotification"));
		this.presentationList.bind("remove",this.callback("removeNotification"));
		Slides.Models.Presentation.poll(this.callback("fill"), this.callback("error"));
	},
	fill : function(presentations){
		// add/remove objects from list
    },
	addNotification : function(event, newItems){
		
	},
	removeNotification : function(event, removedItems){
		
	}
})

});