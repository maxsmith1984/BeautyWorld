import TabsManager from './TabsManager';

const tabs = () => {
    const tabsElem = document.querySelector('#tabs-section');
    new TabsManager(tabsElem);
}

export default tabs;