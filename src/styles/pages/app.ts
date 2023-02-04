import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
  paddingBottom: '2rem'
})

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',

  padding: '2rem 0',
  width: '100%',
  // maxWidth: 1180,
  maxWidth: 1440,
  margin: '0 auto',

  div: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    width: '65px',
    gap: '0',
    // gap: '0.75rem',

    backgroundColor: '#202024',
    borderRadius: '6px',

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

      background: '#00875F',

      border: '3px solid #121214',
      borderRadius: '1000px'
    }
  }
})
