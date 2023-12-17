import { signOut } from "../api/apiColections"
import React, { useEffect } from 'react';
import './style.css'
import { useNavigate } from "react-router-dom"
import img1 from "../public/images/annouce-1.png"
import img2 from "../public/images/annouce-2.png"
import img3 from "../public/images/annouce-3.png"
import flagIcon from "../public/images/ic_flag.svg"
import chevronRightIcon from "../public/images/ic-chevronRight.svg"
const data = [
    {
        id: 1,
        title: "Kế hoạch đăng ký",
        detail: "ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.orem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.",
        createdAt: "2022-11-22",
        author: "Nguyen Van A",
        img: img1
    },
    {
        id: 2,
        title: "Kế hoạch đăng ký",
        detail: "ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.",
        createdAt: "2022-11-22",
        author: "Nguyen Van A",
        img: img2
    },
    {
        id: 3,
        title: "Kế hoạch đăng ký",
        detail: "ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.",
        createdAt: "2022-11-22",
        author: "Nguyen Van A",
        img: img3
    },
    {
        id: 4,
        title: "Kế hoạch đăng ký",
        detail: "ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.",
        createdAt: "2022-11-22",
        author: "Nguyen Van A",
        img: img1
    },
    {
        id: 5,
        title: "Kế hoạch đăng ký",
        detail: "ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quidem.",
        createdAt: "2022-11-22",
        author: "Nguyen Van A",
        img: img2
    }
]

export const InstructorNavBar = () => {
    const navigate = useNavigate()
    const handleSignOut = () => {
        signOut()
            .then((result) => {
                result ? navigate('/') : alert("Internal error, please try again")

            })
    }
    const handleFlexDirection = (index) => {
        if (index % 2 === 0) {
            return ""
        }
        else if (index % 2 !== 0) {
            return "flex-row-reverse"
        }
    }
    useEffect(() => {
        if (window.location.pathname === '/instructorprofile' || window.location.pathname === '/instructorhomepage') {
            console.log()
            const announcementDiv = document.getElementById('Announcement');
            if (announcementDiv) {
                // Hiển thị nội dung tương ứng trên trang chủ
                announcementDiv.style.display = 'block';
            } else{
                announcementDiv.style.display= 'none';
            }
        }
    }, []);
    return (
        <>
            <div className="d-flex flex-column " style={{alignItems: "center"}}>   
                <nav class="navbar bg-body-tertiary ">
                    <div class="container-fluid shadow-sm">
                        <div class="px-3 py-3 d-flex justify-content-center flex-column">
                                <div className='banner'>
                                </div>
                                <div class="navbar-dark bg-primary navigation">
                                    <a class="item btn btn-primary navbar-brand fs-3" href="/instructorhomepage">Instructor</a>
                                    <button class="item btn-primary btn navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                            </div>
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
                                        <a href="/defensedate">
                                            <button className="btn bg-transparent fs-6 px-0" type="submit">Defense dates</button>
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
                <div id="Announcement" className='Announcement'>
                                <div className="w-100 containerWrapper">
                                    <div className="container">
                                        <div className="infoContainer w-100">
                                            <h3>Announcement</h3>
                                            <div className={`w-100 infoContainerLeft`}>
                                                <div className="infoCard">
                                                    {data?.map((item, index) => {
                                                        return (
                                                            <div key={index} className="w-100">
                                                                <div className={`infoCardItem d-flex ${handleFlexDirection(index)}`}>
                                                                    <div className={`infoCardItemImage`}>
                                                                        <img src={item?.img} alt="notifyImg" />
                                                                    </div>
                                                                    <div className={`infoCardItemContent`}>
                                                                        <div className={`w-100 infoCardItemContentHeader d-flex`}>
                                                                            <div className={`infoCardItemContentHeaderHosting d-flex`}>
                                                                                <img src={flagIcon} alt="icon" />
                                                                                {item?.createdAt}
                                                                            </div>
                                                                        </div>
                                                                        <div className={`infoCardItemContentTitle`}>
                                                                            {item?.title}
                                                                        </div>
                                                                        <div className={`infoCardItemContentDetail`}>
                                                                            {item?.detail}
                                                                        </div>
                                                                        <a className={`infoCardItemContentFooter mb-0`} href={`/announcement/${item.id}`}>
                                                                            Read more
                                                                            <img className="mx-1" src={chevronRightIcon} alt={"icon"} />
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                </div>
            </div>
        </>
    )
}