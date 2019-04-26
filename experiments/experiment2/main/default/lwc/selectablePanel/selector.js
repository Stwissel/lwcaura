// Contains the panels and selected elements
const registeredPanels = {};

const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};

const registerPanel = (groupInfo, callback) => {
    const panelName = createUUID();
    const gName = groupInfo.name ? groupInfo.name : groupInfo;
    const curGroup = registeredPanels[gName] || {};
    curGroup.max = groupInfo.max || curGroup.max || 0;
    curGroup.min = groupInfo.min || curGroup.min || 0;
    curGroup.current = 0;
    curGroup.selected = [];
    const panels = curGroup.panels || {};
    panels[panelName] = {};
    panels[panelName].callback = callback;
    curGroup.panels = panels;
    registeredPanels[gName] = curGroup;
    return panelName;
};

const unregisterPanel = (groupName, panelName) => {
    const curGroup = registeredPanels[groupName];
    if (curGroup && curGroup.panels) {
        curGroup.panels[panelName] = undefined;
    }
    // Todo: if curGroup.panels is empty remove group
};

const panelDeselected = (groupName, panelName) => {
    const curGroup = registeredPanels[groupName];
    if (curGroup && curGroup.panels) {
        let allSelected = curGroup.selected;
        let panelIndex = allSelected.findIndex(x => x === panelName);
        if (panelIndex > -1) {
            if (curGroup.min >= curGroup.current) {
                // Can't go below minimum
                Promise.resolve().then(
                    curGroup.panels[panelName].callback(
                        true,
                        'Minimum selection required:' + curGroup.min
                    )
                );
            } else {
                curGroup.current--;
                allSelected.splice(panelIndex, 1);
            }
        }
    }
};

const panelSelected = (groupName, panelName) => {
    const curGroup = registeredPanels[groupName];
    if (curGroup && curGroup.panels) {
        let allSelected = curGroup.selected;
        if (curGroup.max > 0 && curGroup.current === curGroup.max) {
            // Selected one too much, removing last selected
            let tobeRemoved = allSelected.pop();
            Promise.resolve().then(
                curGroup.panels[tobeRemoved].callback(
                    false,
                    'Maximum allowed selection:' + curGroup.max
                )
            );
            curGroup.current--;
        }
        allSelected.push(panelName);
        curGroup.current++;
    }
};

export { registerPanel, unregisterPanel, panelSelected, panelDeselected };
