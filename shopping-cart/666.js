// 购物车
//默认值
function moRen() {
  //小计的值和商品数的值
  var s = 0;
  $(".xj_txt").each(function () {
    var dj = $(this)
      .parents(".gwcList")
      .children(".gwc_dj")
      .children("p")
      .children(".dj_txt")
      .text();
    var iptVal = parseInt(
      $(this)
        .parents(".gwcList")
        .children(".gwc_sl")
        .children(".gwc_ipt")
        .val(),
    );
    s = s + iptVal;
    $(".njian").text(s);
    $(this).text(dj * iptVal);
  });

  //n件商品总计
  var d = 0;
  $(".xj_txt").each(function () {
    var xjTxt = parseInt($(this).text());
    d = d + xjTxt;
  });
  $(".njZj").text(d);
  //应付总额
  var yf = parseInt($(".yunfei").text());
  $(".zonge strong span").text(d + yf);
}
moRen();

//加
$(".jia").each(function () {
  $(this).click(function () {
    var b = parseInt($(this).prev(".gwc_ipt").val());
    $(this)
      .prev(".gwc_ipt")
      .val(b + 1);
    b++;
    moRen();
  });
});
//减
$(".jian").each(function () {
  $(this).click(function () {
    var b = parseInt($(this).next(".gwc_ipt").val());
    if (b >= 1) {
      $(this)
        .next(".gwc_ipt")
        .val(b - 1);
      b--;
    }
    moRen();
  });
});
//input输入blur
$(".gwc_ipt").each(function () {
  $(this).keyup(function () {
    var iptVal = $(this).val();
    if ($(this).val() == "") {
      $(this).val(1);
    }
    moRen();
  });
});

//删除所选
$(".delete").click(function () {
  $(this).parents(".gwcList").remove();
  moRen();
});
