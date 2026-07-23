/*
==========================================================
Pray Often
Scroll Animations
==========================================================
*/

(() => {

    /*
    ==========================================================
    Reveal Elements
    ==========================================================
    */

    const revealElements = document.querySelectorAll(
        ".fade-up, .fade-left, .fade-right, .scale-in"
    );

    if(revealElements.length){

        const revealObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if(!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                });

            },

            {
                threshold:0.12,
                rootMargin:"0px 0px -80px 0px"
            }

        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }

    /*
    ==========================================================
    Stagger Groups
    ==========================================================
    */

    const staggerGroups =
        document.querySelectorAll("[data-stagger]");

    staggerGroups.forEach(group => {

        const children =
            group.children;

        [...children].forEach((child,index) => {

            child.style.transitionDelay =
                `${index * 120}ms`;

        });

    });

    /*
    ==========================================================
    Fade Hero on Scroll
    ==========================================================
    */

    const hero =
        document.querySelector(".hero");

    if(hero){

        window.addEventListener("scroll", () => {

            const progress =
                Math.min(window.scrollY / 500, 1);

            hero.style.opacity =
                1 - (progress * 0.25);

        });

    }

    /*
    ==========================================================
    Background Parallax
    ==========================================================
    */

    const glows =
        document.querySelectorAll(".background-glow");

    const grid =
        document.querySelector(".background-grid");

    function parallax(){

        const y =
            window.pageYOffset;

        glows.forEach((glow,index)=>{

            const speed =
                index === 0 ? 0.08 : 0.14;

            glow.style.transform =
                `translateY(${y * speed}px)`;

        });

        if(grid){

            grid.style.transform =
                `translateY(${y * 0.03}px)`;

        }

    }

    window.addEventListener("scroll", parallax);

    parallax();

    /*
    ==========================================================
    Section Progress
    ==========================================================
    */

    const progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    document.body.appendChild(progress);

    function updateProgress(){

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const value =
            (window.scrollY / total) * 100;

        progress.style.width =
            `${value}%`;

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    /*
    ==========================================================
    Journey Step Animation
    ==========================================================
    */

    const journeySteps =
        document.querySelectorAll(".journey-step");

    if(journeySteps.length){

        const observer =
            new IntersectionObserver(

                entries=>{

                    entries.forEach(entry=>{

                        if(!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                    });

                },

                {

                    threshold:0.35

                }

            );

        journeySteps.forEach(step=>observer.observe(step));

    }

    /*
    ==========================================================
    Feature Card Tilt
    ==========================================================
    */

    document.querySelectorAll(".feature-card").forEach(card=>{

        card.addEventListener("mousemove",event=>{

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                ((y / rect.height) - 0.5) * -8;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

})();
