// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         prevArrow: '<button type="button" class="slick-prev"><img src= "icons/arrow_left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src= "icons/arrow_right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//                 dots: true,
//                 arrows: false,
//                 autoplay: false
//                 }
//             }
//         ]
//     });
//   });

var slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true,
    speed: 1200,
  });

  document.querySelector('.prev').addEventListener('click', function (){
    slider.goTo('prev');
  });

  document.querySelector('.next').addEventListener('click', function (){
    slider.goTo('next');
  });



$(document).ready(function(){  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  

  function toggleSlide (item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }
  toggleSlide ('.catalog-item__link');
  toggleSlide ('.catalog-item__back');

  // modal window

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('[data-modal=order]').on('click', function () {
    $('.overlay, #order').fadeIn('slow');
  });

  $('[data-modal=order]').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  function valideForm (form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        name: "Введитe свое имя",
        phone:"Введите свой номер телефона",
        email: {
          required: "Введите свою почту",
          email: "Почта должна быть в формате name@domain.com"
        }
      }
    });
  }
  valideForm('#consultation form');
  valideForm('#order form');
  valideForm('#consultation-form');

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.page_up').fadeIn();
    }else{
      $('.page_up').fadeOut();
    }
  });
  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});
  
});