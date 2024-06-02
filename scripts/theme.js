// Fix select2 width
$(window).on('resize', function() {
    $('.form-group').each(function() {
        var formGroup = $(this),
            formgroupWidth = formGroup.outerWidth();
        formGroup.find('.select2-container').css('width', formgroupWidth);
    });
});

$(document).ready(function() {
    // Valido si el navegador está seteado en dark theme
    var browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

    // Verificar si hay un tema guardado en localStorage al cargar la página
    var savedTheme = localStorage.getItem('theme');

    // Actualiza el tema de la pagina segú preferencias del usuario
    if (savedTheme){
        actualizarTema(savedTheme);
    }
    else if(browserTheme){
        actualizarTema(browserTheme);
    }
    else{
        actualizarTema('light');
    }

    // Manejar el clic en el botón para cambiar el tema
    $('#btnThemeSwitch').on('click', function() {
        var currentTheme = $('html').attr('data-bs-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Guardar el nuevo tema en localStorage
        localStorage.setItem('theme', newTheme);

        actualizarTema(newTheme);
    });
});

// Aplicar el nuevo tema y actualizar el icono
function actualizarTema(theme){
    $('html').attr('data-bs-theme', theme);
    updateIcon(theme);
    updateSelect2(theme);
}

// Función para actualizar el icono según el tema
function updateIcon(theme) {
    var icon = $('#icon-theme');
    icon.removeClass(theme === 'dark' ? 'bi-sun' : 'bi-moon-stars');
    icon.addClass(theme === 'dark' ? 'bi-moon-stars' : 'bi-sun');
}

// Actualiza el tema para todos los select2
function updateSelect2(theme) {
    var bootstrapTheme = theme === 'dark' ? 'bootstrap-dark' : 'bootstrap';
    $("select.select2-hidden-accessible").each(function() {
        $(this).select2({theme: bootstrapTheme, placeholder: "Seleccione una opción"});
    }); 
  }