import Image from 'next/image'
import { useContext } from 'react'

import { IoCloseSharp } from 'react-icons/io5'
import { CartContext } from '../../context/CartContext'

import { Container, Products, Product, PriceDetail } from './style'

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  const handleCloseCart = () => {
    setIsCartOpen(isCartOpen === 'isOpen' ? 'isClosed' : 'isOpen')
  }

  return (
    <Container display={isCartOpen}>
      <div className="svg">
        <IoCloseSharp size="1.5rem" onClick={handleCloseCart} />
      </div>

      <h2>Sacola de compras</h2>

      <Products>
        <Product>
          {/* <Image alt="" /> */}
          <div className="img"></div>
          <div className="frame">
            <h4>Camiseta Beyond the Limits</h4>
            <span>R$ 79,90</span>
            <p>Remover</p>
          </div>
        </Product>
        <Product>
          {/* <Image alt="" /> */}
          <div className="img"></div>
          <div className="frame">
            <h4>Camiseta Beyond the Limits</h4>
            <span>R$ 69,70</span>
            <p>Remover</p>
          </div>
        </Product>
      </Products>

      <PriceDetail>
        <div>
          <h4>Quantidade</h4>
          <span>Valor total</span>
        </div>
        <div>
          <h3>3 itens</h3>
          <h2>R$ 270,00</h2>
        </div>
      </PriceDetail>

      <button>Finalizar compra</button>
    </Container>
  )
}
