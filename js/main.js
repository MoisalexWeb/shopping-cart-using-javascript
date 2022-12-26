const header = document.getElementById('header'),
	menu = document.getElementById('menu'),
	darkBackground = document.getElementById('background'),
	images = [
		`<img src="images/image-product-1.jpg" class="main-img" data-index="0" alt="Sneaker">`,
		`<img src="images/image-product-2.jpg" class="main-img" data-index="1" alt="Sneaker">`,
		`<img src="images/image-product-3.jpg" class="main-img" data-index="2" alt="Sneaker">`,
		`<img src="images/image-product-4.jpg" class="main-img" data-index="3" alt="Sneaker">`,
	];

// Slider
const slider = (num, selector) => {
	let currentImage = document.querySelector(selector).innerHTML.toString().trim();
	let index = images.indexOf(currentImage)
	index += num
	
	if (index === images.length) index = 0
	else if (index < 0) index = images.length-1;
	
	document.querySelector(selector).innerHTML = images[index];
}


// Remove menu transition
const removeMenuTransition = () => {
	header.classList.remove("active-menu")
    menu.removeAttribute('style');
    darkBackground.removeAttribute('style');
}


// Add menu transition
const addMenuTransition = () => {
	if (document.querySelector('.header.active-menu')) {
		menu.style.transition = 'transform 0.3s ease-in-out'
		darkBackground.style.transition = "opacity 0.3s ease-in-out"
	}
}


// Add content when viewport is 1024px or greater
const responsiveImages = () => {
	const imagesCode = `
		<div class="sneakers__images">
			<figure data-index="0">
				<img src="images/image-product-1-thumbnail.jpg" alt="Sneakers" class="little-img">
			</figure>

			<figure data-index="1">
				<img src="images/image-product-2-thumbnail.jpg" alt="Sneakers" class="little-img">
			</figure>

			<figure data-index="2">
				<img src="images/image-product-3-thumbnail.jpg" alt="Sneakers" class="little-img">
			</figure>

			<figure data-index="3">
				<img src="images/image-product-4-thumbnail.jpg" alt="Sneakers" class="little-img">
			</figure>  
        </div>
	`;

	const lightboxSection = `
		<section class="lightbox__section">
            <div class="lightbox__container">
                <div class="lightbox__main">
                    <figure class="lightbox__figure">
                    </figure>

                    <button class="lightbox__close" aria-label="Close lightbox">
                    	<svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill-rule="evenodd"/></svg>
                    </button>

                    <button class="lightbox__arrow left" aria-label="Previous button">
                        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                    </button>

                    <button class="lightbox__arrow right" aria-label="Next button">
                        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                    </button>
                </div>

                <div class="lightbox__images">
                    <figure class="lightbox__little" data-index="0">
                        <img src="images/image-product-1-thumbnail.jpg" data-index="0" alt="Sneakers" class="lightbox-little">
                    </figure>

                    <figure class="lightbox__little" data-index="1">
                        <img src="images/image-product-2-thumbnail.jpg" data-index="1" alt="Sneakers" class="lightbox-little">
                    </figure>

                    <figure class="lightbox__little" data-index="2">
                        <img src="images/image-product-3-thumbnail.jpg" data-index="2" alt="Sneakers" class="lightbox-little">
                    </figure>

                    <figure class="lightbox__little" data-index="3">
                        <img src="images/image-product-4-thumbnail.jpg" data-index="3" alt="Sneakers" class="lightbox-little">
                    </figure>
                </div>
            </div>
        </section>
	`;

	const main = document.querySelector('main'),
		sliderContainer = document.getElementById('slider-container');

	const mediaQuery = window.matchMedia("(min-width:1024px)");

	const responsive = e => {
		if (e.matches) {
			removeMenuTransition();
			sliderContainer.insertAdjacentHTML("afterend", imagesCode);
			main.insertAdjacentHTML("beforeend",lightboxSection);
			
		}
		else {
			if (document.querySelector('.sneakers__images')) {
				document.querySelector('.sneakers__images').outerHTML = "";
				main.removeChild(document.querySelector('.lightbox__section'))
			}
		}
	}

	mediaQuery.addListener(responsive)
	responsive(mediaQuery)
}


// Add class to little image shown in lightbox
const imageActive = () => {
	if (document.querySelector('.show-lightbox')) {
		document.querySelectorAll('.lightbox__little').forEach(figure => figure.classList.remove('active-image'));
		const index = document.querySelector('.lightbox__figure .main-img').dataset.index;
		document.querySelector(`.lightbox__little[data-index="${index}"]`).classList.add('active-image');
	}
}



document.addEventListener('click', e => {
	// Showing mobile menu
	if (e.target.matches("#hamburger-button")) {
		header.classList.toggle("active-menu")
		addMenuTransition();
	}

	// Hidding mobile menu
	else if (e.target.matches(".nav-link") ||
		e.target.matches("#close-menu")||
		e.target.matches("#background")) {
		header.classList.remove("active-menu")
	}

	// Next image for mobile slider
	else if (e.target.matches("#prev-icon")) slider(-1, ".sneakers__figure")

	// Previous image for mobile slider
	else if (e.target.matches("#next-icon")) slider(1, ".sneakers__figure")

	// Showing-lightbox
	else if (e.target.matches(".sneakers__images figure")) {
		const lightbox = document.querySelector('.lightbox__section');
		const lightboxImage = document.querySelector('.lightbox__figure');
		lightbox.classList.add('show-lightbox');
		lightbox.style.transition = "transform 0.4s ease-in-out";
		lightboxImage.innerHTML = images[e.target.dataset.index];
		imageActive();
	}

	// Hidding lightbox
	else if (e.target.matches(".lightbox__close") ||
		e.target.matches(".lightbox__section")) document.querySelector('.lightbox__section').classList.remove('show-lightbox');

	// Previous image in slider for desktop
	else if (e.target.matches(".lightbox__arrow.left")) {
		slider(-1, ".lightbox__figure");
		imageActive()
	}

	// Next image in slider for desktop
	else if (e.target.matches(".lightbox__arrow.right")) {
		slider(1, ".lightbox__figure");
		imageActive()
	}

	// Chnage show image when little image are clicked
	else if (e.target.matches(".lightbox__little")) {
		document.querySelector('.lightbox__figure').innerHTML = images[e.target.dataset.index];
		imageActive();
	}
})

document.addEventListener('DOMContentLoaded', () => {
	responsiveImages();
})