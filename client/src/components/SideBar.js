import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';

function SideBar({ user, setUser }) {
  return (
    <Menu vertical style={{ position: 'sticky', top: '25%' }}>
      <Menu.Item>hi</Menu.Item>
      <Image
        src={user.profile_pic}
        as='a'
        size='30px'
        href={user.uri}
        target='_blank'
      />
    </Menu>
  );
}

export default SideBar;
