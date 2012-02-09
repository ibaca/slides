steal(
	'./slides.css', 			// application CSS file
	'./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'slides/presentation/create',
	'slides/presentation/list',
	'slides/user/create',
	'slides/user/list',
	'./plugins/jquery-1.7.1.min.js').then(
	'./css/smoothness/jquery-ui-1.8.17.custom.css',
	'./plugins/jquery-ui-1.8.17.custom.min.js',
	'./plugins/jquery.periodicalupdater.js',
	function(){					// configure your application
		
		var internalCurrentSlide = function(number) {
			// esto debe buscar o modificar el numero de slide actual
			if (numer === undefined ) {
				return 0;
			} else {
				// set current slide
				console.log("movido a diapositiva " + number);
			}
		}
		
		$('#presentations').slides_presentation_list();
		$('#create-presentation').slides_presentation_create();
	    //$('#users').slides_user_list();
		//$('#create').slides_user_create();
		
		$('#create-user').slides_user_create();
		Slides.Models.User.bind('created', function(ev, user){
			// A partir de aqui crear/sincronizar presentation
			$('#modal-dialog').dialog("close");
			if (user.type == "present") { // present
				var presentation = new Slides.Models.Presentation({
					id : user.presentation, currentSlide: 0
				}).save();
				

			} else { // view
				
				var interval = setInterval(function(){
					Slides.Models.Presentation.findAll({name: user.session}, 
						function(presentations){
							console.log(presentations);
							if (presentations.length == 0) {
								console.log("no presentation found");
								clearInterval(interval);
							} else {
								console.log("updated presentation " + presentations[0].name);
							}
						});
				},1000);
				
			}
			
		});
		$('#modal-dialog').dialog({modal:true});
		
		
		
})