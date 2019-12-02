import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import User from './components/User'
import { render, unmountComponentAtNode } from "react-dom";

Enzyme.configure({ adapter: new Adapter() });

test("Render test with enzyme", () => {
  const user = {
    id:1,
    name:"Name",
    count:0
  }

  function handleUserUpdate () {
  }
  function handleUserRemove () {
  }

  let props = {
    user :user,
    handleUserUpdate : handleUserUpdate,
    handleUserRemove : handleUserRemove
  }
  const Spy = jest.fn(User);
  const wrapper = Enzyme.mount(<Spy {...props}/>);
  expect(Spy).toHaveBeenCalledTimes(1)
  //update mount with same props
  wrapper.update();
  expect(wrapper.exists()).toBe(true);
  expect(Spy).toHaveBeenCalledTimes(1)
});


let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Check rerender with react-dom", () => {
  const user = {
    id:1,
    name:"Name",
    count:0
  }

  function handleUserUpdate () {
  }
  function handleUserRemove () {
  }

  let props = {
    user :user,
    handleUserUpdate : handleUserUpdate,
    handleUserRemove : handleUserRemove
  }


    const updateProps = props => render(<User {...props} />, container)
    updateProps(props)
    expect(container.textContent).toBe("Name Remove User");
    updateProps(props)
    expect(container.textContent).toBe("Name Remove User");

});