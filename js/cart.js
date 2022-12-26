const $addSneaker = document.getElementById('plus-button'),
	$lessSneaker = document.getElementById('minus-button'),
	$cartNumber = document.querySelector('.cart-number'),
	$orderNumber = document.querySelector('.numbers-input'),
	$addCartButton = document.getElementById('add-to-cart'),
	$cart = document.getElementById('basket');

let sneakers = 0,
	cartSneakers = 0;

const cartFilledCode = `
	<div class="basket__main">
        <div class="basket__content">
            <div>
                <figure class="basket__figure">
                    <img src="images/image-product-1-thumbnail.jpg" alt="Sneakers" class="basket-img">
                </figure>

                <div class="basket__texts">
                    <h3 class="basket-title">Autum limited Edition</h3>
                    <p class="basket__prices">
                        <span class="prices-price">125$.00 <span>x</span></span>
                        <span class="prices-number">3</span>
                        <span class="prices-total">$375.00</span>
                    </p>
                </div>
            </div>

            <button class="basket-delete" aria-label="Delete shopping cart">
                <img src="images/icon-delete.svg" class="delete-img" alt="Delete">
            </button>
        </div>

        <button class="basket-checkout">Checkout</button>
    </div>
`;

$orderNumber.value = sneakers;
$cartNumber.textContent = cartSneakers;


// Show filled cart in HTML
const fillCart = (selector) => {
	document.querySelector(selector).innerHTML = cartFilledCode;
}

// Calculate total prices
const calculatePrice = () => {
	if (document.querySelector('.basket__main')) {
		document.querySelector('.prices-number').textContent = cartSneakers;
		document.querySelector('.prices-total').textContent = `$${125*cartSneakers}.00`;
	}
}


document.addEventListener('click', e => {
	// Plus 1 sneaker
	if (e.target === $addSneaker) {
		sneakers++;
		$orderNumber.value = sneakers;
	}

	// Less 1 sneaker
	else if (e.target === $lessSneaker) {
		if (sneakers === 0) return
		sneakers--;
		$orderNumber.value = sneakers;
	}

	// Add to cart
	else if (e.target === $addCartButton) {
		if (sneakers === 0) return
		cartSneakers += sneakers
		$cartNumber.textContent = cartSneakers;
		$cartNumber.style.display = "block";
		sneakers = 0;
		$orderNumber.value = sneakers;
		fillCart(".basket__container");
		calculatePrice();
	}

	// Show shopping cart
	else if (e.target.matches(".nav__cart")) {
		$cart.classList.toggle("show-basket");
	}

	// Delete shopping cart
	else if (e.target.matches(".basket-delete")) {
		sneakers, cartSneakers = 0;
		$cartNumber.textContent = cartSneakers;
		$cartNumber.style.display = "none";
		document.querySelector('.basket__main').outerHTML = `<p class="basket-empty">Your cart is empty.</p>`

	}

	// Hidding shopping cart
	else if (!e.target.matches(".nav__cart")
		&& $cart.classList.contains("show-basket")) $cart.classList.remove("show-basket")
})