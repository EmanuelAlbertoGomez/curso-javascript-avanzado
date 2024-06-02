// En lugar de $document.ready() que está deprecado y se recomienda su desuso para jquery 3 o superiór
$(function() {
    // Almacena los productos filtrados
    window.filteredProducts = [];
    
    // Event listener para la búsqueda por botón
    $('#btnBuscar').on('click', ()=> filterProducts($('#inputBuscar').val()));
    
    // Event listener para la búsqueda al presionar Enter en el input
    $('#inputBuscar').on('keypress', (event) => {
        if (event.which === 13) { // Tecla Enter
            filterProducts($('#inputBuscar').val());
        }
    });

    // Event listener para ordenar
    $('#sortOptions a').on('click', (event)=> sortProducts(event.target.dataset.sort));

    // Se obtienen el sourceTemplate t los datos del json
    fetchTemplate('./sourceTemplates/productos.hbs')
    .then(async template => {
        const data = await getProductos();
        renderTemplateInto(template, data, 'products-container');

        // Almacena los productos que se ordenaron
        window.productsData = data;
        window.productsTemplate = template;
    })
    .catch(error => console.error(error));
});

// Obtener Handlebars template
function fetchTemplate(templatePath) {
    return new Promise((resolve, reject) => {
        $.get(templatePath, templateSource => resolve(Handlebars.compile(templateSource)))
        .fail(() => reject(`Error fetching Handlebars template: ${templatePath}`));
    });
}

// Obtener productos 
function getProductos() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:4000/backendmock/productos',
            success: (result) => resolve(result),
            error: () => reject(`Error al obtener productos`)
        });
    });
}

// Renderizar los datos en un elemento del DOM
function renderTemplateInto(template, data, idObject) {
    $(`#${idObject}`).html(template(data));
}

// Ordenar productos
function sortProducts(criterio) {
    let productsToSort = window.filteredProducts.length ? [...window.filteredProducts] : [...window.productsData];

    switch (criterio) {
        case 'priceAsc':
            productsToSort.sort((a, b) => a.precio - b.precio);
            break;
        case 'priceDesc':
            productsToSort.sort((a, b) => b.precio - a.precio);
            break;
        case 'name':
            productsToSort.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
    }
    
    renderTemplateInto(window.productsTemplate, productsToSort, 'products-container');
}

// Filtrar productos
function filterProducts(query) {
    window.filteredProducts = window.productsData.filter(product => 
        product.nombre.toLowerCase().includes(query.toLowerCase())
    );
    renderTemplateInto(window.productsTemplate, window.filteredProducts, 'products-container');
}