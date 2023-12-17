import { signOut } from "../api/apiColections"
import { useNavigate } from "react-router-dom"

export const InstructorNavBar = () => {
    const navigate = useNavigate()
    const handleSignOut = () => {
        signOut()
            .then((result) => {
                result ? navigate('/') : alert("Internal error, please try again")

            })
    }

    return (
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container-fluid shadow-sm">
                <a class="navbar-brand fs-3" href="/instructorhomepage">Instructor</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end " style={{ width: '300px' }} tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    
                    <div class="offcanvas-header border-bottom border-black border-2">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Homepage</h5>
                        <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            
                            <li class="nav-item">
                                <a href="/instructorhomepage">
                                    <button className="btn bg-transparent fs-6 px-0" type="button">Home</button>
                                </a>
                            </li>
                            
                            <li class="nav-item">
                                <a href="/addthesis">
                                    <button className="btn bg-transparent fs-6 px-0" type="submit">Add Thesis</button>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/instructortheses">
                                    <button className="btn bg-transparent fs-6 px-0" type="submit">Thesis</button>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/instructorprofile">
                                    <button className="btn bg-transparent fs-6 px-0" type="submit">Profile</button>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/proposethesis">
                                    <button className="btn bg-transparent fs-6 px-0" type="submit">Propose thesis</button>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/pendingtheses">
                                    <button className="btn bg-transparent fs-6 px-0" type="submit">Pending theses</button>
                                </a>
                            </li>
                            <li class="nav-item">
                                    <a href="#">
                                        <button className="btn bg-transparent fs-6 px-0 " type="button" onClick={handleSignOut}>Sign out</button>
                                    </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}