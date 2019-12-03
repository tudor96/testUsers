import React from 'react'
import {render} from '@testing-library/react'
import User from './components/User'

test('rerender the element with same props test', () => {
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
    
    const {container, rerender} = render(<User {...props} />)
    expect(container.textContent).toBe("Name Remove User");
    rerender(<User {...props} />)
    expect(container.textContent).toBe("Name Remove User");
  })