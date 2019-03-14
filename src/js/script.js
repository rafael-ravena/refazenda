var menuHeight = undefined;
function setMenuHeight(){
  menuHeight = $("#menu").height();
  if(menuHeight === undefined){
    window.setTimeout(function(){setMenuHeight();}, 200);
  }
}
function setMenuClick() {
  $(".nav-link").on("click", function(){
    if($(window).width() < 600) {
      toggleMenu();
    }
  });
}
function handleScroll(){
  var y = ($(window).scrollTop()/95);
  $("[data-behavior~=\"parallax-bg\"]").css("background-position-y", y + "px");
}
function toggleMenu(){
  $("#menu-toggler").click();
}
function showImageTheater(image, alt) {
  $("[data-behavior~='theater-image']").attr("src", image);
  $("body").addClass("showing");
}
function hideImageTheater() {
  $("body").removeClass("showing");
}
$(document).ready(function () {
  setMenuHeight();
  $(window).on("scroll", function(){
    handleScroll();
  });
  setMenuClick();
  $('[data-behavior~="send-contact"]').on("submit", function (envent) {
    event.preventDefault();
    $('[data-behavior~="submit-form"]').attr("disabled", "disabled");
    $.post($(this).attr("action"), $(this).serialize(), function () {
      toastr["success"]("Obrigado pelo contato! Entraremos em contato o mais breve possível.", "Envio com sucesso");
      $('[data-behavior~="reset-form"]').click();
      $('[data-behavior~="submit-form"]').removeAttr("disabled");
    }).fail(function () {
      toastr["error"]("Algo de errado não está certo! Veja se todos os campos foram devidamente preenchidos e tente nevamente mais tarde, por favor.", "Erro ao enviar");
      $('[data-behavior~="submit-form"]').removeAttr("disabled");
    });
  });
  $("[data-behavior~='gallery-item']").on("click", function(){
    showImageTheater($(this).data("src"), $(this).data("alt"));
  });
  $("[data-behavior~='theater-bg']").on("click", function(){ hideImageTheater(); });
});
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "500",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}