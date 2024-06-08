document.addEventListener('DOMContentLoaded', function() {

    // Almacena los productos filtrados
    window.filteredProducts = [];

    // Event listener para la búsqueda por botón
    document.getElementById('btnBuscar').addEventListener('click', () => {
        filterProducts(document.getElementById('inputBuscar').value);
    });

    // Event listener para la búsqueda al presionar Enter en el input
    document.getElementById('inputBuscar').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            filterProducts(document.getElementById('inputBuscar').value);
        }
    });

    // Event listener para ordenar
    document.querySelectorAll('#sortOptions a').forEach(function(element) {
        element.addEventListener('click', (event) => {
            sortProducts(event.target.dataset.sort);
        });
    });

    // Se obtienen el sourceTemplate y se obtienen los productos por API backend
    getTemplate('./sourceTemplates/productos.hbs')
        .then(async template => {
            const data = await getProductos();
            renderTemplateInto(template, data, 'products-container');

            // Almacena los datos y el template en memoria
            window.productsData = data;
            window.productsTemplate = template;
        })
        .catch(error => console.error(error));
});

// Obtener Handlebars template
function getTemplate(templatePath) {
    return fetch(templatePath)
        .then(response => {
            if (!response.ok) 
                throw new Error(`Error fetching Handlebars template: ${templatePath}`);
            return response.text();
        })
        .then(templateSource => Handlebars.compile(templateSource));
}

// Obtener productos del backend
function getProductos() {
    return fetch(`/productos`)
        .then(response => {
            if (!response.ok) 
                throw new Error('Error al obtener productos');
            return response.json();
        });
}

// Renderizar los datos en un elemento del DOM
function renderTemplateInto(template, data, idObject) {
    document.getElementById(idObject).innerHTML = template(data);
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
