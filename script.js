document.addEventListener("DOMContentLoaded", () => {
    // IDs corregidos para enlazar correctamente con el HTML
    const entradaTarea = document.getElementById("task-input");
    const entradaFecha = document.getElementById("task-date"); 
    const botonAgregar = document.getElementById("add-task-btn");
    const listaTareas = document.getElementById("task-list");

    function agregarTarea() {
        const textoTarea = entradaTarea.value.trim();
        const fechaTarea = entradaFecha.value; 

        if (textoTarea === "") {
            alert("Escribe una tarea antes de agregarla.");
            entradaTarea.focus();
            return;
        }

        if (fechaTarea === "") {
            alert("Por favor, selecciona una fecha de vencimiento.");
            entradaFecha.focus();
            return;
        }

        crearElementoTarea(textoTarea, fechaTarea);

        // Limpiar campos después de agregar
        entradaTarea.value = "";
        entradaFecha.value = "";
        entradaTarea.focus();
    }

    function crearElementoTarea(textoTarea, fechaTarea) {
        const nuevaTarea = document.createElement("li");

        nuevaTarea.innerHTML = `
            <span class="tarea-texto">${textoTarea}</span>
            <span class="tarea-fecha" style="margin-left: 10px; color: #888; font-size: 0.9em;">
                📅 ${fechaTarea}
            </span>
            <span class="tarea-acciones" style="margin-left: 10px;">
                <button class="btn-editar" style="margin-right: 5px;">✏️ Editar</button>
                <button class="btn-eliminar">🗑️ Eliminar</button>
            </span>
        `;

        listaTareas.appendChild(nuevaTarea);
    }

    // --- ELIMINAR Y ACTUALIZAR TAREAS ---
    // Usamos delegación de eventos: escuchamos los clicks en la lista completa,
    // así funciona para tareas ya existentes y para las que se agreguen después.
    listaTareas.addEventListener("click", (evento) => {
        const elemento = evento.target;
        const tareaLi = elemento.closest("li");

        if (!tareaLi) return;

        // ELIMINAR
        if (elemento.classList.contains("btn-eliminar")) {
            const confirmar = confirm("¿Seguro que deseas eliminar esta tarea?");
            if (confirmar) {
                tareaLi.remove();
            }
        }

        // ACTUALIZAR (EDITAR)
        if (elemento.classList.contains("btn-editar")) {
            const spanTexto = tareaLi.querySelector(".tarea-texto");
            const spanFecha = tareaLi.querySelector(".tarea-fecha");

            // Evitamos abrir edición doble si ya está en modo edición
            if (tareaLi.querySelector(".input-editar-texto")) return;

            const textoActual = spanTexto.textContent;
            // Extraemos solo la fecha (sin el emoji y espacios)
            const fechaActual = spanFecha.textContent.replace("📅", "").trim();

            // Creamos inputs para editar en el lugar
            const inputTexto = document.createElement("input");
            inputTexto.type = "text";
            inputTexto.value = textoActual;
            inputTexto.className = "input-editar-texto";
            inputTexto.style.marginRight = "5px";

            const inputFecha = document.createElement("input");
            inputFecha.type = "date";
            inputFecha.value = fechaActual;
            inputFecha.className = "input-editar-fecha";
            inputFecha.style.marginRight = "5px";

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "💾 Guardar";
            botonGuardar.className = "btn-guardar";

            // Reemplazamos temporalmente el contenido del <li>
            tareaLi.innerHTML = "";
            tareaLi.appendChild(inputTexto);
            tareaLi.appendChild(inputFecha);
            tareaLi.appendChild(botonGuardar);

            inputTexto.focus();

            // Guardar cambios
            botonGuardar.addEventListener("click", () => {
                const nuevoTexto = inputTexto.value.trim();
                const nuevaFecha = inputFecha.value;

                if (nuevoTexto === "") {
                    alert("La tarea no puede estar vacía.");
                    inputTexto.focus();
                    return;
                }

                if (nuevaFecha === "") {
                    alert("Selecciona una fecha de vencimiento.");
                    inputFecha.focus();
                    return;
                }

                tareaLi.innerHTML = "";
                // Reconstruimos el <li> con el nuevo contenido
                const spanTextoNuevo = document.createElement("span");
                spanTextoNuevo.className = "tarea-texto";
                spanTextoNuevo.textContent = nuevoTexto;

                const spanFechaNuevo = document.createElement("span");
                spanFechaNuevo.className = "tarea-fecha";
                spanFechaNuevo.style.marginLeft = "10px";
                spanFechaNuevo.style.color = "#888";
                spanFechaNuevo.style.fontSize = "0.9em";
                spanFechaNuevo.innerHTML = `📅 ${nuevaFecha}`;

                const spanAcciones = document.createElement("span");
                spanAcciones.className = "tarea-acciones";
                spanAcciones.style.marginLeft = "10px";
                spanAcciones.innerHTML = `
                    <button class="btn-editar" style="margin-right: 5px;">✏️ Editar</button>
                    <button class="btn-eliminar">🗑️ Eliminar</button>
                `;

                tareaLi.appendChild(spanTextoNuevo);
                tareaLi.appendChild(spanFechaNuevo);
                tareaLi.appendChild(spanAcciones);
            });
        }
    });

    botonAgregar.addEventListener("click", agregarTarea);

    entradaTarea.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            agregarTarea();
        }
    });
});