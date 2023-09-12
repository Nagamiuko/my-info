import React from "react";
import "../App.css";
import "./Home.css";
import avatar from "../assets/avatar/IMG_3761.jpg";
import profile from "../assets/avatar/IMG_5094.png";
import Nav from "../components/Nav/Nav";
import PDF from "../assets/resume_1036.pdf";
import Web from "../assets/Xenia-Seasons-Tweeting-Fall-book-follow-me.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faBriefcase,
  faPaintRoller,
  faServer,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaLine } from "react-icons/fa";
import { BiLogoSass, BiLogoMongodb } from "react-icons/bi";
import { RiJavascriptFill } from "react-icons/ri";
import { SiExpress } from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { BsFacebook, BsFillTelephoneFill, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
const HomePage = () => {
  const openPdf = () => {
    window.open(PDF);
  };
  const Link = (page) => {
    location.href = `${page}`;
  };
  return (
    <div>
      <header>
        <Nav TitleName={"Phutthisan Kongkha"} />
      </header>
      <section>
        <div className="container">
          <section>
            <div className="box-row">
              <div className="row">
                <div className="col">
                  <div className="box-img">
                    <img src={avatar} alt={avatar} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="title-name col">
                    <div className="r-c">
                      <h4>สวัสดีครับ</h4>
                    </div>
                    <div className="r-c">
                      <h1>ผมชื่อ นาย พุทธิสาร กองค้า</h1>
                    </div>
                    <div className="r-c">
                      <h3>พัฒนาเว็บไซต์ในรูปแบบหน้าบ้านเป็นหลักครับ</h3>
                    </div>
                    <div className="r-c">
                      <h3>(Frontend Developer)</h3>
                    </div>
                    <div className="r-c">
                      <div className="btn-sun">
                        <button className="btn-d" onClick={() => openPdf()}>
                          ดาวน์โหลด CV
                        </button>
                        <a href="#contact">
                          <button className="btn-c">ข้อมูลติดต่อ</button>
                        </a>
                        <button className="btn-d">
                          <BsGithub style={{ fontSize: "15px" }} /> Git
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="about">
            <div className="box-row-col">
              <div className="title">
                Get To Know More
                <h1>About Me</h1>
              </div>
            </div>
            <div className="box-row">
              <div className="row">
                <div className="col">
                  <div className="box-profile">
                    <img src={profile} alt={profile} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="title-name col">
                    <div className="row">
                      <div className="flex-gap">
                        <div className="box-exp">
                          <div className="r-c">
                            <h3>
                              <FontAwesomeIcon icon={faBriefcase} />
                            </h3>
                            <h3>ประสบการณ์</h3>
                            <h4>เคยเข้าร่วมการสอบ</h4>
                            <h4>การเป็นนักพัฒนาระบบ </h4>
                            <h4>โปรแกรมเมอร์ ระดับ 3 ของ บริษัท TPQI</h4>
                            <h4>สถาบันคุณวุติวิชาชีพ</h4>
                          </div>
                        </div>
                        <div className="box-exp">
                          <div className="r-c">
                            <h1>
                              <FontAwesomeIcon icon={faUserGraduate} />
                            </h1>
                            <h1>การศึกษา</h1>
                            <h4>ณ ปัจจุบัน</h4>
                            <h4>กำลังศึกษาอยู่ที่มหาวิทยาลัยมหาสารคาม </h4>
                            <h4>คณะวิทยาการสารสนเทศ</h4>
                            <h4>สาขาเทคโนโลยีสารสนเทศ</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-about">
                      <div className="r-c">
                        <h4>
                          ตั้งแต่ผมเริ่มต้นเรียนการเป็น Web Developer มาได้ 2-3
                          ปี ผมก็มีความรู้สึกชอบมัน
                        </h4>
                        <h4>
                          มากยิ่งขึ้นในด้านการเขียนโปรแกรม และ
                          ภาษาค่อนข้างหลากหลาย ให้เรียกใช้ในการ
                        </h4>
                        <h4>
                          เขียนแต่ส่วนใหญ่ผมใช้ JavaScript, html, CSS
                          เพื่อเขียนหน้าเว็บ
                        </h4>
                        <h4>
                          ส่วนที่ผมชอบสุดคงเป็น React JS เพราะ เป็น framework
                          ที่เรียนรู้ได้ง่ายและสะดวก
                        </h4>
                        <h4>
                          มากสำหลับทำ web frontend และ การติดต่อกับ API ต่างๆ
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="experience">
            <div className="box-row-col">
              <div className="title">
                Explore My
                <h1>Experience</h1>
              </div>
            </div>
            <div className="box-row">
              <div className="row">
                <div className="flex-gap">
                  <div className="box-exp">
                    <div className="r-c">
                      <h1 style={{ fontSize: "2rem" }}>
                        <FontAwesomeIcon icon={faPaintRoller} /> Frontend
                        Developer
                      </h1>
                    </div>
                    <div className="row flex-w">
                      <div className="r-c font-xl">
                        <h1>
                          <FaHtml5 style={{ fontSize: "2rem" }} /> HTML
                        </h1>
                        <h1>
                          <FaReact style={{ fontSize: "2rem" }} /> React JS
                        </h1>
                        <h1>
                          <RiJavascriptFill style={{ fontSize: "2rem" }} />{" "}
                          JavaScript
                        </h1>
                      </div>
                      <div className="r-c font-xl">
                        <h1>
                          <FaCss3Alt style={{ fontSize: "2rem" }} /> CSS
                        </h1>
                        <h1>
                          <BiLogoSass style={{ fontSize: "2rem" }} /> SASS
                        </h1>
                        <h1>-</h1>
                      </div>
                    </div>
                  </div>
                  <div className="box-exp">
                    <div className="r-c">
                      <h1 style={{ fontSize: "2rem" }}>
                        <FontAwesomeIcon icon={faServer} /> Backend Developer
                      </h1>
                    </div>
                    <div className="row flex-w">
                      <div className="r-c font-xl">
                        <h1>
                          <FaNodeJs style={{ fontSize: "2rem" }} /> Node JS
                        </h1>
                        <h1>
                          <SiExpress style={{ fontSize: "2rem" }} /> Express JS
                        </h1>
                      </div>
                      <div className="r-c font-xl">
                        <h1>
                          <BiLogoMongodb style={{ fontSize: "2rem" }} /> MongoDB
                        </h1>
                        <h1>
                          <DiMysql style={{ fontSize: "2rem" }} /> MySQL
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="project">
            <div className="box-row-col">
              <div className="title">
                Browse My Recent
                <h1>Projects</h1>
              </div>
            </div>
            <div className="box-row">
              <div className="row">
                <div className="flex-gap">
                  <div className="box-exp">
                    <div className="row flex-center">
                      <div className="r-c">
                        <img src={Web} alt="" width={300} height={300} />
                      </div>
                    </div>
                    <div className="r-c">
                      <h4 style={{ fontSize: "1rem", color: "#00ccff" }}>
                        Web CommicBook Novels
                      </h4>
                    </div>
                    <div className="r-c">
                      <div className="btn-sun">
                        <a
                          target="_black"
                          href="https://github.com/Nagamiuko/project_final.git"
                        >
                          <button className="btn-d">GitHup</button>
                        </a>
                        <a
                          href="https://project-final-eight.vercel.app/"
                          target="_black"
                        >
                          <button className="btn-d">Live Demo</button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="contact">
            <div className="box-row-col">
              <div className="title">
                Get In Touch
                <h1>Contact Me</h1>
              </div>
            </div>
            <div className="box-row">
              <div className="row">
                <div className="flex-gap">
                  <div className="box-exp">
                    <div className="r-c">
                      <h4 style={{ fontSize: "1rem", color: "#474747dd" }}>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          style={{ fontSize: "2.2rem" }}
                        />{" "}
                        <a href="mailto:puttisan.7353@gmail.com">
                          puttisan.7353@gmail.com
                        </a>
                      </h4>
                    </div>
                  </div>
                  <div className="box-exp">
                    <div className="r-c">
                      <h4 style={{ fontSize: "1rem", color: "#474747dd" }}>
                        <BsFacebook style={{ fontSize: "2rem" }} />{" "}
                        <a
                          href="https://web.facebook.com/Miyalodont/"
                          target="_blck"
                        >
                          Masaoli Tisan
                        </a>
                      </h4>
                    </div>
                  </div>
                  <div className="box-exp">
                    <div className="r-c">
                      <h4 style={{ fontSize: "1rem", color: "#474747dd" }}>
                        <FaLine style={{ fontSize: "2rem" }} /> Line ID :
                        tisan_retrun
                      </h4>
                    </div>
                  </div>
                  <div className="box-exp">
                    <div className="r-c">
                      <h4 style={{ fontSize: "1rem", color: "#474747dd" }}>
                        <BsFillTelephoneFill style={{ fontSize: "1.8rem" }} /> :
                        0628607353
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
