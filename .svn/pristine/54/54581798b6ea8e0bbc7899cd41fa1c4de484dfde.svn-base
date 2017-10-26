var ComingSoon = function () {

    return {
        //main function to initiate the module
        init: function () {

            $.backstretch([
    		     "/static/common/img/bg/1.jpg",
				 "/static/common/img/bg/2.jpg",
				 "/static/common/img/bg/3.jpg",
				 "/static/common/img/bg/4.jpg"
    		        ], {
    		          fade: 1000,
    		          duration: 10000
    		    });

            var austDay = new Date();
            austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
            $('#defaultCountdown').countdown({until: austDay});
            $('#year').text(austDay.getFullYear());
        }

    };

}();