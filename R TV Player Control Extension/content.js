function triggerClick(el) {
    if (!el) return false;
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    return true;
}

window.addEventListener('keydown', (e) => {
    // Ignore keypresses when typing in input fields
    const target = e.target;
    const tag = (target.tagName || '').toLowerCase();
    const isEditing = tag === 'input' || tag === 'textarea' || target.isContentEditable;

    if (isEditing) return;

    // Prevent default page scrolling on Spacebar
    if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
    }

    chrome.storage.local.get({ isEnabled: true }, (data) => {
        if (!data.isEnabled) return;

        const key = e.key.toLowerCase();
        const validKeys = ['f', ' ', 'k', 'arrowright', 'arrowleft', 'l', 'j', 'n', 'b'];
        if (!validKeys.includes(key)) return;

        const video = document.querySelector('video');
        const playBtn = document.querySelector('.ctl-play');
        const fsBtn = document.querySelector('.ctl-fs');
        const seekInput = document.querySelector('input.seek');

        // 1. FULLSCREEN (F)
        if (key === 'f') {
            e.preventDefault();
            if (fsBtn) {
                triggerClick(fsBtn);
            } else if (video) {
                if (!document.fullscreenElement) {
                    (video.parentElement || video).requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }
        }

        // 2. PLAY / PAUSE (Space / K)
        if (key === ' ' || key === 'k') {
            e.preventDefault();
            e.stopPropagation();

            if (playBtn) {
                triggerClick(playBtn);
            } else if (video) {
                if (video.paused) video.play(); else video.pause();
            }
        }

        // 3. TIMELINE SEEKING (Arrow Keys, L, J)
        if (['arrowright', 'arrowleft', 'l', 'j'].includes(key)) {
            e.preventDefault();
            let seconds = 0;
            if (e.key === 'ArrowRight') seconds = 1;
            if (e.key === 'ArrowLeft') seconds = -1;
            if (key === 'l') seconds = 5;
            if (key === 'j') seconds = -5;

            if (video && !isNaN(video.duration) && video.duration > 0) {
                video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
            } else if (seekInput) {
                const max = parseFloat(seekInput.max) || 100;
                const cur = parseFloat(seekInput.value) || 0;
                let targetVal = Math.max(0, Math.min(max, cur + seconds));
                seekInput.value = targetVal;
                seekInput.dispatchEvent(new Event('input', { bubbles: true }));
                seekInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }

        // 4. EPISODES (B = Previous, N = Next)
        if (key === 'n' || key === 'b') {
            e.preventDefault();
            const epBtn = document.querySelector('.rail-btn.ep');
            if (epBtn) {
                triggerClick(epBtn);

                setTimeout(() => {
                    const activeCell = document.querySelector('.ep-sheet-cell.active');
                    if (activeCell) {
                        const targetCell = key === 'b' ? activeCell.previousElementSibling : activeCell.nextElementSibling;

                        if (targetCell && targetCell.classList.contains('ep-sheet-cell')) {
                            triggerClick(targetCell);
                        } else {
                            if (video) {
                                video.currentTime = (key === 'b') ? 0 : (video.duration || 99999);
                            }
                            triggerClick(epBtn); // Close episode list
                        }
                    }
                }, 200);
            }
        }
    });
}, true);
