import { createContext, ReactNode, useState } from 'react'

interface CartContextData {
  cartProducts: string[]
  isCartOpen: 'isOpen' | 'isClosed'
  setCartProducts: (product: string[]) => void
  setIsCartOpen: (item: 'isOpen' | 'isClosed') => void
  getProductId: (product: string) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState<'isOpen' | 'isClosed'>(
    'isClosed'
  )

  const getProductId = async (item: string) => {
    setCartProducts((state) => [...state, item])
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        getProductId,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
