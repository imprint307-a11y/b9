
// تشغيل كل شيء بعد تحميل الـ DOM
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-link");
  const navLinksContainer = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const skillFills = document.querySelectorAll(".skill-fill");
  const themeToggle = document.getElementById("themeToggle");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  /* ====== Smooth Scroll + Active Nav Link ====== */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      const offsetTop = targetSection.offsetTop - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // إغلاق القائمة في الموبايل
      navLinksContainer.classList.remove("open");

      // تحديث حالة الروابط
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* ====== تغيير النمط (Light/Dark) ====== */
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("portfolio-theme", mode);
  });

  /* ====== إظهار/إخفاء الهيدر و زر العودة للأعلى ====== */
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 60) {
      header.classList.add("scrolled");
      scrollTopBtn.classList.add("visible");
    } else {
      header.classList.remove("scrolled");
      scrollTopBtn.classList.remove("visible");
    }

    // تحديث الرابط الفعال اعتماداً على القسم الظاهر
    setActiveLinkOnScroll();
  });

  /* ====== زر القائمة في الموبايل ====== */
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
    });
  }

  /* ====== زر العودة للأعلى ====== */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ====== تفعيل الـ Skill Bars عند الظهور ====== */
  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute("data-level");
            bar.style.width = level + "%";
            observer.unobserve(bar);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    skillFills.forEach((bar) => skillsObserver.observe(bar));
  } else {
    // في حال عدم دعم IntersectionObserver
    skillFills.forEach((bar) => {
      const level = bar.getAttribute("data-level");
      bar.style.width = level + "%";
    });
  }

  /* ====== تحديث الـ Active Link أثناء التمرير ====== */
  function setActiveLinkOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.scrollY || window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  /* ====== فورم التواصل (وهمية) ====== */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // تحقق بسيط
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const subject = contactForm.subject.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !subject || !message) {
        formStatus.textContent = "يرجى تعبئة جميع الحقول.";
        formStatus.style.color = "#f97373";
        return;
      }

      // عرض رسالة نجاح وهمية
      formStatus.textContent = "تم إرسال رسالتك (تجريبيًا). هذا الحساب غير حقيقي.";
      formStatus.style.color = "#38bdf8";

      // إعادة تعيين الحقول بعد لحظات
      setTimeout(() => {
        contactForm.reset();
        formStatus.textContent = "";
      }, 3000);
    });
  }

  /* ====== تفاعل بسيط مع أزرار تفاصيل المشاريع ====== */
  const projectButtons = document.querySelectorAll(".project-details-btn");
  projectButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("هذا المشروع افتراضي ومخصص لعرض مستوى الاحترافية في البروفايل فقط.");
    });
  });
});
