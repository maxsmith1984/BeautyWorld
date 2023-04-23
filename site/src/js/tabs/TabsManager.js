import TabItem from './TabItem'

class TabsManager {
    tabs = [];
    activeTab = null;
    constructor(tabsElem) {
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

export default TabsManager