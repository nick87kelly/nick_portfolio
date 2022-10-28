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

// window.onload = () => {
//     setTimeout(() => {
//         setInterval(() => {
//             var page = document.getElementsByClassName("page")[0];
//             opacity = Number(window.getComputedStyle(page)
//                 .getPropertyValue("opacity"));
//             if (opacity < 1) {
//                 opacity = opacity + 0.1;
//                 page.style.opacity = opacity
//             } else {
//                 clearInterval(intervalID);
//             }
//         }, 200)
//     }, 5500);
// }
