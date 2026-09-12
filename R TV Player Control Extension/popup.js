document.addEventListener('DOMContentLoaded', () => {
    // Views & Navigation
    const mainView = document.getElementById('mainView');
    const settingsView = document.getElementById('settingsView');
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    const backBtn = document.getElementById('backBtn');

    // Controls
    const toggleBtn = document.getElementById('toggleBtn');
    const rtvBtn = document.getElementById('rtvBtn');
    const linkModeSelect = document.getElementById('linkMode');
    const customUrlInput = document.getElementById('customUrl');
    const saveBtn = document.getElementById('saveBtn');

    const ORIGINAL_LINK = 'https://t.me/any_drama_bot/rtv';

    // Load initial settings
    chrome.storage.local.get({
        isEnabled: true,
        linkMode: 'original',
        customUrl: ''
    }, (data) => {
        updateToggleState(data.isEnabled);
        linkModeSelect.value = data.linkMode;
        customUrlInput.value = data.customUrl;
        toggleCustomUrlVisibility(data.linkMode);
    });

    // Toggle Extension State (ON/OFF)
    function updateToggleState(enabled) {
        if (enabled) {
            toggleBtn.textContent = 'ON';
            toggleBtn.className = 'toggle-btn on';
        } else {
            toggleBtn.textContent = 'OFF';
            toggleBtn.className = 'toggle-btn off';
        }
    }

    toggleBtn.addEventListener('click', () => {
        const isCurrentlyOn = toggleBtn.textContent === 'ON';
        const newState = !isCurrentlyOn;
        updateToggleState(newState);
        chrome.storage.local.set({ isEnabled: newState });
    });

    // Navigation Switches
    openSettingsBtn.addEventListener('click', () => {
        mainView.classList.add('hidden');
        settingsView.classList.remove('hidden');
    });

    backBtn.addEventListener('click', () => {
        settingsView.classList.add('hidden');
        mainView.classList.remove('hidden');
    });

    // Toggle custom URL field based on dropdown
    function toggleCustomUrlVisibility(mode) {
        if (mode === 'original') {
            customUrlInput.style.opacity = '0.5';
            customUrlInput.disabled = true;
        } else {
            customUrlInput.style.opacity = '1';
            customUrlInput.disabled = false;
        }
    }

    linkModeSelect.addEventListener('change', (e) => {
        toggleCustomUrlVisibility(e.target.value);
    });

    // Save Settings
    saveBtn.addEventListener('click', () => {
        const mode = linkModeSelect.value;
        const url = customUrlInput.value.trim();

        chrome.storage.local.set({
            linkMode: mode,
            customUrl: url
        }, () => {
            settingsView.classList.add('hidden');
            mainView.classList.remove('hidden');
        });
    });

    // Main R TV Button Click
    rtvBtn.addEventListener('click', () => {
        chrome.storage.local.get({
            linkMode: 'original',
            customUrl: ''
        }, (data) => {
            let targetUrl = ORIGINAL_LINK;

            if (data.linkMode === 'custom' || data.linkMode === 'custom_appstart') {
                if (data.customUrl) {
                    targetUrl = data.customUrl;
                }
            }

            if (data.linkMode === 'custom_appstart') {
                chrome.storage.local.set({ pendingAppStart: true });
            }

            window.open(targetUrl, '_blank');
        });
    });
});
