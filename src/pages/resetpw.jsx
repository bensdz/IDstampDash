import { Helmet } from 'react-helmet-async';
import ResetPwView from 'src/sections/resetpw/resetpw-view';

function ResetPw() {
  return (
    <>
      <Helmet>
        <title> Reset Password </title>
      </Helmet>
      <ResetPwView />
    </>
  );
}

export default ResetPw;
