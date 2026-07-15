document.addEventListener("DOMContentLoaded", () => {
    // IDs corregidos para enlazar correctamente con el HTML
    const entradaTarea = document.getElementById("task-input");
    const entradaFecha = document.getElementById("task-date"); 
    const botonAgregar = document.getElementById("add-task-btn");
    const listaTareas = document.getElementById("task-list");

    // TU PARTE (COMODÍN): Elementos del contador
    const contadorCompletadas = document.getElementById("completed-count");
    const contadorTotal = document.getElementById("total-count");

    // TU PARTE (COMODÍN): Función para actualizar los números
    function actualizarContador() {
        const totalTareas = listaTareas.querySelectorAll("li").length;
        const tareasCompletadas = listaTareas.querySelectorAll("li.completada").length;

        contadorTotal.textContent = totalTareas;
        contadorCompletadas.textContent = tareasCompletadas;
    }

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
        
        // TU PARTE: Actualizar contador tras agregar
        actualizarContador();
        
        entradaTarea.focus();
    }

    function crearElementoTarea(textoTarea, fechaTarea) {
        const nuevaTarea = document.createElement("li");

        // TU PARTE: Agregamos el botón de completar a la estructura de tu compañero
        nuevaTarea.innerHTML = `
            <span class="tarea-texto">${textoTarea}</span>
            <span class="tarea-fecha" style="margin-left: 10px; color: #888; font-size: 0.9em;">
                📅 ${fechaTarea}
            </span>
            <span class="tarea-acciones" style="margin-left: 10px;">
                <button class="btn-completar" style="margin-right: 5px;">✅</button>
                <button class="btn-editar" style="margin-right: 5px;">✏️ Editar</button>
                <button class="btn-eliminar">🗑️ Eliminar</button>
            </span>
        `;

        listaTareas.appendChild(nuevaTarea);
    }

    // --- ELIMINAR, ACTUALIZAR Y COMPLETAR TAREAS ---
    listaTareas.addEventListener("click", (evento) => {
        const elemento = evento.target;
        const tareaLi = elemento.closest("li");

        if (!tareaLi) return;

        // MARCAR COMO COMPLETADA (TU PARTE - COMODÍN)
        if (elemento.classList.contains("btn-completar")) {
            tareaLi.classList.toggle("completada");
            // Cambiamos el estilo para tacharla visualmente
            if (tareaLi.classList.contains("completada")) {
                tareaLi.style.textDecoration = "line-through";
                tareaLi.style.opacity = "0.6";
            } else {
                tareaLi.style.textDecoration = "none";
                tareaLi.style.opacity = "1";
            }
            actualizarContador(); // Actualizamos los números
        }

        // ELIMINAR
        if (elemento.classList.contains("btn-eliminar")) {
            const confirmar = confirm("¿Seguro que deseas eliminar esta tarea?");
            if (confirmar) {
                tareaLi.remove();
                actualizarContador(); // TU PARTE: Actualizar contador tras borrar
            }
        }

        // ACTUALIZAR (EDITAR)
        if (elemento.classList.contains("btn-editar")) {
            const spanTexto = tareaLi.querySelector(".tarea-texto");
            const spanFecha = tareaLi.querySelector(".tarea-fecha");

            if (tareaLi.querySelector(".input-editar-texto")) return;

            const textoActual = spanTexto.textContent;
            const fechaActual = spanFecha.textContent.replace("📅", "").trim();

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
                
                // TU PARTE: Se asegura de que el botón ✅ reaparezca al guardar cambios
                spanAcciones.innerHTML = `
                    <button class="btn-completar" style="margin-right: 5px;">✅</button>
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