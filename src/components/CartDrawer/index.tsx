import Image from 'next/image'
import { useContext, useEffect, useMemo, useState } from 'react'

import axios from 'axios'

import { IoCloseSharp } from 'react-icons/io5'
import { CartContext, ProductProps } from '../../context/CartContext'
import { ConvertNumber } from '../../utils/ConvertNumber'

import { Container, Products, Product, PriceDetail } from './style'

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartProducts,
    removeProductFromCart,
    currentProduct,
    setCartProductsAmount
  } = useContext(CartContext)

  const [cartItems, setCartItems] = useState<ProductProps[]>([])
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const handleCloseCart = () => {
    setIsCartOpen(isCartOpen === 'isOpen' ? 'isClosed' : 'isOpen')
  }

  const handleRemoveItemFromCart = (product: ProductProps) => {
    removeProductFromCart({ ...product, quantity: 1 })
  }

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true)

      const { data } = await axios.post('/api/checkout', {
        products: cartProducts
      })

      // const { data } = await axios.post('/api/checkout', {
      //   priceId: product.defaultPriceId
      // })
      const { checkoutUrl } = data

      window.location.href = checkoutUrl
    } catch (err) {
      // Conectar com uma ferramenata de observabilidade (Sentry | Datadog)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const totalPrice = useMemo(() => {
    const total = cartItems.reduce((acc, curr) => {
      const price = Number(curr.price)

      return acc + price
    }, 0)

    return ConvertNumber(Number(total))
  }, [cartItems])

  useEffect(() => {
    if (cartProducts.length > 0) {
      // preciso montar um array de itens separados
      for (let i = 0; i < cartProducts.length; i++) {
        // se cartProduct[i].quantity > 1
        if (cartProducts[i].name === currentProduct) {
          if (cartProducts[i].quantity > 1) {
            // adiciono essa quantidade de tempo
            setCartItems(
              cartItems.filter((item) => item.id !== cartProducts[i].id)
            )
            for (let k = 1; k < cartProducts[i].quantity; k++) {
              setCartItems((state) => [...state, cartProducts[i]])
            }
          } else {
            // se não adicion apenas 1 vez
            if (!cartItems.includes(cartProducts[i])) {
              setCartItems((state) => [...state, cartProducts[i]])
            }
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts])

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartProductsAmount(cartItems.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  const isFinisheButtonDisabled = cartProducts.length === 0

  return (
    <Container display={isCartOpen}>
      <div className="svg">
        <IoCloseSharp size="1.5rem" onClick={handleCloseCart} />
      </div>

      <h2>Sacola de compras</h2>

      <Products>
        {cartItems.map((product, index) => {
          const price = ConvertNumber(Number(product.price))
          return (
            <Product key={`${product.id}.${index}`}>
              <div className="img">
                <Image alt="" src={product.imageUrl} width={94} height={94} />
              </div>
              <div className="frame">
                <h4>{product.name}</h4>
                <span>{price}</span>
                <button onClick={() => handleRemoveItemFromCart(product)}>
                  Remover
                </button>
              </div>
            </Product>
          )
        })}
      </Products>

      <PriceDetail>
        <div>
          <h4>Quantidade</h4>
          <span>Valor total</span>
        </div>
        <div>
          <h3>
            {cartItems.length > 1
              ? `${cartItems.length} itens`
              : `${cartItems.length} item`}
          </h3>
          <h2>{totalPrice}</h2>
        </div>
      </PriceDetail>

      <button disabled={isFinisheButtonDisabled} onClick={handleBuyProduct}>
        Finalizar compra
      </button>
    </Container>
  )
}
