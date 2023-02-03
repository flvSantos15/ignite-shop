import { styled } from '../../styles'

interface ContainerProps {
  isOpen: boolean
}

export const Container = styled('div', {
  variants: {
    display: {
      isOpen: { display: 'flex', flexDirection: 'column' },
      isClosed: { display: 'none' }
    }
  },

  position: 'absolute',
  width: '480px',
  height: '860px',
  // minHeight: '100vh',
  right: '0px',
  top: '0px',
  bottom: '0px',
  paddingBottom: '0px',
  paddingTop: '1rem',
  paddingLeft: '3rem',
  paddingRight: '3rem',
  // justifyContent: 'space-between',

  background: '#202024',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  '.svg': {
    display: 'flex',
    justifyContent: 'end',
    marginBottom: '0.5rem',

    svg: {
      cursor: 'pointer'
    }
  },

  h2: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '32px',

    display: 'flex',
    alignItems: 'center',

    color: '#E1E1E6'
  },

  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 32px',
    gap: '10px',

    // position: 'absolute',
    width: '384px',
    height: '69px',
    // left: 'calc(50% - 384px/2)',
    // top: '783px',

    background: '#00875F',
    color: '#fff',
    border: '0',
    borderRadius: '8px',

    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: '18px'
  }
})

export const Products = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0px',
  gap: '24px',
  marginBottom: '3rem',

  // position: absolute;
  // width: '384px',
  width: '100%'
  // minHeight: '330px'
  // left: 48px;
  // top: 136px;
})

export const Product = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0px',
  gap: '20px',

  width: '384px',
  height: '94px',

  '.img': {
    width: '101.94px',
    height: '93px',

    background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
    borderRadius: '8px'
  },

  '.frame': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    gap: '8px',

    width: '262.06px',
    height: '94px',

    h4: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: '18px',
      // lineHeight: '29',

      display: 'flex',
      alignItems: 'center',

      color: '#C4C4CC'
    },

    span: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: '18px',

      display: 'flex',
      alignItems: 'center',

      color: '#E1E1E6'
    },

    p: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
      // gap: '10px',
      cursor: 'pointer',

      width: '65px',
      // height: '26px',
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: '16px',

      color: '#00875F'
    }
  }
})

export const PriceDetail = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    h4: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: '16px',

      display: 'flex',
      alignItems: 'center',

      color: '#E1E1E6'
    },

    h3: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: '18px',

      display: 'flex',
      alignItems: 'center',
      textAlign: 'right',

      color: '#C4C4CC'
    },

    span: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: '18px',

      display: 'flex',
      alignItems: 'center',

      color: '#E1E1E6'
    },

    h2: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: '32px',

      display: 'flex',
      alignItems: 'center',
      textAlign: 'right',

      color: '#E1E1E6'
    }
  }
})
