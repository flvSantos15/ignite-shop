import Stripe from 'stripe'

const StripePublicKey = process.env.NEXT_STRIPE_SECRET_KEY as string

export const stripe = new Stripe(StripePublicKey, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop'
  }
})
