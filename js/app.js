/*
==========================================================
Pray Often
Global App Controller
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initialiseApp();

});

function initialiseApp(){

    initialiseHeader();

    initialiseHero();

    initialiseScrollAnimations();

    initialiseParallax();

    initialiseCounters();

    initialiseButtons();

}

/*
==========================================================
HEADER
==========================================================
*/

function initialiseHeader(){

    const header = document.querySelector(".site-header");

    if(!header) return;

    const updateHeader = () => {

        if(window.scrollY > 40){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader);

}

/*
==========================================================
HERO
==========================================================
*/

function initialiseHero(){

    const phone = document.querySelector(".phone");

    if(!phone) return;

    window.addEventListener("mousemove",(event)=>{

        const x =
            (event.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;

        phone.style.transform = `
            rotateY(${x}deg)
            rotateX(${-y}deg)
            translateZ(0)
        `;

    });

    window.addEventListener("mouseleave",()=>{

        phone.style.transform="";

    });

}

/*
==========================================================
SCROLL REVEALS
==========================================================
*/

function initialiseScrollAnimations(){

    const animated = document.querySelectorAll(

        ".fade-up, .fade-left, .fade-right, .scale-in"

    );

    if(animated.length===0) return;

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold:.15,
            rootMargin:"0px 0px -80px 0px"
        }

    );

    animated.forEach(element=>observer.observe(element));

}

/*
==========================================================
PARALLAX
==========================================================
*/

function initialiseParallax(){

    const items = document.querySelectorAll(".parallax");

    if(items.length===0) return;

    window.addEventListener("scroll",()=>{

        const offset = window.pageYOffset;

        items.forEach(item=>{

            const speed =
                Number(item.dataset.speed || .15);

            item.style.transform = `translateY(${offset * speed}px)`;

        });

    });

}

/*
==========================================================
COUNTERS
==========================================================
*/

function initialiseCounters(){

    const counters = document.querySelectorAll("[data-counter]");

    if(counters.length===0) return;

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {threshold:.4}

    );

    counters.forEach(counter=>observer.observe(counter));

}

function animateCounter(element){

    const target = Number(element.dataset.counter);

    const duration = 1800;

    const start = performance.now();

    function frame(time){

        const progress =
            Math.min((time-start)/duration,1);

        const value =
            Math.floor(progress * target);

        element.textContent =
            value.toLocaleString();

        if(progress<1){

            requestAnimationFrame(frame);

        }

    }

    requestAnimationFrame(frame);

}

/*
==========================================================
BUTTON EFFECTS
==========================================================
*/

function initialiseButtons(){

    document.querySelectorAll(".button").forEach(button=>{

        button.addEventListener("mousedown",()=>{

            button.classList.add("pressed");

        });

        button.addEventListener("mouseup",()=>{

            button.classList.remove("pressed");

        });

        button.addEventListener("mouseleave",()=>{

            button.classList.remove("pressed");

        });

    });

}

/*
==========================================================
UTILITIES
==========================================================
*/

window.scrollToSection = function(id){

    const section = document.getElementById(id);

    if(!section) return;

    section.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

};

window.scrollToTop = function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};
