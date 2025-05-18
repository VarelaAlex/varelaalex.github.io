const paginas = [
    { nombre: "Inicio", url: "index.html" },
    { nombre: "Información personal", url: "personal.html" },
    { nombre: "Proyectos", url: "projects.html" },
    { nombre: "Aficiones", url: "hobbies.html" }
];

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const entrada = document.querySelector("input[type='search']");
    const main = document.querySelector("main");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        // Elimina cualquier sección de resultados anterior
        const anterior = document.querySelector("main > section[aria-label='Resultados de búsqueda']");
        if (anterior) {
            main.removeChild(anterior);
        }

        const termino = entrada.value.trim().toLowerCase();
        if (!termino) return;

        let coincidencias = 0;

        // Crea una nueva sección semántica para los resultados
        const nuevaSeccion = document.createElement("section");
        nuevaSeccion.setAttribute("aria-label", "Resultados de búsqueda");

        const titulo = document.createElement("h2");
        titulo.textContent = "Resultados";
        nuevaSeccion.appendChild(titulo);

        const lista = document.createElement("ul");

        for (const pagina of paginas) {
            try {
                const respuesta = await fetch(pagina.url);
                const texto = await respuesta.text();

                if (texto.toLowerCase().includes(termino)) {
                    const item = document.createElement("li");
                    const enlace = document.createElement("a");
                    enlace.href = pagina.url;
                    enlace.textContent = `${pagina.nombre}`;
                    item.appendChild(enlace);
                    lista.appendChild(item);
                    coincidencias++;
                }
            } catch (error) {
                console.error(`Error al cargar ${pagina.url}:`, error);
            }
        }

        if (coincidencias === 0) {
            const item = document.createElement("li");
            item.textContent = "No se encontraron coincidencias.";
            lista.appendChild(item);
        }

        nuevaSeccion.appendChild(lista);

        const segundaSeccion = main.querySelectorAll("section")[0];
        main.insertBefore(nuevaSeccion, segundaSeccion);
    });
});