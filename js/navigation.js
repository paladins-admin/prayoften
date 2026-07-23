/*
==========================================================
Pray Often
Navigation
==========================================================
*/

(() => {

    const header =
        document.querySelector(".site-header");

    const nav =
        document.querySelector(".desktop-nav");

    const mobileButton =
        document.querySelector(".mobile-menu-button");

    const mobileMenu =
        document.querySelector(".mobile-nav");

    const links =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]'
        );

    /*
    ==========================================================
    Sticky Header
    ==========================================================
    */

    function updateHeader(){

        if(!header) return;

        if(window.scrollY > 40){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);

    /*
    ==========================================================
    Smooth Scroll
    ==========================================================
    */

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if(!targetId.startsWith("#")) return;

            const target =
                document.querySelector(targetId);

            if(!target) return;

            event.preventDefault();

            closeMobileMenu();

            const offset =
                header ? header.offsetHeight : 0;

            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({

                top:position,

                behavior:"smooth"

            });

        });

    });

    /*
    ==========================================================
    Active Navigation
    ==========================================================
    */

    const sections =
        document.querySelectorAll("section[id]");

    if(sections.length){

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if(!entry.isIntersecting) return;

                        const id =
                            entry.target.id;

                        document
                            .querySelectorAll(".desktop-nav a, .mobile-nav a")
                            .forEach(link => {

                                link.classList.remove("active");

                                if(link.getAttribute("href") === "#" + id){

                                    link.classList.add("active");

                                }

                            });

                    });

                },

                {

                    threshold:0.45

                }

            );

        sections.forEach(section => observer.observe(section));

    }

    /*
    ==========================================================
    Mobile Menu
    ==========================================================
    */

    if(mobileButton && mobileMenu){

        mobileButton.addEventListener("click", () => {

            const open =
                mobileMenu.classList.toggle("open");

            mobileButton.classList.toggle("open", open);

            document.body.classList.toggle("menu-open", open);

        });

    }

    function closeMobileMenu(){

        if(!mobileMenu) return;

        mobileMenu.classList.remove("open");

        if(mobileButton){

            mobileButton.classList.remove("open");

        }

        document.body.classList.remove("menu-open");

    }

    /*
    ==========================================================
    Close on Escape
    ==========================================================
    */

    document.addEventListener("keydown", event => {

        if(event.key !== "Escape") return;

        closeMobileMenu();

    });

    /*
    ==========================================================
    Close on Outside Click
    ==========================================================
    */

    document.addEventListener("click", event => {

        if(!mobileMenu || !mobileButton) return;

        if(
            mobileMenu.contains(event.target) ||
            mobileButton.contains(event.target)
        ){
            return;
        }

        closeMobileMenu();

    });

    /*
    ==========================================================
    Resize Cleanup
    ==========================================================
    */

    window.addEventListener("resize", () => {

        if(window.innerWidth > 992){

            closeMobileMenu();

        }

    });

})();
