import { useRouter } from "next/router"

export default function Product() {
  const router = useRouter()
  const { id } = router.query

  return (
    <h1>Produto encontrado: {id}</h1>
  )
}
