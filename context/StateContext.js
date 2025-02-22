import React,{createContext,useContext,useState,useEffect} from "react";
import { toast } from "react-hot-toast";

const context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty,setQty] = useState(1);
    let foundProduct;
    let Index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => { 
        setQty((prevQty) => {
        if(prevQty - 1 < 1) return 1;
        return prevQty - 1;
    });
    }

    const onAdd = (product,quantity) => { 

          const checkProduct =  cartItems.find((item) => item._d == product._id);

          setTotalPrice((totalPrice)=> totalPrice + product.price * quantity);
          setTotalQuantities((totalQuantities)=> totalQuantities + quantity);
 
          if(checkProduct){

            const updatedCartItems = cartItems.map((item) => {
             if(item._id == product._id){
                 return {...item,quantity: item.quantity + quantity}
                } 
            })
            
            setCartItems(updatedCartItems); 
          }
          else{ 
            product.quantity = quantity; 
            setCartItems([...cartItems,{...product}]);    
        } 

          toast.success(`${qty} ${product.name} added to the cart.`);
    }


    const toggleCartItemsQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id == id);
        Index = cartItems.findIndex((item) => item._id == id);

        const newCartItems = cartItems.filter((item) => item._id != id);

        if(value == 'inc'){ 
         setCartItems([{...foundProduct,quantity: foundProduct.quantity + 1},...newCartItems]);
         setTotalPrice((totalPrice) => totalPrice + foundProduct.price);
         setTotalQuantities((totalQuantities) => totalQuantities + 1);
        }
        else if(value == 'dec'){ 
         if( foundProduct.quantity > 1 ){ 
            setCartItems([{...foundProduct,quantity: foundProduct.quantity - 1},...newCartItems]);
            setTotalPrice((totalPrice) => totalPrice - foundProduct.price);
            setTotalQuantities((totalQuantities) => totalQuantities - 1);
         }

        }

    }

    useEffect(() => {
      if(cartItems.length !=0) localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    const onRemove = (id) => {
        
        foundProduct = cartItems.find((item) => item._id == id);
        const newCartItems = cartItems.filter((item) => item._id != id);

        setTotalPrice(totalPrice => totalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(totalQuantities => totalQuantities - foundProduct.quantity  );
        
        setCartItems(newCartItems);

    }

    return (
        <context.Provider
         value={{
            showCart,
            setShowCart,
            cartItems,
            setCartItems,
            totalPrice,
            setTotalPrice,
            totalQuantities,
            setTotalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemsQuantity,
            onRemove
         }}
        >
            {children}
        </context.Provider>
    )
    
}

export const useStateContext = () => useContext(context);