import Inputmask from "inputmask";

Inputmask({
    mask: "+7 (999) 999-99-99",
    autoUnmask: true,
    clearIncomplete: true,
}).mask(document.querySelectorAll('#phone'));



