import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  // gap: '3rem',
  width: '100%',
  // maxWidth: 'calc(100vw - ((100vw - 1440px) / 2))',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea493 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  // cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  minWidth: 540,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  '.details': {
    display: 'flex',
    flexDirection: 'column'
  },

  '.cart-green-button': {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    gap: '0.75rem',
    cursor: 'pointer',
    border: 'none',

    backgroundColor: '$green500',
    borderRadius: '6px',

    '&:hover': {
      opacity: 0.7
    }
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.20rem',
    right: '0.20rem',
    padding: '1rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '1.25rem',
      color: '$gray100'
    },

    span: {
      fontSize: '1.5rem',
      fonWeight: 'bold',
      color: '$green300'
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})
