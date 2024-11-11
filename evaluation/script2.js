let lupin;

function fetchproduct(){
    const requstOptions={
        method:"GET",
        redirect:"follow"

    }
    fetch(`https://project2-6c592-default-rtdb.firebaseio.com/.json`,requstOptions)
    .then((req)=>req.json())
    .then((data)=>{
        lupin=data
        displayProduct(data)})
    .catch((err)=>console.log(err))
}
function displayProduct(products){
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    Object.entries(products.productArray).forEach(([productKey, productDetails]) => {
        // Destructure the 'id' and 'category' properties from the product details
        const { id, title, description, price, strikePrice, quantity, category, images } = productDetails;
        const productCard = `
              <div class="product-card" >
                  <img src="${images[0] || images[1]}" alt="" class="productImage">
                  <h2>${title}</h2>
                  <p>${description}</p>
                  <p>Price: $${price} <s>$${strikePrice}</s></p>
                  <p>Available Quantity: ${quantity}</p>
                  <p>Category: ${category}</p>
                  <p>Average Rating: {averageRating}</p>
                  <button class="buttonem" onclick="addToCart(${id})">Add to Cart</button>
              </div>
          `;
        container.innerHTML += productCard;
       
    });




}
fetchproduct()


// Filter and sort functionality
document.getElementById('filter-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchitem').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filteredArray=Object.entries(lupin.productArray).filter(([productkey,productDetails])=>{
        const { id, title, description, price, strikePrice, quantity, category, images } = productDetails
        const matchesSearch = title.toLowerCase().includes(searchTerm);
        const matchesCategory = category ? category === category : true;
        const matchesPrice = price >= minPrice && price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    })
    

    
  

   

    displayProduct(filteredArray);
});