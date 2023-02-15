import { createContext, ReactNode, useEffect, useState } from 'react'

export interface ProductProps {
  defaultPriceId: string
  id: string
  name: string
  imageUrl: string
  description: string
  price: string
  quantity: number
}

interface CartContextData {
  cartProducts: ProductProps[]
  cartItems: ProductProps[]
  currentProduct: string
  isCartOpen: 'isOpen' | 'isClosed'
  setCartProducts: (product: ProductProps[]) => void
  setIsCartOpen: (item: 'isOpen' | 'isClosed') => void
  addProductToCart: (product: ProductProps) => void
  removeProductFromCart: (product: ProductProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<ProductProps[]>([])
  const [currentProduct, setCurrentProduct] = useState('')
  const [isCartOpen, setIsCartOpen] = useState<'isOpen' | 'isClosed'>(
    'isClosed'
  )
  const [cartItems, setCartItems] = useState<ProductProps[]>([])

  const addProductToCart = async (item: ProductProps) => {
    setCurrentProduct(item.name)
    // verificar se o item já existe
    const productExist = cartProducts.find(
      (product) => product.id === item.id
    ) as ProductProps

    if (!productExist) {
      // se não faço um copia dos que existem e add o novo
      setCartProducts((state) => [...state, item])
    } else {
      // se sim, apenas incremento a quantidade

      // substituo o valor original por todos menos o do id atual
      setCartProducts(cartProducts.filter((product) => product.id !== item.id))

      // faço uma cópia e adiciono o produto com 1 item a mais
      setCartProducts((state) => [
        ...state,
        { ...productExist, quantity: productExist.quantity + 1 }
      ])
    }
  }

  const removeProductFromCart = (item: ProductProps) => {
    setCurrentProduct(item.name)

    // pego o item com a quantidade atual
    const product = cartProducts.find(
      (product) => product.id === item.id
    ) as ProductProps

    // substituo o valor original por todos menos o do id atual
    const cartProductsFiltered = cartProducts.filter(
      (product) => product.id !== item.id
    )
    setCartProducts(cartProductsFiltered)

    // faço uma cópia dos existentes e adiciono produto, com a quantidade reduzida
    if (product?.quantity > 1) {
      setCartProducts((state) => [
        ...state,
        { ...product, quantity: product.quantity - 1 }
      ])
    }
  }

  useEffect(() => {
    if (cartProducts.length > 0) {
      setCartItems([])
      for (let i = 0; i < cartProducts.length; i++) {
        for (let k = 1; k <= cartProducts[i].quantity; k++) {
          setCartItems((state) => [...state, cartProducts[i]])
        }
      }
    }

    if (cartProducts.length === 0) {
      setCartItems([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, currentProduct])

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        cartItems,
        currentProduct,
        setCartProducts,
        addProductToCart,
        isCartOpen,
        setIsCartOpen,
        removeProductFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
