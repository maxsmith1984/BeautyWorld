class TabItem {
    constructor(link, content) {
        this.link = link;
        this.content = content;
    }

    onClick(callback) {
        this.link.addEventListener('click', (event) => {
            event.preventDefault()
            callback()
        });
    }

    activate() {
        this._toggle(true);
    }

    deactivate() {
        this._toggle(false);
    }

    _toggle(activate) {
        this.link.classList.toggle('navigation__link_active', activate);
        this.content.classList.toggle('tabs_active', activate);
    }
}

export default TabItem