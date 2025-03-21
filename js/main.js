

//header - 모든 메뉴 항목에 클릭 이벤트 추가
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault(); // 기본 링크 동작 방지

    const targetId = this.className.replace("section_", ""); // 클래스명에서 숫자 부분 제거
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});



//about me- 모든 카운터 요소 선택
const counters = document.querySelectorAll(".number-counter");

const countUp = (element) => {
  const targetNumber = +element.dataset.number;
  let currentNumber = 0;
  const speed = 100; // 속도 조정

  const increment = targetNumber / speed;

  const updateCount = () => {
    currentNumber += increment;

    if (currentNumber < targetNumber) {
      element.innerText = Math.ceil(currentNumber);
      requestAnimationFrame(updateCount);
    } else {
      element.innerText = targetNumber;
    }
  };

  updateCount();
};

// 화면에 등장할 때 카운트업 실행
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});

// graphic
const restaurant_list = new Swiper(".graphic", {
  slidesPerView: 3.5,
  spaceBetween: 20,
  loop: true,
  speed: 2000,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    1024: {
      slidesPerView: 2.5, // 1024px 이하에서는 3개만 보이게
    },

    768: {
      slidesPerView: 2,
    },

    425: {
      slidesPerView: 1,
    },
  },
});

//web
document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll(".project");

  function handleScroll() {
    if (window.innerWidth <= 1024) return;

    const triggerBottom = window.innerHeight * 0.6; // 뷰포트 기준 활성화 지점

    projects.forEach((project) => {
      const projectTop = project.getBoundingClientRect().top;

      if (projectTop < triggerBottom) {
        project.classList.add("active");
      } else {
        project.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 처음 로딩 시 체크
});