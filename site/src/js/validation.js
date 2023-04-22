import 'jquery-validation/dist/jquery.validate.js'

$(function () {
    $('#hidden-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            name: {
                required: "Введите Ваше имя",
                minlength: "Введите не менее 2-х символов"
            },
            phone: {
                required: "Введите Ваш номер телефона",
            }
        },

    });
});

$(function () {
    $('#form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },

        },
        messages: {
            name: {
                required: "Введите Ваше имя",
                minlength: "Введите не менее 2-х символов"
            },
            phone: {
                required: "Введите Ваш номер телефона",
            }
        },

    });
});