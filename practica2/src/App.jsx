import { useState, useEffect } from 'react'
import './index.css'
// Componentes
import {Header} from './components/header';
import {Footer} from './components/footer'
import {Guitar} from './components/guitar'
// Base de datos
import {db} from './data/db' 

function App() {

  function initialCart(){
    const localStorageCart =localStorage.getItem('cart')

    return localStorageCart? JSON.parse(localStorageCart):[]
  }


  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart)
  useEffect(()=>{

    localStorage.setItem('cart',JSON.stringify(cart))

  },[cart])


  function addToCart(guitar){
    const itemIndex=cart.findIndex((item)=>guitar.id==item.id)
    console.log(itemIndex);
    if(itemIndex==-1){
      //No existe e articulo en el carrito aun y lo arregla

      guitar.quantity=1;
      setCart([...cart,guitar])
    }
    else{
      //si la guitar ya se habia a;adido al carrito, se actualiza el quantity

      const updatedCart=[...cart] //Se crea una copia de la vairable de estado
      updatedCart[itemIndex].quantity ++;
      setCart(updatedCart);
    }

    

    
    
  }

  function calculateTotal(){

    /*let total =0;
    for(const guitar of cart){
      total+=guitar.price * guitar.quantity;
    }

    */


    let total= cart.reduce((total,item)=>total+item.price*item.quantity, 0)
    return total;
    
    



  
  }



  //Aqui hare funcional los botones del carrito, +, -, x y vaciar carrito


  function increaseQuantity(id){
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);
    if(itemIndex !== -1){
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }

  function decreaseQuantity(id){
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === id);
    if(itemIndex !== -1 && updatedCart[itemIndex].quantity > 1){
      updatedCart[itemIndex].quantity--;
      setCart(updatedCart);
    }
  }

  function removeFromCart(id){
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  function clearCart(){
    setCart([]);
  }










  return (
    <>
      <Header cart={cart} total={calculateTotal()} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} clearCart={clearCart}/>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}


          
          

        </div>
      </main>  
      <Footer/>
    </>
  )
}

export default App
