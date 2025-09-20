//Typing effect Mulai

const texts = ["Web Developer", "Video/Photo Editor", "Office Administrator", "Freelancer"];

let count = 0;        // index kata di array texts
let index = 0;        // panjang substring yang ditampilkan saat ini
let isDeleting = false;
const el = document.querySelector(".typing");

function type() {
  const current = texts[count];
  if (isDeleting) {
    index = Math.max(0, index - 1);
  } else {
    index = Math.min(current.length, index + 1);
  }
  // tampilkan substring berdasarkan index yang sudah di-update
  el.textContent = current.substring(0, index);
  // kecepatan dasar (ms)
  let delay = isDeleting ? 80 : 120;
  // jika sudah selesai mengetik seluruh kata -> jeda lalu mulai hapus
  if (!isDeleting && index === current.length) {
    delay = 3500;      // jeda ketika penuh (ubah sesuai keinginan)
    isDeleting = true;
  }
  // jika sudah selesai menghapus seluruh kata -> ganti ke kata selanjutnya
  else if (isDeleting && index === 0) {
    isDeleting = false;
    count = (count + 1) % texts.length;
    delay = 1000;       // jeda sebelum mulai mengetik kata baru
  }
  setTimeout(type, delay);
}
// pastikan elemen ada sebelum memulai
if (el) type();
else console.warn("Typing element not found: .typing");

//Typing effect Selesai



// Sidebar menu mulai

const menuBtn = document.querySelector('.menu-btn');
const slide = document.querySelector('.list');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('cross');
});
menuBtn.addEventListener('click', () => {
  slide.classList.toggle('open');
});
window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width : 800px)').matches) {
    slide.classList.remove('open');
    menuBtn.classList.remove('cross');
  }
})
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !slide.contains(e.target)) {
    slide.classList.remove('open');
    menuBtn.classList.remove('cross');
  }
});

// Sidebar menu selesai




//Hover BG Mulai

const baseColor = "#1e1e2f";

document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;

  document.body.style.background = `
    radial-gradient(circle at ${x}px ${y}px, 
    rgba(0, 224, 255, 0.08), 
    ${baseColor} 100px)
  `;
});

document.addEventListener("mouseleave", () => {
  // tetap pakai gradient, tapi pusatnya dipindah jauh di luar layar
  document.body.style.background = `
    radial-gradient(circle at -9999px -9999px, 
    rgba(0, 224, 255, 0), 
    ${baseColor} 100px)
  `;
});

//Hover BG Selesai




// Github Contributor Mulai

GitHubCalendar(".calendar", "Habibiqbal20", {
responsive: true,
});

// Github Contributor Selesai





// const track = document.getElementById("scrollTrack");
// const content = track.querySelector(".skills-content");

// while (track.scrollWidth < window.innerWidth * 3) {
//   track.appendChild(content.cloneNode(true));
// }

// let isDown = false;
// let startX;
// let scrollLeft;

// // ---- Drag manual ----
// track.addEventListener("mousedown", (e) => {
//   isDown = true;
//   startX = e.pageX - track.offsetLeft;
//   scrollLeft = track.scrollLeft;
//   track.style.cursor = "grabbing";
// });
// track.addEventListener("mouseleave", () => { isDown = false; });
// track.addEventListener("mouseup", () => {
//   isDown = false;
//   track.style.cursor = "grab";
// });
// track.addEventListener("mousemove", (e) => {
//   if (!isDown) return;
//   e.preventDefault();
//   const x = e.pageX - track.offsetLeft;
//   const walk = (x - startX) * 1.2; 
//   track.scrollLeft = scrollLeft - walk;
// });

// // ---- Auto scroll ----
// let speed = 1; // kecepatan scroll otomatis
// function autoScroll() {
//   track.scrollLeft += speed;
//   // kalau sudah sampai clone → reset ke awal
//   if (track.scrollLeft >= content.scrollWidth) {
//     track.scrollLeft = 0;
//   }
//   requestAnimationFrame(autoScroll);
// }
// autoScroll();



const track = document.getElementById("scrollTrack");
const firstContent = track.querySelector(".skills-content");

// panjang satu set konten
const singleWidth = firstContent.scrollWidth;

// clone satu kali
track.appendChild(firstContent.cloneNode(true));

let isDown = false;
let startX;
let scrollLeft;

// ---- Drag manual (mouse) ----
track.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  track.style.cursor = "grabbing";
});
track.addEventListener("mouseleave", () => { isDown = false; });
track.addEventListener("mouseup", () => {
  isDown = false;
  track.style.cursor = "grab";
});
track.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1.2; 
  track.scrollLeft = scrollLeft - walk;
});

// ---- Drag manual (touch) ----
track.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
track.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - track.offsetLeft;
  const walk = (x - startX) * 1.2;
  track.scrollLeft = scrollLeft - walk;
});
track.addEventListener("touchend", () => {
  isDown = false;
});

// ---- Auto scroll (seamless) ----
let speed = 1;

function autoScroll() {
  track.scrollLeft += speed;

  // reset ke awal dengan pengurangan, bukan set 0
  if (track.scrollLeft >= singleWidth) {
    track.scrollLeft -= singleWidth;
  }

  requestAnimationFrame(autoScroll);
}
autoScroll();
