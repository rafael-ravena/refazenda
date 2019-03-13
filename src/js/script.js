$(document).ready(function () {
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