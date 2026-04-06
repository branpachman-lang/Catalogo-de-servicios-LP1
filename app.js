/* 1. DATOS DE LA APLICACIÓN */
const servicios = [
    { nombre: "Diseño Web", categoria: "Diseño", descripcion: "Sitios modernos", precio: 500, estado: "Disponible" },
    { nombre: "SEO", categoria: "Marketing", descripcion: "Posicionamiento web", precio: 300, estado: "Destacado" },
    { nombre: "Hosting", categoria: "Infraestructura", descripcion: "Alojamiento web", precio: 150, estado: "Disponible" },
    { nombre: "Branding", categoria: "Diseño", descripcion: "Identidad visual", precio: 400, estado: "Disponible" },
    { nombre: "Publicidad", categoria: "Marketing", descripcion: "Campañas digitales", precio: 350, estado: "Destacado" },
    { nombre: "Soporte", categoria: "Infraestructura", descripcion: "Mantenimiento web", precio: 200, estado: "Disponible" }
];

/* 2. SELECCIÓN DE ELEMENTOS DEL DOM */
// Agrupamos todas las referencias al HTML en un solo objeto.
const DOM = {
    contenedor: document.getElementById("contenedor-servicios"),
    inputBusqueda: document.getElementById("buscador-servicios"),
    selectEstado: document.getElementById("filtro-estado"),
    selectPrecio: document.getElementById("filtro-precio"),
    toggleTema: document.getElementById("toggle-tema")
};

/* 3. FUNCIONES PRINCIPALES */

/**
 * Renderiza la lista de servicios en formato de tarjeta en la pantalla */
function renderizarServicios(lista) {
    // OPTIMIZACIÓN DE RENDIMIENTO: Usamos un Fragmento de Documento. 
    // En lugar de meter tarjeta por tarjeta en la página (es lento), las agrupamos en la memoria y las metemos de golpe al final.
    const fragmento = document.createDocumentFragment();

    lista.forEach(servicio => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <h3>${servicio.nombre}</h3>
            <p>${servicio.descripcion}</p>
            <p><b>Precio:</b> $${servicio.precio}</p>
            <p><b>Estado:</b> ${servicio.estado}</p>
            <p><b>Categoría:</b> ${servicio.categoria}</p>
        `;

        // Evento de selección (optimizado usando arrow function)
        tarjeta.addEventListener("click", () => tarjeta.classList.toggle("seleccionada"));
        fragmento.appendChild(tarjeta);
    });

    // Limpiamos y metemos todas las tarjetas juntas
    DOM.contenedor.innerHTML = "";
    DOM.contenedor.appendChild(fragmento);
}

/**
 * Lee los 3 inputs del usuario (busqueda, estado, orden), aplica la lógica y redibuja la interfaz.
 */
function aplicarFiltros() {
    const texto = DOM.inputBusqueda.value.toLowerCase();
    const estadoSel = DOM.selectEstado.value;
    const ordenSel = DOM.selectPrecio.value;

    // 1. Filtrado
    const filtrados = servicios.filter(servicio => {
        // Aprovechamos de buscar tanto en el nombre como en la categoría y descripcíon
        const coincideTexto = servicio.nombre.toLowerCase().includes(texto) ||
            servicio.categoria.toLowerCase().includes(texto) ||
            servicio.descripcion.toLowerCase().includes(texto);

        const coincideEstado = (estadoSel === "Todos" || servicio.estado === estadoSel);

        return coincideTexto && coincideEstado;
    });

    // 2. Ordenamiento matemático
    if (ordenSel === "mayor") {
        filtrados.sort((a, b) => b.precio - a.precio);
    } else if (ordenSel === "menor") {
        filtrados.sort((a, b) => a.precio - b.precio);
    }

    // 3. Mostrar resultados
    renderizarServicios(filtrados);
}

/* 4. EVENT LISTENERS GLOBALES */
// Escucha cuando escribes letras
DOM.inputBusqueda.addEventListener("input", aplicarFiltros);

// Escucha cuando haces clic en una nueva opción de los selectores desplegables
DOM.selectEstado.addEventListener("change", aplicarFiltros);
DOM.selectPrecio.addEventListener("change", aplicarFiltros);

// Escucha al interruptor del Modo Oscuro
DOM.toggleTema.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

/* 5. INICIALIZACIÓN */
// Ejecución inicial al abrir la página web
renderizarServicios(servicios);