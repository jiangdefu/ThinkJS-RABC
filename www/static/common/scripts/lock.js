var Lock = function () {

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
		          duration: 8000
		      });
        }

    };

}();