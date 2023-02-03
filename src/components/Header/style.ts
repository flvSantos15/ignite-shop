import { styled } from '../../styles'

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  div: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    gap: '0.75rem',
    cursor: 'pointer',

    backgroundColor: '#202024',
    borderRadius: '6px',

    div: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
      gap: '8px',

      position: 'absolute',
      width: '28px',
      height: '28px',
      right: '70px',
      top: '20px',

      background: '$green500',

      border: '3px solid #121214',
      borderRadius: '1000px'
    }
  }
})
