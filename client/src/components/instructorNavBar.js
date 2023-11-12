import { signOut } from "../api/apiColections"
import { useNavigate } from "react-router-dom"

export const InstructorNavBar = () => {
    const navigate = useNavigate()
    const handleSignOut =()=>{
        signOut()
            .then((result)=>{
                result ? navigate('/') : alert("Internal error, please try again")
                
            })
    } 

    return (
        <nav style={{ alignContent: 'center' }} class="navbar navbar-expand-lg navbar-light bg-light">
            <div style={{ width: '85%' }} class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <a href="/viewmythesis">
                                <button class="btn btn-outline-success" type="submit" style={{ marginRight: '25px' }}>Thesis</button>
                            </a>
                        </div>
                    </ul>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <a href="/instructorprofile">
                                <button class="btn btn-outline-success" type="submit">Profile</button>
                            </a>
                        </div>
                    </ul>
                    <ul style={{ marginLeft: '90%', marginRight: 0 }} class="navbar-nav me-auto mb-2 mb-lg-0">
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-success" onClick={handleSignOut}>Sign out</button>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}