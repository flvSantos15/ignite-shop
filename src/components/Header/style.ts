import { styled } from '../../styles'

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  // maxWidth: 1440,
  margin: '0 auto',

  '.logo': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',

    button: {
      display: 'flex',
      alignItems: 'center',
      padding: '1.2rem',

      backgroundColor: '#202024',
      borderRadius: '6px',
      cursor: 'pointer',
      border: 'none',

      '&:hover': {
        opacity: 0.7
      }
    }
  },

  '.cart': {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    width: '65px',
    gap: '0',
    // gap: '0.75rem',

    backgroundColor: '#202024',
    borderRadius: '6px',
    cursor: 'pointer',

    '&:hover': {
      opacity: 0.7
    },

    div: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
      gap: '8px',

      // position: 'absolute',
      width: '28px',
      height: '28px',
      marginTop: '-3.5rem',
      marginRight: '-1.5rem',
      // right: '70px',
      // top: '20px',

      background: '$green500',

      border: '3px solid #121214',
      borderRadius: '1000px'
    }
  }
})
