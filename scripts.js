$(document).ready(function(){
    $('#testimonialCarousel').carousel({
        interval: 1500 // Change the speed of the carousel to 1.5 seconds (in milliseconds)
    });

    // Hide the loading screen once the page has fully loaded
    $(window).on('load', function() {
        $('#loading-screen').fadeOut(200); // Faster fade out (200 milliseconds)
    });

    // Ensure the loading screen hides after 2 seconds even if the page hasn't fully loaded
    setTimeout(function() {
        $('#loading-screen').fadeOut(200); // Faster fade out (200 milliseconds)
    }, 2000); // 2 seconds

    // Lazy loading for images
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazyload");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        let lazyLoadThrottleTimeout;
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }

            lazyLoadThrottleTimeout = setTimeout(function() {
                let scrollTop = window.pageYOffset;
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazyload');
                    }
                });
                if (lazyImages.length == 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationChange", lazyLoad);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationChange", lazyLoad);
    }

    function searchProduct() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('.card-title').textContent.toLowerCase();
            if (productName.includes(searchInput)) {
                card.scrollIntoView({ behavior: 'smooth' });
                card.style.border = '2px solid red'; // Highlight the found product
            } else {
                card.style.border = 'none'; // Remove highlight from other products
            }
        });

        return false; // Prevent form submission
    }
    document.addEventListener('DOMContentLoaded', function () {
        const menuTabs = document.getElementById('menuTabs');
        const body = document.body;
    
        menuTabs.addEventListener('click', function (event) {
            if (event.target && event.target.nodeName === 'A') {
                const activeTab = event.target.getAttribute('href').substring(1);
                body.className = ''; // Reset classes
                body.classList.add(`bg-${activeTab}`);
            }
        });
    });
});