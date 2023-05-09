import Inputmask from 'inputmask';

const inputMask = () => {
    Inputmask({
        mask: '+7 (999) 999-99-99',
        clearIncomplete: true,
        autoUnmask: true,
    }).mask(document.querySelectorAll('#phone1'));

    Inputmask({
        mask: '+7 (999) 999-99-99',
        clearIncomplete: true,
        autoUnmask: true,
    }).mask(document.querySelectorAll('#phone2'));
}

export default inputMask