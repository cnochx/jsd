window.addEventListener('load', function() {
    // Transfer BreadcrumpVar to localStorage
    if (BreadcrumpVar) {
        for (let key of Object.keys(BreadcrumpVar)) {
            let value = BreadcrumpVar[key];
            localStorage[key] = value;
        }
    }
    // Transfer IndexIds to localStorage
    if (IndexIds) {
        localStorage.setItem('indexids', JSON.stringify(IndexIds));
    }
    console.log('All assets for index are loaded');
});
// Define Slide-show/Carousel
let ToggleOverlay = new Toggle();
$('.slideshow-carousel')
    .on('init', function(event, slick) {
        ToggleOverlay.switch('node');


    })
    .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        arrows: true,
        prevArrow: '<button type="button" data-role="none" class="slick-prev"><i class="fas fa-backward"></i></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next"><i class="fas fa-forward"></i></button>',
        useCSS: true,
        useTransform: true,
        fade: true,
        dots: true,
        dotsClass: 'slick-dots',
        // Custom paging templates
        customPaging: function(slider, i) {
            return '<button type="button" data-role="none"></button>';
        },
        swipeToSlide: true,
        touchMove: true,
        // Infinite looping
        infinite: true,
        // Mobile first
        mobileFirst: true,

        zIndex: 51,
        asNavFor: '.slider-section'

    })
    .on('afterChange', function(event, slick, currentSlide) {

        switch (currentSlide) {
            case 0:

                ToggleOverlay.switch('node');
                ToggleOverlay.fade('html');
                ToggleOverlay.fade('css');
                ToggleOverlay.fade('javascript');
                ToggleOverlay.fade('php');
                ToggleOverlay.fade('mysql');

                console.log(currentSlide);
                break;

            case 1:

                ToggleOverlay.fade('node');
                ToggleOverlay.switch('html');
                ToggleOverlay.fade('css');
                ToggleOverlay.fade('javascript');
                ToggleOverlay.fade('php');
                ToggleOverlay.fade('mysql');

                console.log(currentSlide);
                break;

            case 2:
                ToggleOverlay.fade('node');
                ToggleOverlay.fade('html');
                ToggleOverlay.switch('css');
                ToggleOverlay.fade('javascript');
                ToggleOverlay.fade('php');
                ToggleOverlay.fade('mysql');

                console.log(currentSlide);
                break;

            case 3:
                ToggleOverlay.fade('node');
                ToggleOverlay.fade('html');
                ToggleOverlay.fade('css');
                ToggleOverlay.switch('javascript');
                ToggleOverlay.fade('php');
                ToggleOverlay.fade('mysql');

                console.log(currentSlide);
                break;

            case 4:
                ToggleOverlay.fade('node');
                ToggleOverlay.fade('html');
                ToggleOverlay.fade('css');
                ToggleOverlay.fade('javascript');
                ToggleOverlay.switch('php');
                ToggleOverlay.fade('mysql');

                console.log(currentSlide);
                break;

            case 5:
                ToggleOverlay.fade('node');
                ToggleOverlay.fade('html');
                ToggleOverlay.fade('css');
                ToggleOverlay.fade('javascript');
                ToggleOverlay.fade('php');
                ToggleOverlay.switch('mysql');

                console.log(currentSlide);
                break;
            default:

                console.log(currentSlide);
                break;
        }
    });
$('.slider-section')
    .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        accessibility: true,
        arrows: true,
        prevArrow: '<button type="button" data-role="none" class="slick-prev"><i class="fas fa-backward"></i></button>',
        nextArrow: '<button type="button" data-role="none" class="slick-next"><i class="fas fa-forward"></i></button>',
        dots: true,
        dotsClass: 'slick-dots',
        customPaging: function(slider, i) {
            return '<button type="button" data-role="none"></button>';
        },
        // swipe: true,
        // // Infinite looping
        // infinite: true,
        centerMode: true,
        focusOnSelect: true,
        zIndex: 51,
        asNavFor: '.slideshow-carousel',
    })
    .on('afterChange', function(event, slick, currentSlide) {

        switch (currentSlide) {
            case 0:

                console.log(currentSlide);
                break;

            case 1:


                console.log(currentSlide);
                break;

            case 2:

                console.log(currentSlide);
                break;

            case 3:

                console.log(currentSlide);
                break;

            case 4:

                console.log(currentSlide);
                break;

            case 5:


                console.log(currentSlide);
                break;
            default:

                console.log(currentSlide);
                break;
        }
    });