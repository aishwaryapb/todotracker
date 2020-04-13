import React from 'react';
import { mount } from 'enzyme';
import { Login } from './Login';

const props = {
    email: 'test@abc.com',
    password: 'Test@123',
    login: jest.fn(),
    signUp: jest.fn()
};

const setInput = (ele, name, value) => {
    ele.props().onChange({ target: { name, value } });
    ele.simulate('change');
}

const setEmailAndPassword = (wrapper) => {
    let email = wrapper.find('input[type="text"]');
    setInput(email, 'email', props.email);
    let password = wrapper.find('input[type="password"]');
    setInput(password, 'password', props.password);
}

const checkEmailAndPassword = () => {
    const wrapper = mount(<Login />);
    setEmailAndPassword(wrapper);

    const email = wrapper.find('input[type="text"]');
    const password = wrapper.find('input[type="password"]');

    expect(email.props().value).toBe(props.email);
    expect(password.props().value).toBe(props.password);
}

describe('Check Login Component', () => {

    it('Check email and password inputs', checkEmailAndPassword)

    it('Check login', () => {
        const wrapper = mount(<Login login={props.login} />);
        setEmailAndPassword(wrapper);
        const button = wrapper.find('button');
        button.simulate('click');
        expect(props.login).toHaveBeenCalledTimes(1);
    })

    it('Check sign up', () => {
        const wrapper = mount(<Login signUp={props.signUp} />);
        const link = wrapper.find('span');
        link.simulate('click');
        const button = wrapper.find('button');
        button.simulate('click');

        expect(button.text()).toBe('Sign Up');
        expect(props.signUp).toHaveBeenCalledTimes(1);
    })
})
