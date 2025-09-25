document.addEventListener("DOMContentLoaded", function () {
  // ✅ Swiper slider initialization
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
    },
  });

  // ✅ Know More Toggle (if used)
  const btn = document.getElementById("knowMoreBtn");
  const moreContent = document.getElementById("moreContent");
  if (btn && moreContent) {
    btn.addEventListener("click", function () {
      const visible = moreContent.style.display === "block";
      moreContent.style.display = visible ? "none" : "block";
      btn.textContent = visible ? "Know More" : "Show Less";
    });
  }

  // ✅ Mobile menu toggle
  const toggle = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("show");
        }
      });
    });
  }

  // ✅ Contact Form submission (from contact.html)
  const contactForm = document.getElementById("contactForm");
  const popupSuccess = document.getElementById("popup-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());

      fetch(contactForm.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formObject),
      })
        .then((response) => {
          if (response.ok) {
            popupSuccess.style.display = "flex";
            contactForm.reset();
            setTimeout(() => {
              popupSuccess.style.display = "none";
            }, 3000);
          } else {
            alert("There was an error. Please try again.");
          }
        })
        .catch((error) => {
          alert("Something went wrong.");
          console.error(error);
        });
    });
  }

  // ✅ Curriculum wheel logic (course.html)
  const contentData = {
    montessori: {
      title: "Montessori – Fostering Independence and Practical Life Skills",
      text: `Our classrooms are thoughtfully prepared environments with child-sized materials that encourage independence in tasks like dressing, preparing snacks, and caring for their surroundings. These practical life activities build fine motor skills, concentration, and a sense of responsibility.`,
    },
    waldorf: {
      title: "Waldorf – Cultivating Imagination and Creativity",
      text: `We weave storytelling, artistic expression (painting, drawing, sculpting with natural materials), music, and movement into the daily rhythm. This nurtures imagination, emotional intelligence, and a deep connection to the natural world.`,
    },
    reggio: {
      title: "Reggio Emilia – Encouraging Inquiry and Exploration",
      text: `Our teachers carefully observe children's interests and use them as springboards for in-depth projects and investigations. Learning is driven by the child's own interests and questions.`,
    },
    play: {
      title: "Play-Based Learning – Learning Through Play",
      text: `Our curriculum is rich with opportunities for both structured and unstructured play, allowing children to experiment, problem-solve, socialize, and develop essential skills in a joyful and engaging way.`,
    },
    mi: {
      title: "Multiple Intelligences – Catering to Diverse Learning Styles",
      text: `We offer a variety of activities that cater to different learning preferences—movement, music, puzzles, group work, and more—ensuring every child feels understood and empowered.`,
    },
  };

  // Global function to show curriculum content
  window.activateLayout = function (key) {
    const layout = document.getElementById("layout");
    const box = document.getElementById("content-box");

    layout.classList.add("active");
    box.classList.remove("hidden");

    document.getElementById("section-title").innerText = contentData[key].title;
    document.getElementById("section-text").innerText = contentData[key].text;
  };
});
