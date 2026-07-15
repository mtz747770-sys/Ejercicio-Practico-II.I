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

        // TU PARTE: Validación para que no agreguen tareas sin fecha
        if (fechaTarea === "") {
            alert("Por favor, selecciona una fecha de vencimiento.");
            entradaFecha.focus();
            return;
        }

        const nuevaTarea = document.createElement("li");
        
        nuevaTarea.innerHTML = `
            <span class="tarea-texto">${textoTarea}</span>
            <span class="tarea-fecha" style="margin-left: 10px; color: #888; font-size: 0.9em;">
                📅 ${fechaTarea}
            </span>
        `;

        listaTareas.appendChild(nuevaTarea);

        // Limpiar campos después de agregar
        entradaTarea.value = "";
        entradaFecha.value = ""; // Limpiar la fecha
        entradaTarea.focus();
    }

    botonAgregar.addEventListener("click", agregarTarea);

    entradaTarea.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            agregarTarea();
        }
    });
});