import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Guitarra from "./components/Guitarra";
import { db } from './data/db';


function App() {

  const initialCart =  () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

const [data] = useState(db);

//Creo un State para el carrito
const [cart, setCart] = useState(initialCart);

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

useEffect(() =>{
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

//Creo funcion para añadir a carrito
function addToCart(item){
  const itemExists = cart.findIndex(guitarra => guitarra.id === item.id);
  console.log(itemExists);
  if(itemExists >= 0){
    if(cart[itemExists].quantity >= MAX_ITEMS) return
    //Este elemento existe en el carrito
    console.log("ya existe en el carrito")
    const updatedCart = [... cart];
    updatedCart[itemExists].quantity++;
    setCart(updatedCart);
  }else{
    console.log("no existe...Agregando");
    item.quantity = 1;
    setCart([...cart, item])
  }

  

}

function removeFromCart(id){
  setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id))

}

function decrementarCantidad(id){
const actualizarCarrito = cart.map( item => {
  if(item.id === id && item.quantity > MIN_ITEMS){
    return{
      ...item,
      quantity: item.quantity - 1
    }
  }
  return item
})
setCart(actualizarCarrito)


}
function incrementarCantidad(id){
const actualizarCarrito = cart.map( item => {
  if(item.id === id && item.quantity < MAX_ITEMS){
    return{
      ...item,
      quantity: item.quantity + 1
    }
  }
  return item
})
setCart(actualizarCarrito)


}

function vaciarCarrito(){
  setCart([])
}


  return (
    <>

    <Header 
      cart = {cart}
      removeFromCart={removeFromCart}
      decrementarCantidad={decrementarCantidad}
      incrementarCantidad={incrementarCantidad}
      vaciarCarrito={vaciarCarrito}
    />


    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitarra
            key={guitarra.id}
            guitarra = {guitarra}
            setCart ={setCart}
            addToCart={addToCart}


            />

          ))}


        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>


    </>
  )
}

export default App
