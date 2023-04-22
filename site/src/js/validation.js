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
            },
            tel: {
                required: "Введите Ваш номер телефона",
            },
            date: {
                required: "Введите дату"
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
            }
        },
        messages: {
            name: {
                required: "Введите Ваше имя",
            },
            tel: {
                required: "Введите Ваш номер телефона",
            }
        },

    });
});