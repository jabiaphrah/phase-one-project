document.addEventListener('DOMContentLoaded', function() {
  fetch('/db.json')
      .then(response => response.json())
      .then(data => {
          const books = data.books;

          // Display books in the product section
          displayBooks(books);

          // Display slider books (top 5 for now)
          displaySliderBooks(books);

          // Genre filter event listener
          document.querySelector('#genreFilter').addEventListener('change', function(event) {
              const selectedGenre = event.target.value;
              const filteredBooks = selectedGenre === 'all' ? books : books.filter(book => book.genre === selectedGenre);
              displayBooks(filteredBooks);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
});

function displayBooks(books) {
  const productSection = document.querySelector('.product');
  productSection.innerHTML = ''; // Clear the existing content

  books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('productItem');

      const bookImg = document.createElement('img');
      bookImg.src = book.image;
      bookImg.alt = book.title;
      bookImg.classList.add('productImg');

      const bookDetails = document.createElement('div');
      bookDetails.classList.add('productDetails');

      const bookTitle = document.createElement('h2');
      bookTitle.classList.add('productTitle');
      bookTitle.textContent = book.title;

      const bookPrice = document.createElement('p');
      bookPrice.classList.add('productPrice');
      bookPrice.textContent = `$${book.price}`;

      const bookDesc = document.createElement('p');
      bookDesc.classList.add('productDesc');
      bookDesc.textContent = book.description;

      const bookButton = document.createElement('button');
      bookButton.classList.add('productButton');
      bookButton.textContent = 'Buy Now';
      bookButton.onclick = () => handleBuy(book);

      bookDetails.append(bookTitle, bookPrice, bookDesc, bookButton);
      bookItem.append(bookImg, bookDetails);
      productSection.append(bookItem);
  });
}

function displaySliderBooks(books) {
  const sliderWrapper = document.querySelector('.sliderWrapper');
  sliderWrapper.innerHTML = ''; // Clear existing slider items

  books.slice(0, 5).forEach(book => {
      const sliderItem = document.createElement('div');
      sliderItem.classList.add('sliderItem');

      const sliderImg = document.createElement('img');
      sliderImg.src = book.image;
      sliderImg.alt = book.title;
      sliderImg.classList.add('sliderImg');

      const sliderBg = document.createElement('div');
      sliderBg.classList.add('sliderBg');

      const sliderTitle = document.createElement('h2');
      sliderTitle.classList.add('sliderTitle');
      sliderTitle.textContent = book.title;

      const sliderPrice = document.createElement('p');
      sliderPrice.classList.add('sliderPrice');
      sliderPrice.textContent = `$${book.price}`;

      const buyButton = document.createElement('button');
      buyButton.classList.add('buyButton');
      buyButton.textContent = 'Buy Now';
      buyButton.onclick = () => handleBuy(book);

      sliderItem.append(sliderImg, sliderBg, sliderTitle, sliderPrice, buyButton);
      sliderWrapper.append(sliderItem);
  });
}

function handleBuy(book) {
  alert(`Buying: ${book.title} for $${book.price}`);
}
