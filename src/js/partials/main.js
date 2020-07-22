function outNum(number, time, element) {
  const wub_num = number;
  const wub_time = time; //ms
  const wub_step = 1;
  let wub_el = document.querySelector(element);
  let wub_n = 0;
  let wub_t = Math.round(wub_time / (wub_num / wub_step));
  let interval = setInterval(function () {
    wub_n = wub_n + wub_step;
    if (wub_n == wub_num) {
      clearInterval(interval);
    }
    wub_el.innerHTML = wub_n;
  }, wub_t);
}

function outNumBig(number, time, element) {
  const wub_num = number;
  const wub_time = time; //ms
  const wub_step = 100;
  let wub_el = document.querySelector(element);
  let wub_n = 0;
  let wub_t = Math.round(wub_time / (wub_num / wub_step));
  let interval = setInterval(function () {
    wub_n = wub_n + wub_step;
    if (wub_n == wub_num) {
      clearInterval(interval);
    }
    wub_el.innerHTML = wub_n;
  }, wub_t);
}

function checkContent(element) {
  // координаты дива
  let div_position = $(element).offset();
  // отступ сверху
  let div_top = div_position.top;
  // отступ слева
  let div_left = div_position.left;
  // ширина
  let div_width = $(element).width();
  // высота
  let div_height = $(element).height();

  // проскроллено сверху
  let top_scroll = $(document).scrollTop();
  // проскроллено слева
  let left_scroll = $(document).scrollLeft();
  // ширина видимой страницы
  let screen_width = $(window).width();
  // высота видимой страницы
  let screen_height = $(window).height();

  // координаты углов видимой области
  let see_x1 = left_scroll;
  let see_x2 = screen_width + left_scroll;
  let see_y1 = top_scroll;
  let see_y2 = screen_height + top_scroll;

  // координаты углов искомого элемента
  let div_x1 = div_left;
  let div_x2 = div_left + div_height;
  let div_y1 = div_top;
  let div_y2 = div_top + div_width;

  if (
    div_x1 >= see_x1 &&
    div_x2 <= see_x2 &&
    div_y1 >= see_y1 &&
    div_y2 <= see_y2
  ) {
    return true;
  }
}
let checkNumberTrigger = false;
function checkNumber() {
  if (checkContent(".number_trigger") === true && !checkNumberTrigger) {
    outNum(23, 2000, "#number-1");
    outNum(340, 2400, "#number-2");
    outNum(400, 2600, "#number-3");
    outNumBig(60000, 3000, "#number-4");
    checkNumberTrigger = true;
  }
}

let checkParalaxTrigger = false;

function check() {
  checkNumber();
}

$(document).ready(function () {
  $("input[name='phone']").mask(" +7 (999) 999-99-99");

  $(".js--move").click(function (e) {
    e.preventDefault();
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;

    $("body, html").animate({ scrollTop: destination }, 1100);
  });

  $(document).scroll(function () {
    // при скролле страницы делаем проверку
    check();
  });

  check();

  $(window).resize(function () {
    check();

    if (window.innerWidth < 880) {
      $(".corporate_container").masonry("destroy");
    } else {
      $(".corporate_container").masonry({
        itemSelector: ".corporate_item",
        singleMode: true,
        gutter: 50,
      });
    }
  });

  if (window.innerWidth < 880) {
    $(".corporate_container").masonry("destroy");
  } else {
    $(".corporate_container").masonry({
      itemSelector: ".corporate_item",
      singleMode: true,
      gutter: 50,
    });
  }

  $(".corporate_container").masonry({
    itemSelector: ".corporate_item",
    singleMode: true,
    gutter: 50,
  });

  $(".slider").slick({
    loop: false,
    prevArrow: $(".slider_prev"),
    nextArrow: $(".slider_next"),
  });
});
