steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'slides/models' )
	.then('./views/init.ejs', function($){

/**
 * @class Slides.Presentation.Create
 * @parent index
 * @inherits jQuery.Controller
 * Creates presentations
 */
$.Controller('Slides.Presentation.Create',
/** @Prototype */
{
	init : function(){
		this.element.html(this.view());
	},
	submit : function(el, ev){
		ev.preventDefault();
		this.element.find('[type=submit]').val('Creating...')
		new Slides.Models.Presentation(el.formParams()).save(this.callback('saved'));
	},
	saved : function(){
		this.element.find('[type=submit]').val('Create');
		this.element[0].reset()
	}
})

});