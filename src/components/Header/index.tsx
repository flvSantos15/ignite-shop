import Image from 'next/image'

import logoImg from '../../assets/logo.svg'
import { HiOutlineShoppingBag } from 'react-icons/hi'

import { Container } from './style'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

export function Header() {
  const { cartProducts, setIsCartOpen, isCartOpen } = useContext(CartContext)

  const handleOpenCart = () => {
    setIsCartOpen(isCartOpen === 'isOpen' ? 'isClosed' : 'isOpen')
  }

  return (
    <Container>
      <Image src={logoImg} alt="" />
      <div onClick={handleOpenCart}>
        {cartProducts.length > 0 && <div>{cartProducts.length}</div>}
        <HiOutlineShoppingBag size="2.5rem" color="#8D8D99" />
      </div>
    </Container>
  )
}
