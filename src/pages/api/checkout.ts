import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

import { ProductProps } from '../../context/CartContext'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { products } = req.body

  const productArray = products as ProductProps[]

  if (req.method !== 'POST') {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }

  if (products.length === 0) {
    res.status(400).json({
      error: 'Price not found'
    })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl, // pra onde o usuario vai depois de sucesso da compra
    cancel_url: cancelUrl, // pra onde o usuario vai se houver falha na compra
    mode: 'payment',
    line_items: productArray.map((item) => {
      return {
        price: item.defaultPriceId,
        quantity: item.quantity
      }
    })
  })

  res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
