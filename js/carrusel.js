const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.transform = 'translateX(0)';
    } else {
      slide.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
    }
  });
}

function showNextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}

function showPrevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
}

showSlide(currentIndex);
prevBtn.addEventListener('click', showPrevSlide);
nextBtn.addEventListener('click', showNextSlide);

const formulario = document.getElementById("formulario");
const formularioInput = document.getElementById("formulario-input");
const formularioSubmit = document.getElementById("formulario-submit");


formularioSubmit.addEventListener("click", (event) => {
    event.preventDefault();  
    Swal.fire(`Enviado correctamente a ${formularioInput.value}`);
    formulario.reset();
    formularioInput.reset()
    formularioInput.focus();

});
