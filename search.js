const paginas = [
    { nombre: "Inicio", url: "index.html" },
    { nombre: "Información personal", url: "personal.html" },
    { nombre: "Proyectos", url: "projects.html" },
    { nombre: "Aficiones", url: "hobbies.html" }
];


document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const entrada = document.querySelector("input[type='search']");
    const resultados = document.querySelector("main > section > ul");
    const seccionResultados = document.querySelector("main > section");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        resultados.innerHTML = "";
        seccionResultados.hidden = true;

        const termino = entrada.value.trim().toLowerCase();
        if (!termino) return;

        let coincidencias = 0;

        for (const pagina of paginas) {
            try {
                const respuesta = await fetch(pagina.url);
                const texto = await respuesta.text();

                if (texto.toLowerCase().includes(termino)) {
                    const item = document.createElement("li");
                    const enlace = document.createElement("a");
                    enlace.href = pagina.url;
                    enlace.textContent = `Coincidencia en: ${pagina.nombre}`;
                    item.appendChild(enlace);
                    resultados.appendChild(item);
                    coincidencias++;
                }
            } catch (error) {
                console.error(`Error al cargar ${pagina.url}:`, error);
            }
        }

        if (coincidencias === 0) {
            const item = document.createElement("li");
            item.textContent = "No se encontraron coincidencias.";
            resultados.appendChild(item);
        }

        seccionResultados.hidden = false;
    });
});