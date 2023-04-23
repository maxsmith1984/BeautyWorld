import { Fancybox } from "@fancyapps/ui";
const registrationData = () => {
    const forms = document.querySelectorAll('[data-form]');

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (this.dataset.form === 'form1') {
                const { name, phone } = this.elements;
                if (isFormValid(name, phone)) {
                    const formData = new FormData(this);
                    sendData(formData);
                    form.reset();
                };

            } else if (this.dataset.form === 'form2') {
                const { name, phone, employee, service, date } = this.elements;
                if (isFormValid(name, phone)) {
                    const formData = new FormData(this);
                    sendData(formData);
                    form.reset();
                };
            };
        });
    });

    function isFormValid(...fields) {
        const emptyFields = fields.filter(field => !field.value.trim());
        if (emptyFields.length) {
            return false;
        }
        return true;
    }

    const successMessege = () => {
        const messeges = document.querySelectorAll('#success-messege');

        messeges.forEach((messege) => {
            const hidden = messege.hasAttribute('hidden');

            if (hidden) {
                messege.removeAttribute('hidden');
            } else {
                messege.setAttribute('hidden', '');
            }
        });
    };

    const loading = () => {
        const loaders = document.querySelectorAll('#loader');

        loaders.forEach((loader) => {
            const hideLoader = loader.hasAttribute('hidden');
            if (hideLoader) {
                loader.removeAttribute('hidden');
            } else {
                loader.setAttribute('hidden', '');
            }
        });

    };

    async function sendData(formData) {
        const orderData = Object.fromEntries(formData.entries());
        loading();
        return await fetch('http://localhost:3005/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка отправки данных');
                } else if (response.ok) {
                    successMessege();
                    setTimeout(() => {
                        successMessege();
                        Fancybox.close();
                    }, 3000);
                    return formData;
                }
            })
            .then((response) => {
                for (let [key, value] of response) {
                    console.log(`${key} - ${value}`)
                }
            })
            .catch(error => {
                console.error('Ошибка отправки данных:', error);
            })

            .finally(() => {
                loading();
            });
    };


}

export default registrationData;