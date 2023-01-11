import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body

  if (req.method !== 'POST') {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }

  if (!priceId) {
    res.status(400).json({
      error: 'Price not found'
    })
  }

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl, // pra onde o usuario vai depois de sucesso da compra
    cancel_url: cancelUrl, // pra onde o usuario vai se houver falha na compra
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })

  res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
