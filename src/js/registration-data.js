const registrationData = () => {
    const form = document.querySelector('#form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = this.name.value;
        const tel = this.tel.value;
        sendData(name, tel);
        form.reset();
    })

    function sendData(name, tel) {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('tel', tel)

        for (const value of formData.entries()) {
            console.log(value);
        }
    }
}

export default registrationData;