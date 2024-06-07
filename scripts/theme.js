// Fix select2 width
window.addEventListener('resize', function() {
    document.querySelectorAll('.form-group').forEach(function(formGroup) {
        var formgroupWidth = formGroup.offsetWidth;
        var select2Container = formGroup.querySelector('.select2-container');
        if (select2Container) {
            select2Container.style.width = formgroupWidth + 'px';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Valido si el navegador está seteado en dark theme
    var browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

    // Verificar si hay un tema guardado en localStorage al cargar la página
    var savedTheme = localStorage.getItem('theme');

    // Actualiza el tema de la página según preferencias del usuario
    if (savedTheme) {
        actualizarTema(savedTheme);
    } else if (browserTheme) {
        actualizarTema(browserTheme);
    } else {
        actualizarTema('light');
    }

    // Manejar el clic en el botón para cambiar el tema
    document.getElementById('btnThemeSwitch').addEventListener('click', function() {
        var currentTheme = document.documentElement.getAttribute('data-bs-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Guardar el nuevo tema en localStorage
        localStorage.setItem('theme', newTheme);

        actualizarTema(newTheme);
    });
});

// Aplicar el nuevo tema y actualizar el icono
function actualizarTema(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    updateIcon(theme);
    updateSelect2(theme);
}

// Función para actualizar el icono según el tema
function updateIcon(theme) {
    var icon = document.getElementById('icon-theme');
    if (theme === 'dark') {
        icon.classList.remove('bi-sun');
        icon.classList.add('bi-moon-stars');
    } else {
        icon.classList.remove('bi-moon-stars');
        icon.classList.add('bi-sun');
    }
}

// Actualiza el tema para todos los select2
function updateSelect2(theme) {
    var bootstrapTheme = theme === 'dark' ? 'bootstrap-dark' : 'bootstrap';
    document.querySelectorAll("select.select2-hidden-accessible").forEach(function(select) {
        $(select).select2({theme: bootstrapTheme, placeholder: "Seleccione una opción"});
    });
}
