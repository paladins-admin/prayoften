/*
==========================================================
Pray Often
Hero Interactions
==========================================================
*/

(() => {

    const hero = document.querySelector(".hero");
    const phone = document.querySelector(".phone");
    const stage = document.querySelector(".phone-stage");

    if(!hero || !phone || !stage){
        return;
    }

    /*
    ==========================================================
    Mouse Tilt
    ==========================================================
    */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    hero.addEventListener("mousemove", event => {

        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        targetY = (x - 0.5) * 14;
        targetX = (0.5 - y) * 14;

    });

    hero.addEventListener("mouseleave", () => {

        targetX = 0;
        targetY = 0;

    });

    function animateTilt(){

        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        phone.style.transform = `
            rotateX(${currentX}deg)
            rotateY(${currentY}deg)
        `;

        requestAnimationFrame(animateTilt);

    }

    animateTilt();

    /*
    ==========================================================
    Scroll Lift
    ==========================================================
    */

    function updateScroll(){

        const scroll = window.scrollY;

        const translate =
            Math.min(scroll * 0.12, 60);

        stage.style.transform =
            `translateY(${-translate}px)`;

    }

    updateScroll();

    window.addEventListener("scroll", updateScroll);

    /*
    ==========================================================
    Prayer Card Rotation
    ==========================================================
    */

    const cards =
        phone.querySelectorAll(".prayer-card");

    if(cards.length){

        let active = 0;

        cards.forEach((card,index)=>{

            if(index!==0){

                card.style.display="none";

            }

        });

        setInterval(()=>{

            cards[active].animate(
                [
                    {
                        opacity:1,
                        transform:"translateY(0)"
                    },
                    {
                        opacity:0,
                        transform:"translateY(-20px)"
                    }
                ],
                {
                    duration:400,
                    easing:"ease"
                }
            );

            setTimeout(()=>{

                cards[active].style.display="none";

                active++;

                if(active>=cards.length){

                    active=0;

                }

                cards[active].style.display="block";

                cards[active].animate(
                    [
                        {
                            opacity:0,
                            transform:"translateY(20px)"
                        },
                        {
                            opacity:1,
                            transform:"translateY(0)"
                        }
                    ],
                    {
                        duration:500,
                        easing:"ease"
                    }
                );

            },350);

        },4500);

    }

    /*
    ==========================================================
    Shimmer Effect
    ==========================================================
    */

    const screen =
        phone.querySelector(".phone-screen");

    if(screen){

        const shimmer =
            document.createElement("div");

        shimmer.className = "screen-shimmer";

        Object.assign(shimmer.style,{
            position:"absolute",
            inset:"0",
            pointerEvents:"none",
            background:"linear-gradient(120deg, transparent 35%, rgba(255,255,255,.45) 50%, transparent 65%)",
            transform:"translateX(-150%)"
        });

        screen.appendChild(shimmer);

        setInterval(()=>{

            shimmer.animate(
                [
                    {
                        transform:"translateX(-150%)"
                    },
                    {
                        transform:"translateX(150%)"
                    }
                ],
                {
                    duration:1800,
                    easing:"ease"
                }
            );

        },6000);

    }

})();
