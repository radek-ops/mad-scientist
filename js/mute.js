/**
 * Shared mute state (persisted in localStorage) and mute button handling.
 */
const MUTE_STORAGE_KEY = 'mad-scientist-muted';

/**
 * Returns true when the sound is muted.
 * @returns {boolean} True when muted
 */
function isMuted() {
    return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
}

/**
 * Saves the muted state.
 * @param {boolean} muted - Whether sound should be muted
 */
function setMuted(muted) {
    localStorage.setItem(MUTE_STORAGE_KEY, String(muted));
}

/**
 * Toggles the muted state and refreshes all mute buttons.
 * @returns {boolean} The new muted state
 */
function toggleMute() {
    const muted = !isMuted();
    setMuted(muted);
    updateMuteButtons();
    if (typeof world !== 'undefined' && world && world.sound) {
        world.sound.updateMute();
    }
    return muted;
}

/**
 * Updates the label of every mute button to the current state.
 */
function updateMuteButtons() {
    const muted = isMuted();
    document.querySelectorAll('.mute-btn').forEach((btn) => {
        btn.textContent = muted ? '🔇 Sound Off' : '🔊 Sound On';
        btn.classList.toggle('muted', muted);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mute-btn').forEach((btn) => {
        btn.addEventListener('click', toggleMute);
    });
    updateMuteButtons();
});