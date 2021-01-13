import styled from 'styled-components';

const Button = styled.button`
  color: var(--white);
  color: red;
  border: 1px solid var(--white);
  padding: 16px 24px;
  font-size: 16px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;

  transition: opacity .5s;
  &:hover,
  &:focus{
    opacity: .5;
  }


  @media(max-width: 800px){
    /* position: flow; */
    /* flex: 25%; */
    width: 40%;
    /* left: 0;
    bottom: 0;
    right: 0; */
    /* background-color: var(--primary); */
    /* color: var(--white); */
    /* outline: 0; */
    text-align: center;
    border-radius: 5px;
    /* border: 10px; */
    padding: 5px;
    margin: 5px;
    /* border: 2px solid pink; */
  }
  `;

export default Button;
