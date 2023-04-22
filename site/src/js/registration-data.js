import { Fancybox } from "@fancyapps/ui";
const registrationData = () => {
    const forms = document.querySelectorAll('[data-form]');
    const hiddenForm = forms[1];

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (this.dataset.form === 'form1') {
                const { name, tel } = this.elements;
                if (isFormValid(name, tel)) {
                    const formData = new FormData(this);
                    sendData(formData);
                    form.reset();
                }
            } else if (this.dataset.form === 'form2') {
                const { name, tel, employee, service, date } = this.elements;
                if (isFormValid(name, tel)) {
                    const formData = new FormData(this);
                    sendData(formData);
                    form.reset();
                }
            }
        });
    });

    function isFormValid(...fields) {
        const emptyFields = fields.filter(field => !field.value.trim());
        if (emptyFields.length) {
            return false;
        }
        return true;
    }
    function sendData(formData) {
        fetch('http://httpbin.org/post', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка отправки данных');
                } else if (response.ok) {

                    // alert("Ваша заявка отправлена! В ближайшее время с вами свяжется менеджер.")
                    setTimeout(() => {
                        Fancybox.close();
                    }, 3000);
                    return response.json();
                }
            })
            .then((formData) => {
                console.log(formData)

            })
            .catch(error => {
                console.error('Ошибка отправки данных:', error);
            });
    }

}


export default registrationData;