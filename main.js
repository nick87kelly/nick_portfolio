import './style.css';
import Experience from "./Experience/Experience.js";





$(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
        $('.mouse-scroll').fadeOut();
    }
    else {
        $('.mouse-scroll').fadeIn();
    }
});

const experience = new Experience(document.querySelector(".experience-canvas"));
