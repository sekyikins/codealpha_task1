const images = document.querySelectorAll('.gallery-item1, .gallery-item2');
const discoverText = document.querySelector('.gallery-container h2');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
let mouseMoveTimeout;
let currentIndex = 0;

images.forEach(img => {
    img.addEventListener('click', () => {
        if (img.classList.contains('gallery-item2')) {
            img.classList.add('enlarged'); // Add the enlarged class only to gallery-item2
        }
        const download = confirm("Do you want to download this image?");
        if (download) {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = img.src.split('/').pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        if (img.classList.contains('gallery-item2')) {
            setTimeout(() => {
                img.classList.remove('enlarged'); // Remove the enlarged class after the download prompt
            }, 2000); // Adjust the timeout as needed
        }
    });
});

function showDiscoverText() {
    discoverText.style.opacity = '1';
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        discoverText.style.opacity = '0';
    }, 1000); // Hide text after 1 seconds of inactivity
}

function showNextImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
}

function showPreviousImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].classList.add('slide-in-left', 'active');
    setTimeout(() => {
        images[currentIndex].classList.remove('slide-in-left');
    }, 3000);
}

document.addEventListener('mousemove', showDiscoverText);
document.addEventListener('touchstart', showDiscoverText);

rightButton.addEventListener('click', showNextImage);
leftButton.addEventListener('click', showPreviousImage);

images[currentIndex].classList.add('active');
setInterval(showNextImage, 5000);