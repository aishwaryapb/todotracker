import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { mib, mxb } from './breakpoints';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.bgColor};
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify || ''}
`;

export const Col = styled.div`
    background-color: ${props => props.bg || ''};

    @media ${mxb.tablet} {
        width: ${props => props.m || 'auto'}
    }   

    @media ${mib.laptop}, ${mib.laptopL} {
        width: ${props => props.lg || 'auto'}
    }
`;

export const NavBar = styled.div`
    background-color: transparent;
    height: ${props => props.theme.navBarHeight}vh;
    display: flex;
    flex-direction: row;

    @media ${mxb.mobileL} {
        height: 8vh;
    }
`;

export const Logo = styled.img.attrs(props => ({
    src: props.src
}))`
    height: ${props => props.theme.navBarHeight - 1}vh;
    width: auto;
    padding: 0.5vh 2vw;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        height: 8vh;
    }
`;

export const Menu = styled.div`
    height: ${props => props.theme.navBarHeight / 2}vh;
    text-align: right;
    width: 100%;
    padding: ${props => props.theme.navBarHeight / 4}vh 2vw;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        padding-top: 2vh;
    }

    @media ${mxb.mobileL} {
        display:none;
    }

`;

export const MobileMenu = styled.div`
    display:none;
    flex-direction: column;
    padding: 1vh 1vw;
    background-color: ${props => props.theme.primaryColor};
    color: white;
    justify-content: center;
    align-items: center;

    @media ${mxb.mobileL} {
        display: flex;
    }
`;

export const MobileMenuIcon = styled.div`
    text-align: right;
    width: 55%;
    padding: 3vh;
    display: none;
    color: ${props => props.theme.primaryColor};
    
    @media ${mxb.mobileL} {
        display: block;
    }
`;

export const MenuItem = styled(Link).attrs(props => ({
    to: props.path
}))`
    color: ${props => props.theme.primaryColor};
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
    text-decoration: none;
    margin: auto 2vw;
    font-size: ${props => props.theme.large}px;

    @media ${mxb.mobileL} {
        color: white;
        margin: 2vh 0;
        text-decoration: ${props => props.selected ? 'underline' : 'none'};
        font-size: ${props => props.theme.small}px;
    }
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

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        min-width: 15vw;
    }

    @media ${mxb.iPadPro} {
        font-size: ${props => props.theme.medium}px;
    }
`;

export const LoginContainer = styled.div`
    height: ${props => 100 - props.theme.navBarHeight}vh;
    dispay: flex;
    flex-direction: column;
    padding: 10vh 30vw;
    text-align: center;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        padding: 10vh 15vw;
    }
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

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        width: 97%;
    }

    @media ${mxb.iPadPro} {
        font-size: ${props => props.theme.large}px;
    }
`;

export const Right = styled.div`
    width: ${props => `${props?.width}vw` || '100%'};
    text-align: right;
`;

export const Center = styled.div`
    width: 100%;
    text-align: center;
    overflow-y: ${props => props.overflow?.y || "auto"};
    overflow-x: ${props => props.overflow?.x || "auto"};
`;

export const Middle = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const DragContainer = styled.ul`
    color: black;
    list-style: none;
    margin: 0 auto;
    display: ${props => props.type};
    text-align: center;
    width: max-content;
    padding: 0;
`;

const slide = keyframes`
	0% {
        transform: translateX(-5%);
        opacity: 0.1;
    }
    50% {
        opacity: 0.3;
    }
	100% {
        transform:translateX(100%);
        opacity: 0.1;
    }
`;

export const DragList = styled.li`
    position: relative;
    background-color: ${props => props.toggled ? props.theme.green : 'white'};
    color: ${props => props.toggled ? 'white' : 'black'};
    padding: 1vh 1vw;
    display: flex;
    align-items: center;
    margin-bottom: 2vh;
    min-height: 5vh;
    width: ${props => props.width ? (props.width + "vw") : "auto"};

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        padding: 1vh 1.5vw;
        width: ${props => props.width ? "52vw" : "auto"};
        min-height: 3vh;
    }

    &:after {
        display: ${props => props.isLoading ? 'block' : 'none'};
        content:'';
        top:0;
        transform:translateX(-5%);
        width: 50%;
        height: 100%;
        position: absolute;
        animation: ${slide} 1s infinite;
        background: ${props => props.toggled ? 'white' : props.theme.green};
    }

    &:hover {
        border-bottom: ${props => props.isSelectable ? `4px solid ${props.theme.yellow}` : ''};
    }

`;

export const DraggableItem = styled.div`
    margin-right: 2vw;
    font-size: ${props => props.theme.medium}px;
`;

export const ItemContent = styled.div`
    text-align: justify;
    min-width: 80%;
    font-size: 16px;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        font-size: ${props => props.theme.medium}px;
    }
`;

export const CategoriesContainer = styled.div`
    margin: 5vh auto;
    width: 50vw;
    padding: 5vh 5vw;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        width: 60vw;
    }
`;

export const ListInput = styled.input.attrs(props => ({
    type: props.type,
    placeholder: props.placeholder
}))`
    background-color: white;
    color: black;
    border: none;
    width: ${props => props.width}%;
    min-height: 5vh;
    padding: 1vh 1vw;
    font-size: ${props => props.theme.xSmall}px;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        font-size: ${props => props.theme.medium}px;
        width: ${props => props.width < 75 ? '49vw' : `${parseInt(props.width) + 1}%`};
        min-height: 3vh;
    }
`;

export const TrackerContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 85vw;
    height: 80vh;
    margin: auto;
    margin-top: 6vh;
    overflow-y: auto;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        width: 95vw;
    }
`;

export const CategoriesTracker = styled.div`
    margin: 2vh;
    margin-right: 0;
    width: 20vw;
    height: auto;
    display: flex;
    flex-direction: column;
`;

export const TasksContainer = styled.div`
    margin: 2vh;
    margin-left: 0;
    width: 65vw;
    height: auto;
    background-color: ${props => props.isCompleted ? props.theme.green : props.theme.yellow};
    text-align: center;
    padding: 3vh 0;
    overflow-y: auto;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        width: 75vw;
    }
`;

export const Tile = styled.div`
    margin: ${props => props.isSelected ? "0" : "auto"};
    width: ${props => props.isSelected ? "100%" : "60px"};
    height: ${props => props.isSelected ? "100px" : "auto"};
    background-color: ${props => props.isCompleted ? props.theme.green : (props.isSelected ? props.theme.yellow : props.theme.secondaryColor)};
    color: white;
    font-size: ${props => props.isSelected ? props.theme.xLarge : props.theme.large}px;
    font-weight: 800;
    text-align: center;
    line-height: ${props => props.isSelected ? "100px" : "60px"};

    &:hover {
        cursor: pointer;
    }
`;

export const Connector = styled.div`
    opacity: 80%;
    margin: auto;
    width: 4px;
    height: 45px;
    background-color: ${props => props.theme.primaryColor};
`;

export const CategoryName = styled.div`
    color: font;
    margin-bottom: 4vh;
    font-size: ${props => props.theme.large}px;
    font-weight: 800;
`;

const slideDown = keyframes`
    from {
        top:-60vh;
        opacity:0
    }
    to {
        top:0;
        opacity:1
    }
`;

export const ModalContainer = styled.div`
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.8);

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        padding-top: 300px;
    }
`;

export const ModalContent = styled.div`
    position: relative;
    background-color: white;
    margin: auto;
    padding: 0;
    width: 40%;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    animation: ${slideDown} 0.5s ease-in-out;    

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        width: 60%
    }
`;

export const ModalHeader = styled.div`
    border-radius: 10px 10px 0 0;
    padding: 2px 16px;
    background-color: ${props => props.error ? props.theme.red : props.theme.green};
    color: white;
`;

export const ModalBody = styled.div`
    padding: 5vh 5vw;
    text-align: center;

    @media ${mxb.tablet}, ${mxb.iPadPro} { 
        font-size: ${props => props.theme.medium}px;
    }
`;

export const Close = styled.span`
    color: white;
    float: right;
    font-size: ${props => props.theme.xLarge}px;
    font-weight: bold;

    &:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;
