import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function setSplitText() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  
  const paras = document.querySelectorAll(".para");
  const titles = document.querySelectorAll(".title");

  paras.forEach((para) => {
    para.classList.add("visible");
    gsap.fromTo(
      para,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
           trigger: para.parentElement,
           start: "top 80%",
        },
        duration: 1,
        ease: "power3.out"
      }
    );
  });
  
  titles.forEach((title) => {
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
           trigger: title.parentElement,
           start: "top 80%",
        },
        duration: 0.8,
        ease: "power2.inOut"
      }
    );
  });
}
