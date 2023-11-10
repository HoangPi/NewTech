export const StudentNavBar = () => {
    return (
        <nav style={{ alignContent: 'center' }} class="navbar navbar-expand-lg navbar-light bg-light">
            <div style={{ width: '85%' }} class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a href="/viewmythesis">
                    <button class="btn btn-outline-success" type="submit"  style={{marginRight:'25px'}}>View Thesis</button>
                </a>
                <a href="/editstudentprofile">
                    <button class="btn btn-outline-success" type="submit">Edit Profile</button>
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul style={{ marginLeft: '90%', marginRight: 0 }} class="navbar-nav me-auto mb-2 mb-lg-0">
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <a href="/signup">
                                <button type="button" class="btn btn-success" href='/signup'>Log out</button>
                            </a>
                        </div>
                    </ul>

                </div>
            </div>
        </nav>
    )
}