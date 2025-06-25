//Gnb Scroll
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 0) {
    $('.gnb').addClass('scrolled');
  } else {
    $('.gnb').removeClass('scrolled');
  }
});

//2단메뉴
$('.depth3_wrap').hide();
$('.bg').hide();

$('.gnb .depth2 > li').mouseenter(function () {
  const $this = $(this);
  const isPerfume = $this.hasClass('perfume');
  const isHandLip = $this.hasClass('Hand_Lip');
  const isBody = $this.hasClass('Body');
  const isHair = $this.hasClass('Hair');
  const isHome = $this.hasClass('Home');
  const isGiftIdea = $this.hasClass('GiftIdea');
  const isAbout = $this.hasClass('About');

  $('.depth3_wrap').stop(true, true).fadeOut(200);
  $('.bg').stop(true, true).fadeIn(200);

  if (isPerfume) {
    $('.depth3_perfume').stop(true, true).fadeIn(200);
  } else if (isHandLip) {
    $('.depth3_Hand_Lip').stop(true, true).fadeIn(200);
  } else if (isBody) {
    $('.depth3_Body').stop(true, true).fadeIn(200);
  } else if (isHair) {
    $('.depth3_Hair').stop(true, true).fadeIn(200);
  } else if (isHome) {
    $('.depth3_Home').stop(true, true).fadeIn(200);
  } else if (isGiftIdea) {
    $('.depth3_GiftIdea').stop(true, true).fadeIn(200);
  } else if (isAbout) {
    $('.depth3_About').stop(true, true).fadeIn(200);
  }
});

$('.gnb .depth2 > li, .bg').mouseleave(function () {
  $('.depth3_wrap').stop(true, true).fadeOut(200);
  $('.bg').stop(true, true).fadeOut(200);
});

//Banner Slide
  $(document).ready(function () {
      $('.slide').slick({
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: false,
          dots: true,
      });
  });

//Section2__Slidee
  $(document).ready(function () {
    $('.slide2_left').slick({
      arrows: true,
      dots: false,
      infinite: false,
      fade: false,
      cssEase: 'ease-in-out'
    });

    let scrollTimeout;
    let currentIndex = -1;
    let isSyncingScroll = false;
    let isSyncingSlide = false;
//
$(document).ready(function () {
  $('.slide2_left').slick({
    arrows: false,
    asNavFor: '.slide2_right',
    fade: true,
    autoplay: false,
    infinite: false
  });

  $('.slide2_right').slick({
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev">←</button>',
    nextArrow: '<button type="button" class="slick-next">→</button>',
    asNavFor: '.slide2_left',
    fade: true,
    autoplay: false,
    infinite: false
  });
});

//슬라이드 스크롤
let isScrolling = false;

$('.slide2_left').on('wheel', function (e) {
  e.preventDefault();

  if (isScrolling) return;

  isScrolling = true;

  const delta = e.originalEvent.deltaY;

  if (delta > 0) {
    $('.slide2_left').slick('slickNext');
  } else {
    $('.slide2_left').slick('slickPrev');
  }

  setTimeout(() => isScrolling = false, 500);
});

// 오른쪽 스크롤 시 왼쪽 슬릭 변경
  $('.slide2_right').on('scroll', function () {
    if (isSyncingScroll) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      let newIndex = -1;

      $('.txt_item').each(function (i) {
        const itemTop = $(this).offset().top;
        const wrapperTop = $('.slide2_right').offset().top;
        const diff = itemTop - wrapperTop;

        if (diff >= 0 && diff < $(this).height() / 2) {
          newIndex = i;
          return false;
        }
      });

      if (newIndex !== -1 && newIndex !== currentIndex) {
        currentIndex = newIndex;
        isSyncingSlide = true;
        $('.slide2_left').slick('slickGoTo', currentIndex);
        setTimeout(() => isSyncingSlide = false, 500);
      }
    }, 80);
  });

// 왼쪽 슬릭 넘기면 오른쪽 텍스트도 해당 위치로 이동
    $('.slide2_left').on('afterChange', function (event, slick, currentSlide) {
    if (isSyncingSlide) return;

    const $wrapper = $('.slide2_right');
    const $targetItem = $('.txt_item').eq(currentSlide);
    const scrollTarget = $targetItem.position().top + $wrapper.scrollTop();

    isSyncingScroll = true;
    $wrapper.stop().animate({ scrollTop: scrollTarget }, 400, function () {
      isSyncingScroll = false;
    });
  });
  });
  $('.category_tab li').click(function () {
    const targetCategory = $(this).data('category');

    $('.category_tab li').removeClass('on');
    $(this).addClass('on');

    $('.swiper-slide').hide();

    if (targetCategory === 'all') {
      $('.swiper-slide').show();
    } else {
      $('.swiper-slide.' + targetCategory).show();
    }
  });

//section3
let $originalSlides = null;
let progressFill = document.querySelector('.product_progress-fill');
let mySwiper;

function initSwiper() {
  if (mySwiper) mySwiper.destroy(true, true);

  mySwiper = new Swiper('#section3 .product_swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    allowTouchMove: true,
    loop: false,
    watchOverflow: true,
    on: {
      slideChange: function () {
        const currentIndex = this.activeIndex;
        const totalPages = this.snapGrid.length;
        const percent = ((currentIndex + 1) / totalPages) * 100;
        if (progressFill) {
          progressFill.style.width = `${percent}%`;
        }
      }
    }
  });

  const totalPages = mySwiper.snapGrid.length;
  if (progressFill && totalPages > 0) {
    progressFill.style.width = `${(1 / totalPages) * 100}%`;
  }

  mySwiper.slideTo(0);
}

function updateSlides(category) {
  const $wrapper = $('#section3 .product_swiper_wrapper');
  $wrapper.empty();

  if (!$originalSlides) return;

  $originalSlides.each(function () {
    const $slide = $(this);
    if (category === 'all' || $slide.hasClass(category)) {
      $wrapper.append($slide.clone(true, true));
    }
  });

  initSwiper();
}

$(document).ready(function () {
  $originalSlides = $('#section3 .product_swiper_wrapper .all').clone(true, true);

  $('.category_tab li').click(function () {
    const category = $(this).data('category');
    $('.category_tab li').removeClass('on');
    $(this).addClass('on');

    updateSlides(category);
  });

  initSwiper();
});


//Section4
let progressFill2 = document.querySelector('#section4 .store-progress');
let mySwiper2;

function initSwiper2() {
  if (mySwiper2) {
    mySwiper2.destroy(true, true);
  }

  mySwiper2 = new Swiper('#section4 .store-swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    allowTouchMove: true,
    on: {
      slideChange: function () {
        const currentIndex = this.activeIndex;
        const totalPages = this.snapGrid.length;
        const percent = ((currentIndex + 1) / totalPages) * 100;
        if (progressFill2) {
          progressFill2.style.width = `${percent}%`;
        }
      }
    }
  });

  const totalPages = mySwiper2.snapGrid.length;
  if (progressFill2 && totalPages > 0) {
    progressFill2.style.width = `${(1 / totalPages) * 100}%`;
  }

  mySwiper2.slideTo(0);
}

$(document).ready(function () {
  initSwiper2();
});