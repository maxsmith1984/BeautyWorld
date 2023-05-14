import popup from './funcybox'
import mobileNav from './mobile-nav'
import tabs from './tabs'
import slider from './swiper-slider'
import registrationData from './registration-data'
import mask from './mask'
import validation from './validation'

window.onload = () => {
    mask();
    mobileNav();
    tabs();
    slider();
    registrationData();
    validation();
    popup();
}