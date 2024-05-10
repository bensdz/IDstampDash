import { Helmet } from 'react-helmet-async';
import EnterEmail from 'src/sections/resetpw/enteremail-view';

function ResetPwEmail() {
  return (
    <>
      <Helmet>
        <title> Reset Password </title>
      </Helmet>
      <EnterEmail />
    </>
  );
}

export default ResetPwEmail;
