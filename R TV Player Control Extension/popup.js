document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggleSwitch');

    chrome.storage.local.get({ isEnabled: true }, (data) => {
        toggleSwitch.checked = data.isEnabled;
    });

    toggleSwitch.addEventListener('change', () => {
        chrome.storage.local.set({ isEnabled: toggleSwitch.checked });
    });
});
