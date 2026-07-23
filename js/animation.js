/*
==========================================================
Pray Often
Animation Engine
==========================================================
*/

(() => {

    /*
    ==========================================================
    RequestAnimationFrame Loop
    ==========================================================
    */

    const animated = [];

    function register(element, callback){

        animated.push({
            element,
            callback
        });

    }

    function loop(){

        animated.forEach(item => {

            if(!document.body.contains(item.element)){
                return;
            }

            item.callback();

        });

        requestAnimationFrame(loop);

    }

    requestAnimationFrame(loop);

    /*
    ==========================================================
    Floating Elements
    ==========================================================
    */

    document.querySelectorAll(".float").forEach((element,index)=>{

        const amplitude = 8 + (index * 2);
        const speed = 0.001 + (index * 0.00015);

        register(element,()=>{

            const y =
                Math.sin(performance.now() * speed) * amplitude;

            element.style.transform =
                `translateY(${y}px)`;

        });

    });

    /*
    ==========================================================
    Rotating Elements
    ==========================================================
    */

    document.querySelectorAll(".spin-slow").forEach((element,index)=>{

        const speed =
            0.002 + (index * 0.0005);

        register(element,()=>{

            const angle =
                performance.now() * speed;

            element.style.transform =
                `rotate(${angle}deg)`;

        });

    });

    /*
    ==========================================================
    Parallax Objects
    ==========================================================
    */

    const parallax =
        document.querySelectorAll("[data-parallax]");

    if(parallax.length){

        window.addEventListener("scroll",()=>{

            const scroll = window.scrollY;

            parallax.forEach(element=>{

                const speed =
                    Number(
                        element.dataset.parallax || 0.15
                    );

                element.style.transform =
                    `translate3d(0, ${scroll * speed}px, 0)`;

            });

        });

    }

    /*
    ==========================================================
    Magnetic Buttons
    ==========================================================
    */

    document.querySelectorAll(".button").forEach(button=>{

        button.addEventListener("mousemove",event=>{

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;

            button.style.transform = `
                translate(${x * 0.08}px, ${y * 0.08}px)
            `;

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="";

        });

    });

    /*
    ==========================================================
    Text Reveal
    ==========================================================
    */

    document.querySelectorAll("[data-reveal]").forEach(element=>{

        const text =
            element.textContent.trim();

        element.textContent = "";

        [...text].forEach((character,index)=>{

            const span =
                document.createElement("span");

            span.textContent =
                character === " " ? "\u00A0" : character;

            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(18px)";
            span.style.transition = `
                opacity .45s ease ${index * 18}ms,
                transform .45s ease ${index * 18}ms
            `;

            element.appendChild(span);

        });

        const observer =
            new IntersectionObserver(entries=>{

                entries.forEach(entry=>{

                    if(!entry.isIntersecting) return;

                    element.querySelectorAll("span").forEach(span=>{

                        span.style.opacity="1";
                        span.style.transform="translateY(0)";

                    });

                    observer.disconnect();

                });

            },{
                threshold:0.25
            });

        observer.observe(element);

    });

    /*
    ==========================================================
    Gentle Glow Pulse
    ==========================================================
    */

    document.querySelectorAll(".background-glow").forEach((glow,index)=>{

        const speed =
            0.0008 + (index * 0.0002);

        register(glow,()=>{

            const scale =
                1 + Math.sin(performance.now() * speed) * 0.05;

            glow.style.scale = scale;

        });

    });

})();
