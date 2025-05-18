// Array de objetos que representan las páginas donde se buscará el término
const paginas = [
    { nombre: "Inicio", url: "index.html" },
    { nombre: "Información personal", url: "personal.html" },
    { nombre: "Proyectos", url: "projects.html" },
    { nombre: "Aficiones", url: "hobbies.html" }
];

// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona el formulario de búsqueda
    const formulario = document.querySelector("form");

    // Selecciona el campo de entrada de búsqueda
    const entrada = document.querySelector("input[type='search']");

    // Selecciona la lista donde se mostrarán los resultados
    const resultados = document.querySelector("main > section > ul");

    // Selecciona la sección que contiene los resultados (para mostrarla u ocultarla)
    const seccionResultados = document.querySelector("main > section");

    // Añade un evento al formulario para manejar el envío
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault(); // Previene el comportamiento por defecto del formulario

        resultados.innerHTML = ""; // Limpia los resultados anteriores
        seccionResultados.hidden = true; // Oculta la sección de resultados
        // Obtiene el término de búsqueda, eliminando espacios y convirtiendo a minúsculas
        const termino = entrada.value.trim().toLowerCase();
        if (!termino) return; // Si el campo está vacío, no hace nada

        let coincidencias = 0; // Contador de coincidencias encontradas

        // Recorre cada página definida en el array
        for (const pagina of paginas) {
            try {
                // Carga el contenido de la página
                const respuesta = await fetch(pagina.url);
                const texto = await respuesta.text();

                // Verifica si el contenido contiene el término buscado
                if (texto.toLowerCase().includes(termino)) {
                    // Crea un nuevo elemento de lista con un enlace a la página
                    const item = document.createElement("li");
                    const enlace = document.createElement("a");
                    enlace.href = pagina.url;
                    enlace.textContent = `Coincidencia en: ${pagina.nombre}`;
                    item.appendChild(enlace);
                    resultados.appendChild(item); // Añade el resultado a la lista
                    coincidencias++; // Incrementa el contador
                }
            } catch (error) {
                // Muestra un error en la consola si no se puede cargar la página
                console.error(`Error al cargar ${pagina.url}:`, error);
            }
        }

        // Si no se encontraron coincidencias, muestra un mensaje
        if (coincidencias === 0) {
            const item = document.createElement("li");
            item.textContent = "No se encontraron coincidencias.";
            resultados.appendChild(item);
        }

        // Muestra la sección de resultados
        seccionResultados.hidden = false;
    });
});