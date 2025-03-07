const images = document.querySelectorAll('.gallery-item1, .gallery-item2');
const discoverText = document.querySelector('.gallery-container h2');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
let mouseMoveTimeout;
let currentIndex = 0;

images.forEach(img => {
    img.addEventListener('click', () => {
        if (img.classList.contains('gallery-item2')) {
            const rect = img.getBoundingClientRect(); // Get the position of the image
            const clone = img.cloneNode(true);// Clone the image
            clone.classList.add('enlarged'); // Add the enlarged class only to clone
            clone.style.position = 'fixed';// Set the position to fixed
            clone.style.top = `${rect.top}px`;// Set the top to the top of the tapped image
            clone.style.left = `${rect.left}px`;// Set the left to the left of the tapped image
            clone.style.width = `${rect.width}px`;// Set the width to the width of the tapped image
            clone.style.height = `${rect.height}px`;// Set the height to the height of the tapped image
            document.body.appendChild(clone);// Append clone to the body

            // Force a reflow to apply the initial position
            clone.offsetHeight;

            // Transition to the center
            clone.style.top = '50%';
            clone.style.left = '50%';
            clone.style.transform = 'translate(-50%, -50%) scale(3.5)';

            setTimeout(() => {
                const download = confirm("Do you want to download this image?");
                if (download) {
                    const link = document.createElement('a');
                    link.href = img.src;
                    link.download = img.src.split('/').pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                setTimeout(() => {
                    // Transition back
                    clone.style.top = `${rect.top}px`;
                    clone.style.left = `${rect.left}px`;
                    clone.style.transform = `translate(0, 0) scale(1)`;
                    setTimeout(() => {
                        clone.remove();
                    }, 300);
                }, 5000);
            }, 1000);
        }
    });
});

function showDiscoverText() {
    discoverText.style.opacity = '1';
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        discoverText.style.opacity = '0';
    }, 2500); // Hide text after 2.5 seconds of inactivity
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


// Form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('subscription-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Capture the input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('password').value;

        // Log the input values to the console
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);

        // Reset the form fields
        contactForm.reset();

        // Update the button
        submitButton.disabled = true;
        submitButton.textContent = 'Submitted';
        submitButton.classList.add('Submitted');

        // Reset the button after 3 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            submitButton.classList.remove('Submitted');
        }, 3000);
    });
});