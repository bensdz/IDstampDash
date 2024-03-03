import { Helmet } from 'react-helmet-async';

import UserInfo from 'src/sections/userinfo/view/user-info-view';

function UserInfoPage() {
  return (
    <>
      <Helmet>
        <title> User Information </title>
      </Helmet>

      <UserInfo />
    </>
  );
}

export default UserInfoPage;
