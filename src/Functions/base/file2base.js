window.addEventListener("dragenter", function (event) { event.preventDefault(); }, false);
window.addEventListener("dragover", function (event) { event.preventDefault(); }, false);
window.addEventListener("drop", function (event) {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.body.insertAdjacentHTML("afterBegin", '<p>' + e.target.result + '</p>');
        document.body.classList.remove('empty');
    };
    reader.readAsDataURL(event.dataTransfer.files[0]);
    event.preventDefault();
}, false);