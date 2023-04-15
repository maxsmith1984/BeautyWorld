const registrationData = () => {
    const form = document.querySelector('#form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let name = this.name.value;
        let tel = this.tel.value;
        sendData(name, tel);
        form.reset();
    })

    async function sendData(name, tel) {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('tel', tel)

        for (var value of formData.entries()) {
            console.log(value);
        }
    }
}


export default registrationData;