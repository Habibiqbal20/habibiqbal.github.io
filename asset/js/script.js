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


document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Draggable, EaselPlugin, Flip, Observer, PixiPlugin, ScrambleTextPlugin, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin, RoughEase, ExpoScaleEase, SlowMo, CustomEase)

  gsap.from("nav", {
    opacity: 0, y: -100, duration: 1
  });

  gsap.from(".profile-card", {
    delay: 0.6,
    opacity: 0,
    duration: 2.5,
    ease: "back.out",
    y: -100,
    onComplete: () => {
      gsap.to('.profile-card', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  });

  gsap.from(".hero-content", {
    delay: 0.6,
    opacity: 0,
    duration: 1,
    ease: "back.out",
    y: -100
  });

  gsap.from(".social-icons", {
    delay: 1,
    opacity: 0,
    duration: 1,
    ease: "back.out",
    y: -100
  });

  document.fonts.ready.then(() => {
    gsap.set(".split", { opacity: 1 });

    let split;
    SplitText.create(".split", {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.lines, {
          scrollTrigger: {
            trigger: '.split',
            top: 'top 80%',
            toggleActions: 'play pause resume none'
          },
          duration: 1,
          yPercent: 100,
          opacity: 0,
          stagger: 0.4,
          ease: "expo.out",
        });
        return split;
      }
    });
  });

  gsap.from('.bina-karya', {
    scrollTrigger: {
      trigger: '.bina-karya',
      toggleActions: 'play pause resume none',
      start: "top 80%",
      end: "top 40%",
      scrub: true
    },
    x: -300,
    opacity: 0,
    duration: 1.5
  });

  gsap.from('.sma', {
    scrollTrigger: {
      trigger: '.sma',
      toggleActions: 'play pause resume none',
      start: "top 80%",
      end: "top 40%",
      scrub: true
    },
    x: 300,
    opacity: 0,
    duration: 1.5
  });

  gsap.from('.smp', {
    scrollTrigger: {
      trigger: '.smp',
      toggleActions: 'play pause resume none',
      start: "top 80%",
      end: "top 40%",
      scrub: true
    },
    x: -300,
    opacity: 0,
    duration: 1.5
  });

  gsap.from('.sd', {
    scrollTrigger: {
      trigger: '.sd',
      toggleActions: 'play pause resume none',
      start: "top 80%",
      end: "top 40%",
      scrub: true
    },
    x: 300,
    opacity: 0,
    duration: 1.5
  });
});

gsap.utils.toArray(".card").forEach((card, i) => {
  gsap.fromTo(card,
    {
      x: i % 2 === 0 ? -300 : 300,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "top 35%",
        scrub: true,
        //markers: true,
      }
    }
  );
});


VanillaTilt.init(document.querySelector(".profile-card"), {
  max: 30,
  speed: 400,
  reverse: true,
  gyroscope: false,
  // glare: true
});
VanillaTilt.init(document.querySelector(".card__inner"), {
  max: 0,
  speed: 400,
  glare: true,
  reverse: true,
  gyroscope: false,
});