import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Portal( {employeeData} ) {
  const navigate = useNavigate();

  const navigateRestrictedWebpage = () => {
    // navigate to /restricted
    navigate('/restricted', { replace: true });
  };

  return (
    <>
      {employeeData?.role === 'MANAGER'? (
        <section>
          <h1>Welcome, {employeeData.firstName} {employeeData.lastName} ({employeeData.role.charAt(0) + employeeData.role.substring(1).toLowerCase()})</h1>
          <br/>
          <p>
            <Button variant="link" onClick={navigateRestrictedWebpage}>Restricted Webpage</Button>
          </p>
          <br/>
          <p>
            <a href="/login">
              <Button className='button' variant="light" type='submit'>Logout</Button>
            </a>
          </p>
        </section>
      ) : (  
        <section>
          <h1>Welcome, {employeeData.firstName} {employeeData.lastName} ({employeeData.role.charAt(0) + employeeData.role.substring(1).toLowerCase()})</h1>
          <br/>
          <p>
          <a href="/login">
            <Button className='button' variant="light" type='submit'>Logout</Button>
          </a>
          </p>
        </section>
    )}
    </>
  )
}

export default Portal;