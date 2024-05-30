import styled from "styled-components"

const MissingRoute = () => {
  return (
    <NotFound>
        <h1>404 page not found</h1>
    </NotFound>
    
  )
}

export default MissingRoute

const NotFound = styled.main`
    height: 100vh;

    h1 {
        margin: 2rem;
    }

`