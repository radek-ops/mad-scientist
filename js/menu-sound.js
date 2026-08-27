/**
 * Adds a click sound effect to all navigation links and buttons 
 * (excluding mute and touch buttons), provided the game sound is not muted.
 */
document.addEventListener('DOMContentLoaded', () => {
    const menuSound = new Audio('sounds/menu_select.mp3');
    document.querySelectorAll('a, button:not(.mute-btn):not(.touch-btn)').forEach((element) => {
        element.addEventListener('click', () => {
            if (isMuted()) {
                return;
            }
            menuSound.currentTime = 0;
            menuSound.play();
        });
    });
});