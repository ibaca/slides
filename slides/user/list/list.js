steal( 'jquery/controller',
	   'jquery/view/ejs',
	   'jquery/controller/view',
	   'slides/models' )
.then( './views/init.ejs', 
       './views/user.ejs', 
       function($){

/**
 * @class Slides.User.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists users and lets you destroy them.
 */
$.Controller('Slides.User.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view('init',Slides.Models.User.findAll()) )
	},
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.user').model().destroy();
		}
	},
	"{Slides.Models.User} destroyed" : function(User, ev, user) {
		user.elements(this.element).remove();
	},
	"{Slides.Models.User} created" : function(User, ev, user){
		this.element.append(this.view('init', [user]))
	},
	"{Slides.Models.User} updated" : function(User, ev, user){
		user.elements(this.element)
		      .html(this.view('user', user) );
	}
});

});