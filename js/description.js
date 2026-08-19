document.addEventListener('DOMContentLoaded', () => {
    const descriptionButton = document.getElementById('description-btn');
    const overlay = document.getElementById('description-overlay');
    const backButton = document.getElementById('description-back');

    descriptionButton.addEventListener('click', () => {
        overlay.hidden = false;
    });

    backButton.addEventListener('click', () => {
        overlay.hidden = true;
    });
});
