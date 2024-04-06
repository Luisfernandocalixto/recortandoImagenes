document.addEventListener('DOMContentLoaded', () => {
    // Input file
    const inputImage = document.querySelector("#image");

    // Nodo donde estara el editor
    const editor = document.querySelector("#editor");

    // El canvas donde se mostrara la previa
    const miCanvas = document.querySelector("#preview");
    //Contexto del canvas
    const contexto = miCanvas.getContext("2d");

    //Ruta de la imagen seleccionada
    let urlImage = undefined

    inputImage.addEventListener('change', abrirEditor, false);

    let descargar = document.querySelector("#base");
    document.getElementById('base').style.display = "none"
    descargar.addEventListener('click', function () {
        descargar.download = "imagen_recortada." + "jpg";
        descargar.href = miCanvas.toDataURL("image/jpeg", 1);
        descargar.click();

    })


    // Function para abrir la imagen seleccionada

    function abrirEditor(e) {

        // obtener la imagen
        urlImage = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0]);
        // Borrar editor en caso que existiera una imagen previa
        editor.innerHTML = '';

        let cropprImg = document.createElement("img");
        cropprImg.setAttribute("id", 'croppr');
        editor.appendChild(cropprImg);
        //Limpiar la previa en caso  que existiera algún elemento previo
        contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

        // Enviar la imagen para su recorte
        document.querySelector("#croppr").setAttribute('src', urlImage);

        new Croppr('#croppr', {
            aspectRatio: 1,
            startSize: [70, 70],
            onCropEnd: recortarImagen,
        })
        document.getElementById('base').style.display = "block"
    }

    // Recortar la imagen 
    function recortarImagen(data) {
        const inicioX = data.x;
        const inicioY = data.y;

        const nuevoAncho = data.width;
        const nuevaAltura = data.height;
        const zoom = 1;
        let imagenEn64 = '';

        miCanvas.width = nuevoAncho;
        miCanvas.height = nuevaAltura;

        let miNuevaImagenTemp = new Image();

        miNuevaImagenTemp.onload = function () {
            contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);

            imagenEn64 = miCanvas.toDataURL("image/jpeg");

        }

        miNuevaImagenTemp.src = urlImage;
    }

});