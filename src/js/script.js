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
function validateForm(){
  $('[data-behavior~="send-contact"]').validate({
    rules: {
      nome: "required",
      email: {
        required: true,
        email: true
      },
      data: {
        required: true,
        date: true
      },
      pax: {
        required: true,
        number: true
      }
    },
    messages: {
      nome: "Por favor, nos informe seu nome.",
      email: {
        required: "Por favor, nos informe seu e-mail.",
        email: "Por favor, informe um endereço de e-mail correto"
      },
      data: {
        required: "Por favor, nos informe a data da sua festa",
        date: "Por favor, escolha uma data válida."
      },
      pax: {
        required: "Por favor, nos informe o número aproximado de pessoas<br/>(e não tem problema se mudar depois)",
        number: "Por favor, informe somente o número (sem ponto, vírgula ou qualquer sinal)"
      }
    },
    submitHandler: function(form, event) {
      event.preventDefault();
      $('[data-behavior~="submit-form"]').attr("disabled", "disabled");
      $.post($(this).attr("action"), $(this).serialize(), function () {
        toastr["success"]("Obrigado pelo contato! Entraremos em contato o mais breve possível.", "Contato enviado com sucesso!");
        $('[data-behavior~="reset-form"]').click();
        $('[data-behavior~="submit-form"]').removeAttr("disabled");
      }).fail(function () {
        toastr["error"]("Não conseguimos processar suas informações.<br>Por favor verifique os campos preenchidos e tente novamente.", "Erro ao enviar contato =(");
        $('[data-behavior~="submit-form"]').removeAttr("disabled");
      });
      }
  });
}
$(document).ready(function () {
  setMenuHeight();
  $(window).on("scroll", function(){
    handleScroll();
  });
  setMenuClick();
  validateForm();
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
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": 300,
  "hideDuration": 500,
  "timeOut": 325000,
  "extendedTimeOut": 321000,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}