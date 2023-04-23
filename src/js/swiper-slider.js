import Swiper from 'swiper/bundle';

const slider = () => {
    new Swiper('.swiper', {
        speed: 400,
        direction: 'horizontal',
        loop: true,

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            580: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            850: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 29,
            },
        },

        navigation: {
            nextEl: '.carousel-nav__btn_next',
            prevEl: '.carousel-nav__btn_prev',
        },
    });
}

export default slider;