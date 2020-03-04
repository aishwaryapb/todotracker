import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.bgColor};
    display: flex;
    flex-direction: column;
`;

export const NavBar = styled.div`
    background-color: transparent;
    height: ${props => props.theme.navBarHeight}vh;
    display: flex;
    flex-direction: row;
`;

export const Logo = styled.img.attrs(props => ({
    src: props.src
}))`
    height: ${props => props.theme.navBarHeight - 1}vh;
    width: auto;
    padding: 0.5vh 2vw;
`;

export const Menu = styled.div`
    height: ${props => props.theme.navBarHeight / 2}vh;
    text-align: right;
    width: 100%;
    padding: ${props => props.theme.navBarHeight / 4}vh 2vw;
`;

export const MenuItem = styled(Link).attrs(props => ({
    to: props.path
}))`
    color: ${props => props.theme.primaryColor};
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
    text-decoration: none;
    margin: auto 2vw;
    font-size: ${props => props.theme.large}px
`;

export const Button = styled.button.attrs(props => ({
    type: props.type ?? 'button'
}))`
    background-color: ${props => props.theme.primaryColor};
    color: white;
    font-size: ${props => props.theme.small}px;
    border: none;
    padding: 4px 15px;
    margin: ${props => `${props.vm ? props.vm : 0}vh ${props.hm ? props.hm : 0}vw`};
    min-width: 10vw;
    min-height: 6vh;
    border-radius: 5px;
    &:focus {
        outline: none;
    }

    &:hover {
        outline: 3px solid white;
        cursor: pointer;
    }
`;

export const LoginContainer = styled.div`
    height: ${props => 100 - props.theme.navBarHeight}vh;
    dispay: flex;
    flex-direction: column;
    padding: 10vh 30vw;
    text-align: center;
`;

export const Input = styled.input.attrs(props => ({
    type: props.type,
    placeholder: props.placeholder
}))`
    height: 10vh;
    width: 38vw;
    border-radius: 30px;
    background-color: white;
    color: black;
    border: none;
    margin: 4vh 0;
    padding-left: 2vw;
    font-size: ${props => props.theme.medium}px;

    ::placeholder {
        color: #D9D9D8;
        font-size: ${props => props.theme.medium}px;
    }

    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.primaryColor};
    }
`;

export const Right = styled.div`
    width: 100%;
    text-align: right;
`;

export const Center = styled.div`
    width: 100%;
    text-align: center;
`;

const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

export const Loader = styled.div`
    border: 16px solid #FFFFFF;
    border-radius: 50%;
    border-top: 16px solid #F4976C;
    width: 50px;
    height: 50px;
    animation: ${spin} 2s linear infinite;
    margin: ${props => props.top ? props.top + 'vh' : "auto"} auto;
`;

export const Error = styled.div`
    background-color: #f44336;
    border-radius: 2px;
    color: white;
    width: 50%;
    height: 30px;
    margin: auto;
    padding-top: 2vh;
    font-size: 14px;
`;