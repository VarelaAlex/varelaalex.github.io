// Array de objetos que representan las páginas disponibles con su nombre y URL
const paginas = [
    { nombre: "Inicio", url: "index.html" },
    { nombre: "Información personal", url: "personal.html" },
    { nombre: "Proyectos", url: "projects.html" },
    { nombre: "Aficiones", url: "hobbies.html" }
];

// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el formulario de búsqueda
    const formulario = document.querySelector("form");
    // Selecciona el campo de entrada de búsqueda
    const entrada = document.querySelector("input[type='search']");
    // Selecciona el elemento <main> donde se mostrarán los resultados
    const main = document.querySelector("main");

    // Agrega un evento al enviar el formulario
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        // Elimina cualquier sección de resultados anterior
        const anterior = document.querySelector("main > section[aria-label='Resultados de búsqueda']");
        if (anterior) {
            main.removeChild(anterior);
        }

        // Obtiene el término de búsqueda y lo convierte a minúsculas
        const termino = entrada.value.trim().toLowerCase();
        if (!termino) return; // Si está vacío, no hace nada

        let coincidencias = 0; // Contador de coincidencias encontradas

        // Crea una nueva sección para mostrar los resultados
        const nuevaSeccion = document.createElement("section");
        nuevaSeccion.setAttribute("aria-label", "Resultados de búsqueda");

        // Crea y agrega un título a la sección
        const titulo = document.createElement("h2");
        titulo.textContent = "Resultados";
        nuevaSeccion.appendChild(titulo);

        // Crea una lista para los resultados
        const lista = document.createElement("ul");

        // Itera sobre cada página definida en el array
        for (const pagina of paginas) {
            try {
                // Realiza una solicitud para obtener el contenido de la página
                const respuesta = await fetch(pagina.url);
                const texto = await respuesta.text();

                // Verifica si el contenido incluye el término de búsqueda
                if (texto.toLowerCase().includes(termino)) {
                    // Crea un elemento de lista con un enlace a la página
                    const item = document.createElement("li");
                    const enlace = document.createElement("a");
                    enlace.href = pagina.url;
                    enlace.textContent = `${pagina.nombre}`;
                    item.appendChild(enlace);
                    lista.appendChild(item);
                    coincidencias++;
                }
            } catch (error) {
                // Muestra un error si no se puede cargar la página
                console.error(`Error al cargar ${pagina.url}:`, error);
            }
        }

        // Si no se encontraron coincidencias, muestra un mensaje
        if (coincidencias === 0) {
            const item = document.createElement("li");
            item.textContent = "No se encontraron coincidencias.";
            lista.appendChild(item);
        }

        // Agrega la lista de resultados a la nueva sección
        nuevaSeccion.appendChild(lista);

        // Inserta la nueva sección antes de la primera sección existente en <main>
        const segundaSeccion = main.querySelectorAll("section")[0];
        main.insertBefore(nuevaSeccion, segundaSeccion);
    });
});