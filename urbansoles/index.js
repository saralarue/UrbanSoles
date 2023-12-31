// Thumbnail Interaction Section
// Get all thumbnail images
const thumbnails = document.querySelectorAll('.thumbnail')

// Add event listeners for each thumbnail
thumbnails.forEach((thumbnail) => {
    const displayImg = document.querySelector('.displayImg')

    // Handle thumbnail click, hover, and border
    handleThumbnailClick(displayImg, thumbnail)
    handleThumbnailHover(thumbnail)
    handleThumbnailBorder(thumbnail)
})

// Function to handle click event for thumbnail images
function handleThumbnailClick(displayImg, thumbnail) {
    thumbnail.addEventListener('click', () => {
        let highResSrc = thumbnail.dataset.highResSrc

        if (highResSrc) {
            // Remove the 'selected' class from all thumbnails
            thumbnails.forEach((thumbnail) => {
                thumbnail.classList.remove('selected')
            })

            // Add the 'selected' class to the clicked thumbnail
            thumbnail.classList.add('selected')

            if (thumbnail.closest('.modal')) {
                let modalDisplayImg = document.querySelector('.modal .displayImg')
                modalDisplayImg.src = highResSrc
            } else {
                displayImg.src = highResSrc
            }
        }
    })
}

// Function to handle hover events for thumbnail images
function handleThumbnailHover(thumbnail) {
    thumbnail.addEventListener('mouseenter', () => {
        // Add the 'hovered' class to the hovered thumbnail
        thumbnail.classList.add('hovered')
    })

    thumbnail.addEventListener('mouseleave', () => {
        // Remove the 'hovered' class from the hovered thumbnail
        thumbnail.classList.remove('hovered')
    })
}

// Function to handle border for thumbnail images
function handleThumbnailBorder(thumbnail) {
    thumbnail.addEventListener('click', () => {
        const thumbnailBorder = document.querySelectorAll('.thumbnailBorder')

        // Remove the 'cartCounter' class from all thumbnail borders
        thumbnailBorder.forEach((border) => {
            border.classList.remove('thumbnailBorder.cartCounter')
        })

        // Add the 'cartCounter' class to the clicked thumbnail border
        thumbnail.parentElement.classList.add('thumbnailBorder.cartCounter')
    })
}

// Modal Image Switching Section
// Select the display image and thumbnail images
let displayImg = document.querySelector('.displayImg') // Main display image
let modalDisplayImg = document.querySelector('.modal .displayImg') // Modal display image
let modalThumbnails = document.querySelectorAll('.modal .thumbnail') // Thumbnails inside the modal

// Add click event listener to thumbnails inside the modal
modalThumbnails.forEach((thumbnail) => {
    // Attach click event listener to change the modal display image
    handleThumbnailClick(modalDisplayImg, thumbnail)

    // Attach hover event listener to add effects to the thumbnail
    handleThumbnailHover(thumbnail)
})

// Add click event listener to thumbnails outside the modal
thumbnails.forEach((thumbnail) => {
    // Attach click event listener to change the regular display image
    handleThumbnailClick(displayImg, thumbnail)

    // Attach hover event listener to add effects to the thumbnail
    handleThumbnailHover(thumbnail)
})

// Modal Display Logic Section
// Get the modal
let modal = document.getElementById('myModal')

// Get the button that opens the modal
let btn = document.getElementById('myBtn')

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0]

// When the user clicks the button, open the modal
btn.onclick = () => {
    // This event handler function is triggered when the button to open the modal is clicked.
    // It sets the display style of the modal to 'block', making it visible.
    modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    // This event handler function is triggered when the close button in the modal is clicked.
    // It sets the display style of the modal to 'none', hiding it.
    modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    // This event handler function is triggered when a click event occurs on the window.
    // If the clicked element is the modal itself, it sets the display style of the modal to 'none', closing it.
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}

// Modal Image Navigation Section
// Get the SVG elements for switching images
let prevSvg = document.querySelector('.circle-background:nth-child(1)')
let nextSvg = document.querySelector('.circle-background:nth-child(3)')

// Add event listeners to the SVG elements
prevSvg.addEventListener('click', switchToPrevImage)
nextSvg.addEventListener('click', switchToNextImage)

// Add event listeners for keyboard arrows
document.addEventListener('keydown', handleKeyDown)

// Define an array of image URLs
let imageUrls = [
    'https://res.cloudinary.com/djkuts9jo/image/upload/v1684724677/e-commerce%20product%20page%20-%20frontend%20mentor/image-product-1.jpg',
    'https://res.cloudinary.com/djkuts9jo/image/upload/v1684724677/e-commerce%20product%20page%20-%20frontend%20mentor/image-product-2.jpg',
    'https://res.cloudinary.com/djkuts9jo/image/upload/v1684724677/e-commerce%20product%20page%20-%20frontend%20mentor/image-product-3.jpg',
    'https://res.cloudinary.com/djkuts9jo/image/upload/v1684724678/e-commerce%20product%20page%20-%20frontend%20mentor/image-product-4.jpg'
]

// Define the initial image index
let currentImageIndex = 0

// Function to switch to the previous image
function switchToPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length
    modalDisplayImg.src = imageUrls[currentImageIndex]
}

// Function to switch to the next image
function switchToNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length
    modalDisplayImg.src = imageUrls[currentImageIndex]
}

// Function to handle keyboard arrow key events
function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        switchToPrevImage()
    } else if (event.key === 'ArrowRight') {
        switchToNextImage()
    }
}

// Cart Addition and Removal
// Get elements and create variables
const decreaseBtn = document.querySelector('.decreaseBtn')
const increaseBtn = document.querySelector('.increaseBtn')
const quantityValue = document.querySelector('.quantityValue')
const cartCounter = document.querySelector('.cartCounter')

// Add event listeners to the buttons
// Listen for click event on the decrease button
decreaseBtn.addEventListener('click', decreaseQuantity)
// Listen for click event on the increase button
increaseBtn.addEventListener('click', increaseQuantity)

// Initialize total quantity variable
let totalQuantity = 0

function decreaseQuantity() {
    // Get the current quantity value
    let quantity = parseInt(quantityValue.textContent)
    if (quantity > 0) {
        // Decrease the quantity by 1
        quantity--
        // Update the quantity value element
        quantityValue.textContent = quantity
    }
}

function increaseQuantity() {
    // Get the current quantity value
    let quantity = parseInt(quantityValue.textContent)
    // Increase the quantity by 1
    quantity++
    // Update the quantity value element
    quantityValue.textContent = quantity
}

// Add to Cart Section
// Get the add to cart element
const addToCart = document.querySelector('.addToCart')

// Listen for click event on the add to cart element
addToCart.addEventListener('click', addCartQuantity)

function addCartQuantity() {
    // Get the current quantity value
    let value = parseInt(quantityValue.textContent)

    // Add the quantity to the total quantity
    totalQuantity += value

    // Update the cartCounter element with the total quantity
    cartCounter.textContent = totalQuantity

    // Reset the quantity value to 0
    quantityValue.textContent = '0'
}

////////// Cart Popup Section
// Select the cart quantity element
let popupButton = document.querySelector('.cartQuantity')

// Get the container where the popups will be appended
const popupContainer = document.getElementById('popupContainer')

// Add click event listener to the cart quantity element
popupButton.addEventListener('click', () => {
    // Create a new popup element
    const popup = createPopup()

    // Append the popup to the popup container
    popupContainer.appendChild(popup)
})

// Function to create a new popup element
function createPopup() {
    const popup = createPopupElement()
    const cancel = createCancelButton()
    const message = createMessageElement()

    // Append the message and close button to the popup element
    popup.appendChild(message)
    popup.appendChild(cancel)

    return popup
}

// Function to create a new popup element
function createPopupElement() {
    const popup = document.createElement('div')
    popup.classList.add('popup')
    popup.id = 'cartCounter'
    return popup
}

// Function to create a new cancel button element
function createCancelButton() {
    const cancel = document.createElement('div')
    cancel.classList.add('cancel')
    cancel.textContent = 'close'
    cancel.onclick = function (e) {
        removePopupFromContainer()
    }
    return cancel
}

// Function to create the content of the popup
function createMessageElement() {
    const messageContainer = document.createElement('div')

    // Section 1: Title
    const titleSection = document.createElement('div')
    titleSection.textContent = 'Cart'
    titleSection.classList.add('popup-title')
    messageContainer.appendChild(titleSection)

    // Section 2: Quantity
    const quantitySection = document.createElement('div')
    quantitySection.classList.add('popup-quantity')
    messageContainer.appendChild(quantitySection)

    // Section 3: Price
    const priceSection = document.createElement('div')
    priceSection.classList.add('popup-price')
    messageContainer.appendChild(priceSection)

    // Create an img element
    const productThumbnailCart = document.createElement('img')
    productThumbnailCart.src = 'https://res.cloudinary.com/djkuts9jo/image/upload/v1684724677/e-commerce%20product%20page%20-%20frontend%20mentor/image-product-1-thumbnail.jpg'
    productThumbnailCart.alt = 'Product Image Thumbnail'
    productThumbnailCart.classList.add('productThumbnailCart')

    // Create the trashcan icon
    const trashcanIcon = document.createElement('img')
    trashcanIcon.src = 'https://res.cloudinary.com/djkuts9jo/image/upload/v1693185511/e-commerce%20product%20page%20-%20frontend%20mentor/icon-delete_eyaqok.svg'
    trashcanIcon.alt = 'Trashcan Icon'
    trashcanIcon.classList.add('trashcan-icon')

    // Attach an event listener to the trashcan icon
    trashcanIcon.addEventListener('click', () => {
        emptyCart(); // Call the emptyCart function when the trashcan icon is clicked
    })

    // Function to get total price based on the current quantity
    function getTotalPrice() {
        return 125 * totalQuantity
    }

    // Function to empty the cart
    function emptyCart() {
        // Remove items from the shopping cart logic here
        totalQuantity = 0;
        updateMessageContent();

        // Reset the cartCounter div to 0
        cartCounter.textContent = '';
    }

    // Function to update the content of the popup
    function updateMessageContent() {
        if (totalQuantity >= 1) {
            // Update the quantitySection
            quantitySection.textContent = 'Fall Limited Addition Sneakers';

            // Update the priceSection
            const totalPrice = getTotalPrice();
            const boldPrice = document.createElement('span');
            boldPrice.textContent = `$${totalPrice.toFixed(2)}`;
            boldPrice.classList.add('bold-text');
            priceSection.textContent = `$125.00 x ${totalQuantity} `;
            priceSection.appendChild(boldPrice);

            // Append the image to the quantitySection
            quantitySection.appendChild(productThumbnailCart);
            quantitySection.appendChild(trashcanIcon);

            // Ensure the quantitySection is displayed before the priceSection
            messageContainer.insertBefore(quantitySection, priceSection);
        } else {
            // Update the quantitySection to indicate the cart is empty
            quantitySection.textContent = 'Your cart is empty.';

            // Remove the image and trashcan icon from the quantitySection
            if (productThumbnailCart.parentNode === quantitySection) {
                quantitySection.removeChild(productThumbnailCart);
            }
            if (trashcanIcon.parentNode === quantitySection) {
                quantitySection.removeChild(trashcanIcon);
            }

            // Clear the priceSection
            priceSection.textContent = '';
        }
    }
    // Initial update
    updateMessageContent()

    // Observer setup (assuming you define the 'cartCounter' variable elsewhere)
    const observer = new MutationObserver(updateMessageContent)
    observer.observe(cartCounter, { childList: true })

    return messageContainer
}

// Function to remove the popup from the popup container
function removePopupFromContainer() {
    const popup = document.getElementById('cartCounter')
    if (popup) {
        popup.remove()
    }
}