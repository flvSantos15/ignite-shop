import { useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import logoImg from '../../assets/logo.svg'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoIosArrowBack } from 'react-icons/io'

import { Container } from './style'
import { CartContext } from '../../context/CartContext'

export function Header() {
  const router = useRouter()
  const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext)

  const handleOpenCart = () => {
    setIsCartOpen(isCartOpen === 'isOpen' ? 'isClosed' : 'isOpen')
  }

  const isHomePage = router.pathname === '/'

  return (
    <Container>
      <div className="logo">
        {!isHomePage && (
          <button onClick={router.back}>
            <IoIosArrowBack color="#8D8D99" size="1.5rem" />
          </button>
        )}
        <Image src={logoImg} alt="" />
      </div>
      <div className="cart" onClick={handleOpenCart}>
        <HiOutlineShoppingBag size="2.5rem" color="#8D8D99" />
        {cartItems.length > 0 && <div>{cartItems.length}</div>}
      </div>
    </Container>
  )
}
