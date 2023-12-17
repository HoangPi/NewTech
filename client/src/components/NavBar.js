import './style.css'
import { useNavigate } from "react-router-dom"
import React, { useEffect } from 'react';
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
export const NavigationBar = () => {
    const handleFlexDirection = (index) => {
        if (index % 2 === 0) {
            return ""
        }
        else if (index % 2 !== 0) {
            return "flex-row-reverse"
        }
    }
    useEffect(() => {
        if (window.location.pathname === '/' || window.location.pathname === '/#') {
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
                <div class="navbar bg-body-tertiary">
                    <div class="px-3 py-3 d-flex justify-content-center flex-column">
                            <div className='banner'>
                            </div>
                            <div class="navbar-dark bg-primary navigation">
                                <a class="item btn-primary btn" href="#">Homepage</a>
                                <a class="item btn-primary btn" href="/signin">Login</a>
                            </div>
                    </div>
                </div>
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