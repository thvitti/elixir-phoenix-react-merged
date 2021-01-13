import styled from 'styled-components';


export const LogoImage = styled.img`
    max-width: 168px;


    @media(max-width: 800px){
    max-width: 105px;
    }
`

export const MenuWrapper = styled.nav`
    width: 100%;
    height: 94px;
    z-index: 20;

    position: fixed;
    top: 0;
    left:0;
    padding-left: 5%;
    padding-right: 5%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: var(--black);
    border-bottom: 2px solid var(--primary);

    @media(max-width: 800px){
      flex-direction: column;
      height: auto;
      padding: 20px;
    }
`
