import { useEffect, useRef, useState } from 'react';
import gsap from '../animations/gsapSetup';
import SMA from '../assets/school/SMA.JPG';

export default function Education() {

    const timeline = [
        {
            title: 'STIE BINA KARYA',
            listItem: ['Address : Tebing Tinggi', 'Year : 2021 - 2025', 'Average Value : 3.71'],
            link: 'https://maps.app.goo.gl/UEHebYC8fWGBJacs8',
            img: SMA
        },
        {
            title: 'SMA NEGERI 1 DOLOK BATU NANGGAR',
            listItem: ['Address : Serbelawan', 'Year : 2018 - 2021', 'Average Value : 8.5'],
            link: 'https://maps.app.goo.gl/ZLrjBMjs7AG5Zs6U7',
            img: SMA
        },
        {
            title: 'SMP NEGERI 1 DOLOK BATU NANGGAR',
            listItem: ['Address : Serbelawan', 'Year : 2015 - 2018', 'Average Value : 8.5'],
            link: 'https://maps.app.goo.gl/YYPVnFmUVe9CeazQ7',
            img: SMA
        },
        {
            title: 'SD NEGERI 091600',
            listItem: ['Address : Dolok Merangir', 'Year : 2009 - 2015', 'Average Value : 80'],
            link: 'https://maps.app.goo.gl/K4dx1wpnnguy9ohq5',
            img: SMA
        },
    ]

    useEffect(() => {
        gsap.utils.toArray('.timeline-content').forEach((myEdu, indexEdu) => {
            gsap.fromTo(myEdu,
                {
                    x: indexEdu % 2 === 0 ? -300 : 300,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    ease: "power4.out",
                    duration: 2,
                    scrollTrigger: {
                        trigger: myEdu,
                        start: "top 90%",
                        once: true,
                    }
                }
            );
            myEdu.addEventListener("mouseenter", () => {
                gsap.to(myEdu, {
                    y: -10,
                    duration: 1,
                    ease: "power4"
                });
            });
            myEdu.addEventListener("mouseleave", () => {
                gsap.to(myEdu, {
                    y: 1,
                    duration: 1,
                    ease: 'power4'
                });
            });
        });
    })

    const [activeIndex, setActiveIndex] = useState(null);
    const fotoRef = useRef([]);
    const handleToggle = (index) => {
        setActiveIndex((prev) => (
            prev === index ? null : index));
    };

    return (
        <>
            <div className="timeline-heading">
                <h4>Education History</h4>
            </div>
            <section className="timeline">
                <div className="container education-section">
                    {timeline.map((edu, i) => (
                        <div className="timeline-item" key={i}>
                            <div className="timeline-img"></div>
                            <div className="timeline-content js--fadeInLeft">
                                <a href={edu.link} target="_blank" rel="noopener noreferrer">
                                    <h2>{edu.title}</h2>
                                </a>
                                {edu.listItem.map((item, j) => (
                                    <p key={j}>{item}</p>

                                ))}
                                <img
                                    src={edu.img}
                                    //className='edu'
                                    // className={activeIndex === i ? "edu" : ""}
                                    ref={(el) => (fotoRef.current[i] = el)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}