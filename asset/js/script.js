//Typing Effect Mulai

const texts = ["Web Developer", "Video/Photo Editor", "Office Administrator", "Digital Marketing", "Others"];

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

//Typing Effect Selesai





// Sidebar Menu mulai

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

// Sidebar Menu selesai




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





// Skills Auto Scroll dan Manual Drag Mulai

const track = document.getElementById("scrollTrack");
const firstContent = track.querySelector(".skills-content");
const singleWidth = firstContent.getBoundingClientRect().width;

track.appendChild(firstContent.cloneNode(true));

let isDown = false;
let startX;
let scrollLeft;

track.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  track.style.cursor = "grabbing";
});
track.addEventListener("mouseleave", () => {
  isDown = false;
});
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


let speed = 1;

function autoScroll() {
  track.scrollLeft = (track.scrollLeft + speed) % singleWidth;
  requestAnimationFrame(autoScroll);
}
track.addEventListener("mousedown", () => {
  speed = 0;
});
track.addEventListener("mouseup", () => {
  speed = 1;
});
track.addEventListener("touchstart", () => {
  speed = 0;
});
track.addEventListener("touchend", () => {
  speed = 1;
});
autoScroll();


//Skills Auto Scroll dan Manual Drag Selesai


// CV Download Mulai

document.getElementById("downloadBtn").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "asset/New CV.pdf";   // path file CV
  link.download = "Curriculum Vitae Habib Iqbal.pdf"; // nama file saat didownload
  link.click();
});

// CV Download Selesai