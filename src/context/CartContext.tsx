import { createContext, ReactNode, useState } from 'react'

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
  currentProduct: string
  isCartOpen: 'isOpen' | 'isClosed'
  cartProductsAmount: number
  setCartProducts: (product: ProductProps[]) => void
  setIsCartOpen: (item: 'isOpen' | 'isClosed') => void
  setCartProductsAmount: (item: number) => void
  addProductToCart: (product: ProductProps) => void
  removeProductFromCart: (product: ProductProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<ProductProps[]>([])
  const [cartProductsAmount, setCartProductsAmount] = useState(0)
  const [currentProduct, setCurrentProduct] = useState('')
  const [isCartOpen, setIsCartOpen] = useState<'isOpen' | 'isClosed'>(
    'isClosed'
  )

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
    // pego o item com a quantidade atual
    const product = cartProducts.find(
      (product) => product.id === item.id
    ) as ProductProps

    // substituo o valor original por todos menos o do id atual
    setCartProducts(cartProducts.filter((product) => product.id !== item.id))

    // faço uma cópia dos existentes e adiciono produto, com a quantidade reduzida
    setCartProducts((state) => [
      ...state,
      { ...product, quantity: product.quantity - 1 }
    ])
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        currentProduct,
        cartProductsAmount,
        setCartProductsAmount,
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
