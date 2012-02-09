steal('jquery/model', function() {

	/**
	 * @class Slides.Models.Presentation
	 * @parent index
	 * @inherits jQuery.Model
	 * Wraps backend presentation services.
	 */
	$.Model('Slides.Models.Presentation',
	/* @Static */
	{
		findAll : "/presentations.json",
		findOne : "/presentations/{id}.json",
		create : "/presentations.json",
		update : "/presentations/{id}.json",
		destroy : "/presentations/{id}.json",
		poll : function(startIndex, success, error) {
			// similar to findAll but polls the server and returns array of 'MyApp.Models.Notification objects
		}
	},
	/* @Prototype */
	{
		// id, currentSlide, dateCreated, lastUpdated, version
	});

})