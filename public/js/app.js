(function ($, document, window) {

	$(document).ready(function () {

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function () {
			$(".mobile-navigation").slideToggle();
		});
		$(".search-form button").click(function () {
			$(this).toggleClass("active");
			var $parent = $(this).parent(".search-form");

			$parent.find("input").toggleClass("active").focus();
		});


		$(".slider").flexslider({
			controlNav: false,
			prevText: '<i class="fa fa-chevron-left"></i>',
			nextText: '<i class="fa fa-chevron-right"></i>',
		});
		if ($(".map").length) {
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14
					}
				},
				marker: {
					address: "40 Sibley St, Detroit",
				}
			},
				"autofit");

		}

		// Reviews refresh by criteria's

		var $selectorGenre = $('#select-genre')
		var $selectorYear = $('#select-year')
		var $selectorPage = $('.page-number')

		var currentPage = 1;

		var getMovies = function ($selectorGenre, $selectorYear, page) {

			// 2. Retrieve selected data
			var genre = $selectorGenre.val();
			var year = $selectorYear.val();

			// 3. Do AJAX Request
			var url = '/reviews/' + genre + '/' + year + '/' + page;
			$.ajax({
				url: url,
				type: 'GET',
				success: function (response, status) {
					//Méthode 1 : le serveur retourne une view compilée
					//$('.movie-list').html(response)
					//Méthode 2 : le serveur retourne du json

					let output = '';
					response.forEach((movie) => {
						output += '<div class="movie">'
						output += '<figure class="movie-poster">'
						if (movie.fields.image_url) {
							output += '<img src="' + movie.fields.image_url + '"alt="' + movie.fields.title + '">'
						}
						else {
							output += '<img src="https://www.valmorgan.com.au/wp-content/uploads/2016/06/default-movie-1-3.jpg" alt="">'
						}
						output += '</figure>'
						output += '<div class="movie-title">'
						output += '<a href="/review/' + movie.fields._id + '">' + movie.fields.title + '</a>'
						output += '</div>'
						output += '<p>' + movie.fields.plot + '</p>'
						output += '</div>'
					})
					$('.movie-list').html(output);
				},
				error: function (error, response, status) {
					alert(error.message)
				}
			})
		}
		if ($selectorGenre.length && $selectorYear.length) {
			// 1. Attache change event listener
			$('.filter-selector').on('change', function (e) {
				getMovies($selectorGenre, $selectorYear, currentPage)
			})

			// Attache click event listener on pagination links
			$selectorPage.on('click', function(e){
				e.preventDefault();
				currentPage = $(this).text()
				$selectorPage.removeClass(' current')
				$selectorPage.each(($selector)=>{
					if($(this).text()===currentPage){
						$(this).addClass(' current')
					}
				})
				getMovies($selectorGenre, $selectorYear, currentPage)
			})
		}
	});

	$(window).load(function () {

	});

})(jQuery, document, window);