import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
  const router = useRouter()
  const { id } = router.query

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 65,39</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aspernatur rerum, fugiat dolor voluptatibus ad dolore unde.
          Quia ut exercitationem hic ex voluptatem eligendi quis voluptas
          illum cumque distinctio, earum quasi.
        </p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}
