import { createContext, ReactNode, useState } from 'react'

interface ProductProps {
  id: string
  name: string
  imageUrl: string
  description: string
  price: string
}

interface CartContextData {
  cartProducts: ProductProps[]
  isCartOpen: 'isOpen' | 'isClosed'
  setCartProducts: (product: ProductProps[]) => void
  setIsCartOpen: (item: 'isOpen' | 'isClosed') => void
  addProductToCart: (product: ProductProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<ProductProps[]>([])
  const [isCartOpen, setIsCartOpen] = useState<'isOpen' | 'isClosed'>(
    'isClosed'
  )

  const addProductToCart = async (item: ProductProps) => {
    setCartProducts((state) => [...state, item])
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
