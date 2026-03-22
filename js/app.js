document.addEventListener('DOMContentLoaded', () => {
    // Input file
    const inputImage = document.querySelector("#image");

    // Node where instance  the editor of image
    const editor = document.querySelector("#editor");

    // The canvas where show  preview image
    const miCanvas = document.querySelector("#preview");
    //Context of canvas
    const contextOfCanvas = miCanvas.getContext("2d");

    //Route of image selected
    let urlImage;

    inputImage.addEventListener('change', openEditor, false);

    let isDownload = document.querySelector("#base");
    document.getElementById('base').style.display = "none"
    isDownload.addEventListener('click', function () {
        isDownload.download = "imagen_recortada." + "jpg";
        isDownload.href = miCanvas.toDataURL("image/jpeg", 1);
        isDownload.click();        
        setTimeout(() => {
            inputImage.setAttribute("value","");
        },2000)

    });


    // Function for open  image selected

    function openEditor(e) {

        // obtain the image
        urlImage = URL.createObjectURL(e.target.files[0]);
        // Erase editor in case that exist a image preview
        editor.innerHTML = '';

        let cropperImg = document.createElement("img");
        cropperImg.setAttribute("id", 'croppr');
        editor.appendChild(cropperImg);
        //Clean the preview in case  that exists some element preview
        contextOfCanvas.clearRect(0, 0, miCanvas.width, miCanvas.height);

        // Send the image for your  resize
        document.querySelector("#croppr").setAttribute('src', urlImage);
        UIkit.modal("#modal-full").show();

        new Croppr('#croppr', {
            aspectRatio: 1,
            startSize: [70, 70],
            onCropEnd: resizeImage,
        })
        document.getElementById('base').style.display = "block";
    }

    // Resize the image 
    function resizeImage(data) {
        const startX = data.x;
        const startY = data.y;

        const newWidth = data.width;
        const newHeight = data.height;
        const zoom = 1;

        miCanvas.width = newWidth;
        miCanvas.height = newHeight;

        let myNewImageTemp = new Image();

        myNewImageTemp.onload = function () {
            contextOfCanvas.drawImage(myNewImageTemp, startX, startY, newWidth * zoom, newHeight * zoom, 0, 0, newWidth, newHeight);


        }

        myNewImageTemp.src = urlImage;
    }

});