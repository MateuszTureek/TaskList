export default class TabsTaskComponent {
    private ulTabs: HTMLUListElement;
    private aElements;
    private ulTabsId = 'Tabs';

    constructor() {
        this.ulTabs = document.getElementById(this.ulTabsId) as HTMLUListElement;
        this.aElements = this.ulTabs.getElementsByTagName('a');
    };
};