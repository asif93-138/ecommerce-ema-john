import { useEffect, useState } from 'react';
import './App.css';
import logo from './images/Logo.svg';

function App() {
  return (
    <div className="App">
      <Header />
      <Shop />
    </div>
  );
}

function Header() {
  return (
    <nav className=''>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
  <div className="container-fluid px-lg-5">
    <a className="navbar-brand" href="index.html"><img src={logo} alt='Logo' className='' /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item mx-3">
          <a className="nav-link" href="index.html"><small>Order</small></a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link" href="index.html"><small>Order Review</small></a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link" href="index.html"><small>Manage Inventory</small></a>
        </li>    
        <li className="nav-item mx-3">
          <a className="nav-link" href="index.html"><small>Login</small></a>
        </li> 
      </ul>
    </div>
  </div>
</nav>

    </nav>
  );
}

function Shop() {
  // useEffect(() => {
  //   fetch("products.json")
  //   .then(res => res.json())
  //   .then(data =>console.log(data))
  // }, []);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json")
    .then(res => res.json())
    .then(data => setProducts(data))
  }, []);
  const [cart, setCart] = useState([]);
  let arr = [];
  if (products.length > 0) {for (let i = 1; i <= localStorage.length; i++) {arr.push(products.find(x => x.id == localStorage.getItem(i)))}} 
  if (arr.length > 0) {setCart(arr)}
  function storedCart() {

  }
  
 
    
  return (
    <div className='container-fluid'>
      {/* <h1 className='text-center'>Products length : {products.length}</h1> */}
      <Product products={products} cart={cart} setCart={setCart} storedCart={storedCart} />
      
    </div>
  );
}

function Product(props) {

  const {cart, setCart, storedCart} = props;

  




  
  function addToCart(data) {

    
    if (cart.every(val => val != data) == true) {
      // console.log(data.id);
      const newCart = [...cart, data];
      setCart(newCart);
      localStorage.setItem(newCart.length, data.id);
    } else {alert('Already added!!')}
      
  }
  // console.log(cart);
  
  let sum = 0;
  cart.map(data => sum += data.price);
  function cC() {
    setCart([]);
    localStorage.clear();
  }
  return (
    <section className='d-md-flex'>
      <div className="row row-cols-1 row-cols-md-3 g-5 m-0 w-75 width-control">
      {props.products.map(product => {
        return (
          <div key={product.id} className="col">
          <div className="card h-100">
            <img src={product.img} alt='product' />
            <div className="card-body pb-0">
              <h5 className="card-title">{product.name}</h5>
              <h6 className="card-title">{product.category}</h6>
              <h6 className="card-title">Price : ${product.price}</h6>
              <p className=''><small className="text-body-secondary">Manufacturer : {product.seller}</small><br />
              <small className="text-body-secondary">Rating : {product.ratings} stars</small></p>
            </div>
            <button onClick={() => addToCart(product)} type='button' className="card-footer border-0">
              <small className="text-body-secondary">Add to Cart</small>
            </button>
          </div>
        </div>
        );
      })}
      </div>
      <article className='w-25 width-control text-bg-secondary mt-2 mt-md-0 p-3 scrolling'>
        <h4 className='text-center mt-4'>Order Summary</h4>
        <div className='ms-md-5 mt-4'>
        <p>Selected Items : {cart.length}</p>
        <p>Total Price : ${sum}</p>
        <p>Total Shipping Charge : ${cart.length*20}</p>
        <p>Tax : ${sum*10/100}</p>
        <h4>Grand Total : ${(sum)+(cart.length*20)+(sum*10/100)}</h4>
        </div><br /><br />
        <div className='text-center'>
          <button onClick={cC} type='button' className='border w-75 p-2'>Clear Cart</button><br /><br />
          <button onClick={storedCart} type='button' className='border w-75 p-2'>Load Previous Cart</button>
        </div>
      </article>
    </section>
  );
}



export default App;
