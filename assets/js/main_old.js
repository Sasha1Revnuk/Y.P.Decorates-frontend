 jQuery(document).ready(function () {
     "use strict"

	if (top != self) top.location.replace(self.location.href);

     /*  - Carouserl Slider Interval Speed
     ------------------------------------------------*/
     jQuery("#menuzord").menuzord({
         align: "right"
     });
     /*  - End Of Carouserl Slider Interval Speed
     ------------------------------------------------*/

    /* Testimonial news page and news detail */
    if( $().owlCarousel() ){
        $('.testimoniuls .owl-carousel').owlCarousel({
          loop: true, // loop is true up to 1199px screen.
          nav: false, // is true across all sizes
          navigation : true, // is true across all sizes
          margin: 0, // margin 10px till 960 breakpoint
          autoplay: true,
          responsiveClass: true, // Optional helper class. Add 'owl-reponsive-' + 'breakpoint' class to main element.
                    
          // Object keys can be Numbers (like in this example) or Strings: '480'
          // Owl has build in sort option
          // Setting from widest screen to smallest still work.

          responsive:{
            0:{
              items: 1 // In this configuration 1 is enabled from 0px up to 479px screen size 
            },
            1200:{
              items: 1,
              loop: false,
              margin: 0,
            }
          }
        });
    }

     /*  - for search bar toggle 
     ---------------------------------------------------*/
     jQuery(".toggle-pade").on("click",function(){
         jQuery(".form-group").toggle("slow");
     });
     /*  - for search bar toggle end 
     ---------------------------------------------------*/

    /* Popup gallery images service page */
    if ($().magnificPopup) {
        $('.owl-theme').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image'
            // other options
        });

        $('#mmhome3.mm-our-project').magnificPopup({
          delegate: 'a', // child items selector, by clicking on it popup will open
          type: 'image'
          // other options
        });

        // home 2
        $('#isotopItems.mm-isotopItems').magnificPopup({
          delegate: 'a', // child items selector, by clicking on it popup will open
          type: 'image'
          // other options
        });
    }
    // home 1

    if( $().isotope ){
        var $container_1 = $('#container').isotope({});
        $('#mmfilters').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $container_1.isotope({ filter: filterValue });
        });
        $('#mmfilters li').click(function(e) {
            e.preventDefault();
            $('li').removeClass('active');
            $(this).addClass('active');
        });
    }


    /*  - wow animation wow.js 
    ---------------------------------------------------*/
      var wow = new WOW ({
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       false       // trigger animations on mobile devices (true is default)
        }
      );
      wow.init();
    /*  - wow animation wow.js End 
    ---------------------------------------------------*/

    /* Counter home 3*/
    if( $().counterUp ){
        $('#counter .counter').counterUp({
            delay: 10,
            time: 1000
        });
    }

    /* Project detail page*/
    if( $().beforeAfter ){
        $('#container.welcome-img').beforeAfter();
    }

     /*  - Quote Slider
     ---------------------------------------------------*/
     $('.quote-section .owl-carousel').owlCarousel({
         loop: true, // loop is true up to 1199px screen.
         nav: false, // is true across all sizes
         margin: 0, // margin 10px till 960 breakpoint
         autoplay: true,
         responsiveClass: true, // Optional helper class. Add 'owl-reponsive-' + 'breakpoint' class to main element.
         responsive: {
             0: {
                 items: 1 // In this configuration 1 is enabled from 0px up to 479px screen size 
             },
             1200: {
                 items: 1,
                 loop: false,
                 margin: 0,
             }
         }
     });
     /*  - End Of Quote Slider
     ---------------------------------------------------*/



     /*  - Quote Slider
     ---------------------------------------------------*/
     $('.mm-our-project .owl-carousel').owlCarousel({
         loop: true, // loop is true up to 1199px screen.
         nav: false, // is true across all sizes
         margin: 0, // margin 10px till 960 breakpoint
         autoplay: true,
         responsiveClass: true, // Optional helper class. Add 'owl-reponsive-' + 'breakpoint' class to main element.
         responsive: {
             0: {
                 items: 1 // In this configuration 1 is enabled from 0px up to 479px screen size 
             },
             1200: {
                 items: 5,
                 loop: false,
                 margin: 0,
             },
             991: {
                 items: 3,
                 loop: false,
                 margin: 0,
             },
             640: {
                 items: 2,
                 loop: false,
                 margin: 0,
             }
         }
     });
     /*  - End Of Quote Slider
     ---------------------------------------------------*/


     /*  - product Details Slider
     ---------------------------------------------------*/
     $('.mm-product-details .owl-carousel').owlCarousel({
         loop: true, // loop is true up to 1199px screen.
         nav: false, // is true across all sizes
         margin: 0, // margin 10px till 960 breakpoint
         autoplay: true,
         responsiveClass: true, // Optional helper class. Add 'owl-reponsive-' + 'breakpoint' class to main element.
         responsive: {
             0: {
                 items: 1 // In this configuration 1 is enabled from 0px up to 479px screen size 
             },
             1200: {
                 items: 3,
                 loop: false,
                 margin: 0,
             },
             680: {
                 items: 2,
                 loop: false,
                 margin: 0,
             }
         }
     });
     /*  - End Of product Details Slider
     ---------------------------------------------------*/



     /*  - Project Details Slider
     ---------------------------------------------------*/
     $('.mm-project-details .owl-carousel').owlCarousel({
         loop: true, // loop is true up to 1199px screen.
         nav: false, // is true across all sizes
         margin: 0, // margin 10px till 960 breakpoint
         autoplay: true,
         responsiveClass: true, // Optional helper class. Add 'owl-reponsive-' + 'breakpoint' class to main element.
         responsive: {
             0: {
                 items: 1 // In this configuration 1 is enabled from 0px up to 479px screen size 
             },
             1200: {
                 items: 3,
                 loop: false,
                 margin: 0,
             },
             680: {
                 items: 2,
                 loop: false,
                 margin: 0,
             }
         }
     });
     /*  - End Of Project Details Slider
     ---------------------------------------------------*/



 }); // Document Resdy Function End
