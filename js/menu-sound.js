document.addEventListener('DOMContentLoaded', () => {
    const menuSound = new Audio('sounds/menu_select.mp3');
    document.querySelectorAll('a, button:not(.mute-btn)').forEach((element) => {
        element.addEventListener('click', () => {
            if (isMuted()) {
                return;
            }
            menuSound.currentTime = 0;
            menuSound.play();
        });
    });
});