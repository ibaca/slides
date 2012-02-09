// Primero un closure de $
(function($) {
	$.fn.tabber = function() {

		var $ul = this.closest("ul");

		$ul.on('click', 'li', function(event) {
			var ref = event.target.id;
			//desactivamos seccion y activamos elemento de menu
			$ul.find(".active").removeClass("active");
			$ul.find("#" + ref).addClass("active");
			//ocultamos divisiones, mostramos la seleccionada
			$(".content").hide(); // esto es peligroso!
			$("#" + a).show();
		});
		// Devuelve this que contiene jQuery DOM (chainability)
		return this;
	}
})(jQuery);
