const mobileNav = () => {
    const navBtn = document.querySelector('#burger');
    const mobileMenu = document.querySelector('#mobile-menu');

    const toggleMenu = (() => {
        navBtn.classList.toggle('burger__transform');
        mobileMenu.classList.toggle('mobile-nav_show');
    });
    const closeMenu = (() => {
        navBtn.classList.remove('burger__transform');
        mobileMenu.classList.remove('mobile-nav_show');
    });

    navBtn.addEventListener('click', toggleMenu);
    document.addEventListener('scroll', closeMenu);


    const smoothScrollLinks = document.querySelectorAll('.navigation__link');

    for (let link of smoothScrollLinks) {
        link.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            const elementToScroll = document.querySelector(target.getAttribute('href'));
            elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        });
    }
}

export default mobileNav;
