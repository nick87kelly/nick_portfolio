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

window.onload = () => {
    if (!matchMedia('(pointer:fine)').matches) {
        var opacityPage = 0;
        var intervalIDPage = 0;
        setInterval(() => {
            var page = document.getElementsByClassName("page")[0];
            opacityPage = Number(window.getComputedStyle(page)
                .getPropertyValue("opacity"));
            if (opacityPage < 1) {
                opacityPage = opacityPage + 0.1;
                page.style.opacity = opacityPage
            } else {
                clearInterval(intervalIDPage);
            }
        }, 200)
    }

    var opacityLoader = 0;
    var intervalIDLoader = 0;

    setInterval(() => {
        var loader = document.getElementsByClassName("loader")[0];
        opacityLoader = Number(window.getComputedStyle(loader)
            .getPropertyValue("opacity"));
        if (opacityLoader > 0) {
            opacityLoader = opacityLoader - 0.1;
            loader.style.opacity = opacityLoader
        } else {
            clearInterval(intervalIDLoader);
        }
    }, 100)
}
