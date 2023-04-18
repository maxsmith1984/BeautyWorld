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

class TabsManager {
    constructor(tabsElem) {
        this.tabs = [];
        this.activeTab = null;

        this.init(tabsElem);
        this.activateTab(this.tabs[0]);
    }

    init(tabsElem) {
        const links = tabsElem.querySelectorAll('.tabs-link');
        const contents = tabsElem.querySelectorAll('.tabs');

        for (let i = 0; i < links.length; i++) {
            const tab = new TabItem(links[i], contents[i]);
            this.tabs.push(tab);

            tab.onClick(() => this.activateTab(tab));
        }
    }

    activateTab(tab) {
        if (this.activeTab) {
            this.activeTab.deactivate();
        }
        this.activeTab = tab;
        this.activeTab.activate();
    }
}
const tabs = () => {
    const tabsElem = document.querySelector('#tabs-section');
    new TabsManager(tabsElem);
}

export default tabs;