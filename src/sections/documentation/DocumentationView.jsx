import { Box, Container } from '@mui/material';
import Logo from 'src/components/logo';

function DocumentationView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        // position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 7,
            maxWidth: 'auto',
            mx: 'auto',
            // my: 2,
            display: 'flex',
            minHeight: '100vh',
            // textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div>
            <h1>API Documentation:</h1>

            <h2>1. Add New User</h2>
            <p>
              <strong>Endpoint:</strong> <code>POST /api/endpoints/new</code>
            </p>
            <p>
              <strong>Description:</strong> Adds a new user to the database after verifying the
              provided hashed key and validating required fields.
            </p>
            <p>
              <strong>Request Body:</strong>
            </p>
            <pre>
              {JSON.stringify(
                {
                  fname: 'First name of the user',
                  lname: 'Last name of the user',
                  dob: 'Date of birth of the user',
                  gender: 'Gender of the user',
                  email: 'Email address of the user',
                  companyId: 'Company ID associated with the user',
                  key: 'Hashed key for authorization',
                },
                null,
                2
              )}
            </pre>
            <p>
              <strong>Responses:</strong>
            </p>
            <ul>
              <li>
                <code>200 OK</code>: Returns the created user object and user-related code (
                <code>urc</code>).
              </li>
              <li>
                <code>400 Bad Request</code>: If any required field is missing or if the user
                already exists.
              </li>
              <li>
                <code>401 Unauthorized</code>: If the hashed key is incorrect.
              </li>
              <li>
                <code>500 Internal Server Error</code>: If an error occurs during the process.
              </li>
            </ul>

            <h2>2. Update User Status</h2>
            <p>
              <strong>Endpoint:</strong> <code>POST /api/endpoints/update</code>
            </p>
            <p>
              <strong>Description:</strong> Updates the status of an existing user after verifying
              the provided hashed key and validating required fields.
            </p>
            <p>
              <strong>Request Body:</strong>
            </p>
            <pre>
              {JSON.stringify(
                {
                  key: 'Hashed key for authorization',
                  role: 'Role of the user making the request',
                  submissionId: 'ID of the submission to update',
                  userId: 'ID of the user whose status is to be updated',
                  status: 'New status to be applied to the user',
                  note: 'Note attached to the status update (optional)',
                  companyId: 'Company ID associated with the user',
                },
                null,
                2
              )}
            </pre>
            <p>
              <strong>Responses:</strong>
            </p>
            <ul>
              <li>
                <code>200 OK</code>: Returns the updated submission and user objects.
              </li>
              <li>
                <code>400 Bad Request</code>: If required fields are missing, if the new status is
                invalid, or if the user&aposs current status does not allow an update.
              </li>
              <li>
                <code>401 Unauthorized</code>: If the hashed key is incorrect.
              </li>
              <li>
                <code>500 Internal Server Error</code>: If an error occurs during the process.
              </li>
            </ul>

            <h2>3. Get All Users</h2>
            <p>
              <strong>Endpoint:</strong> <code>POST /api/endpoints/users</code>
            </p>
            <p>
              <strong>Description:</strong> Retrieves all users associated with the given company ID
              after verifying the provided hashed key.
            </p>
            <p>
              <strong>Request Body:</strong>
            </p>
            <pre>
              {JSON.stringify(
                {
                  companyId: 'Company ID for which to retrieve users',
                  key: 'Hashed key for authorization',
                },
                null,
                2
              )}
            </pre>
            <p>
              <strong>Responses:</strong>
            </p>
            <ul>
              <li>
                <code>200 OK</code>: Returns a list of user objects associated with the given
                company ID.
              </li>
              <li>
                <code>401 Unauthorized</code>: If the hashed key is incorrect.
              </li>
              <li>
                <code>500 Internal Server Error</code>: If an error occurs during the process.
              </li>
            </ul>

            <h2>4. Get User Details </h2>
            <p>
              <strong>Endpoint:</strong> <code>POST /api/endpoints/user</code>
            </p>
            <p>
              <strong>Description:</strong> Retrieves all users associated with the given company ID
              after verifying the provided hashed key.
            </p>
            <p>
              <strong>Request Body:</strong>
            </p>
            <pre>
              {JSON.stringify(
                {
                  companyId: 'Company ID for which to retrieve users',
                  key: 'Hashed key for authorization',
                  userId: 'User ID for which to retrieve details',
                },
                null,
                2
              )}
            </pre>
            <p>
              <strong>Responses:</strong>
            </p>
            <ul>
              <li>
                <code>200 OK</code>: Returns a list of user objects associated with the given
                company ID.
              </li>
              <li>
                <code>401 Unauthorized</code>: If the hashed key is incorrect.
              </li>
              <li>
                <code>500 Internal Server Error</code>: If an error occurs during the process.
              </li>
            </ul>

            <h2>5. Delete a user by ID </h2>
            <p>
              <strong>Endpoint:</strong> <code>POST /api/endpoints/delete</code>
            </p>
            <p>
              <strong>Description:</strong> Deletes a user by ID after verifying the provided hashed
              key.
            </p>
            <p>
              <strong>Request Body:</strong>
            </p>
            <pre>
              {JSON.stringify(
                {
                  companyId: 'Company ID for which to delete a user',
                  key: 'Hashed key for authorization',
                  userId: 'User ID for which to delete',
                },
                null,
                2
              )}
            </pre>
            <p>
              <strong>Responses:</strong>
            </p>
            <ul>
              <li>
                <code>200 OK</code>: User deleted successfully.
              </li>
              <li>
                <code>401 Unauthorized</code>: If the hashed key is incorrect.
              </li>
              <li>
                <code>500 Internal Server Error</code>: If an error occurs during the process.
              </li>
            </ul>
          </div>

          {/* <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </Box> */}
        </Box>
      </Container>
    </>
  );
}

export default DocumentationView;
