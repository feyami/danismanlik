import React, { useEffect, useState } from "react";
import { Button, ListGroup, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/Group 4.svg";
import image from "../assets/bg.jpg";
import axios from "axios";
import "../css/searchcss.css";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = ({ reting }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const branch = sp.get("branch") || "all";
  const query = sp.get("query") || "all";
  const page = sp.get("page") || 1;
  const order = sp.get("order") || "newest";
  const isTick = sp.get("isTick") || "all";
  const rating = sp.get("rating") || "all";

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterBranch = filter.branch || branch;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterIsTick = filter.isTick || isTick;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }branch=${filterBranch}&query=${filterQuery}&isTick=${filterIsTick}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  const [toggle, setToggle] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
  });

  const getStarReting = (reting) => {
    let filledStars = "";
    let emptyStars = "";
    for (let i = 0; i < reting; i++) {
      filledStars += "★";
    }
    for (let i = 0; i < 5 - reting; i++) {
      emptyStars += "☆";
    }
    return filledStars + emptyStars;
  };

  const [counter, setCounter] = useState(0);

  const handleClick = (btnIndex) => {
    setToggle({ ...toggle, [btnIndex]: !toggle[btnIndex] });
    const numClicked = Object.values({
      ...toggle,
      [btnIndex]: !toggle[btnIndex],
    }).filter((val) => val).length;
    setCounter(numClicked);
  };

  const toggleCount = Object.values(toggle).filter((val) => val).length;

  const [input, setInput] = useState({});
  const [title, setTitle] = useState({});
  const [lawyers, setLawyers] = useState([]);
  const [branchs, setBranchs] = useState([]);

  // const handleInput = (e) => {
  //   const { value, name } = e.target
  //   setInput({ ...input, [name]: value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle(input);
    setInput({});
  };

  useEffect(() => {
    axios
      .get(
        `https://danis.onrender.com/api/lawyers/search?branch=${branch}&query=${query}&isTick=${isTick}&order=${order}&rating=${rating}`
      )
      .then((response) => {
        setLawyers(response.data.lawyers);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [branch, query, isTick, order, rating]);

  useEffect(() => {
    axios
      .get("https://danis.onrender.com/api/branchs")
      .then((response) => {
        setBranchs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [branch, query, rating, order]);

  const [readMore, setReadMore] = useState(false);
  const linkName = readMore ? "Daha Az Gör " : "Daha Fazla Gör  ";
  const extraContent = (
    <p className="extra-content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, consectetur
      nequeab porro quasi culpa nulla rerum quis minus voluptatibus sed hic ad
      quo sint, libero commodi officia aliquam! Maxime.
    </p>
  );

  const [moreHour, setMoreHour] = useState(false);
  const linkHour = moreHour ? "Daha Az Saat Göster" : "Daha Fazla Saat Göster";
  const caretIcon = moreHour ? (
    <i className="fa-solid fa-caret-up fa-xl mx-2"></i>
  ) : (
    <i className="fa-solid fa-caret-down fa-xl mx-2"></i>
  );
  const [hours, setHours] = useState([
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]);

  console.log(lawyers);

  const today = new Date();
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate());
  const lastDay = new Date(today);
  lastDay.setDate(firstDay.getDate() + 3);

  const days = ["", "", "", ""];
  const [dateRange, setDateRange] = useState([firstDay, lastDay]);

  {
    /*   const handlePrevWeek = () => {
    const firstDay = new Date(dateRange[0]);
    firstDay.setDate(firstDay.getDate() - 4);

    const today = new Date();
    if (firstDay < today + 1) {
      firstDay = firstDay.setDate(today.getDate());
    }
    const lastDay = new Date(dateRange[0]);
    lastDay.setDate(lastDay.getDate() - 1);
    if (lastDay < today) {
      lastDay = new Date(today.getTime() - 1);
    }
    setDateRange([firstDay, lastDay]);
  }; */
  }
  const handlePrevWeek = () => {
    const today = new Date();
    const firstDay = new Date(dateRange[0]);
    firstDay.setDate(firstDay.getDate() - 4);

    if (firstDay < today) {
      const lastDay = new Date(dateRange[0]);
      lastDay.setDate(lastDay.getDate() - 1);
      if (lastDay < today) {
        lastDay = new Date(today.getTime() - 1);
      }
      setDateRange([firstDay, lastDay]);
    }
  };

  console.log(firstDay);

  const handleNextWeek = () => {
    const firstDay = new Date(dateRange[1]);
    firstDay.setDate(firstDay.getDate() + 1);
    const lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 3);
    setDateRange([firstDay, lastDay]);
  };

  // const selected = selected; use state kullanarak seçili saatleri üstü çizili konuma getir

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 d-flex justify-content-around align-items-center w-100"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div>
                <img src={logo} alt="" />
              </div>

              <div className="d-flex justify-content-center">
                <select
                  className="search-select"
                  value={branch}
                  name="branch"
                  onChange={(e) => {
                    navigate(getFilterUrl({ branch: e.target.value }));
                  }}
                  title="Branş Seç"
                  id="navbarScrollingDropdown"
                >
                  <option defaultValue="all">Branş Seç</option>
                  {branchs
                    ?.sort((a, b) => a.title.localeCompare(b.title))
                    .map((item) => (
                      <option key={item._id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                </select>

                <Form
                  onSubmit={handleSubmit}
                  className="d-flex w-100 search-form "
                >
                  <input
                    type="search"
                    placeholder="İsme göre ara"
                    className="w-75 search-select-input"
                    aria-label="Search"
                    id="branchs"
                    name="branchs"
                    value={query}
                    onChange={(e) => {
                      navigate(getFilterUrl({ query: e.target.value }));
                    }}
                  />
                  <button
                    type="submit"
                    variant="outline-light"
                    className="search-inputbutton w-25 "
                  >
                    Avukat Ara
                  </button>
                </Form>
              </div>
              <div className="d-flex ml-auto p-2 ">
                <button className="search-inputbutton" variant="outline-light">
                  Avukat mısınız?
                </button>
                <NavDropdown
                  className="border border-2 border-dark rounded-2 ms-3 kayıt"
                  title="KAYIT OL"
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  className="border border-2 border-dark rounded-2 ms-3 "
                  title="GİRİŞ YAP"
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="search-card-container ">
        <div className="mx-5 ">
          <p>Filtreler :</p>
          <Button
            className={
              toggle.btn1
                ? "btn btn-light btn-outline-warning rounded-5 mx-2 active"
                : "btn btn-light btn-outline-warning rounded-5 mx-2"
            }
            role="button"
            aria-pressed="true"
            onClick={() => handleClick("btn1")}
          >
            Büroda Görüşmeye Uygun
          </Button>
          <Button
            className={
              toggle.btn2
                ? "btn btn-light btn-outline-warning rounded-5 mx-2 active"
                : "btn btn-light btn-outline-warning rounded-5 mx-2"
            }
            role="button"
            aria-pressed="true"
            onClick={() => handleClick("btn2")}
          >
            Online Görüşmeye Uygun
          </Button>
          <Button
            className={
              toggle.btn3
                ? "btn btn-light btn-outline-warning rounded-5 mx-2 active"
                : "btn btn-light btn-outline-warning rounded-5 mx-2"
            }
            role="button"
            aria-pressed="true"
            onClick={() => handleClick("btn3")}
          >
            Teyit Edilmiş
          </Button>
          <Button
            className="btn btn-light btn-outline-warning rounded-5 mx-2"
            role="button"
            aria-pressed="true"
            onClick={() => handleClick("btn4")}
          >
            Daha Fazla Filtre{" "}
            <span className="btn rounded-5 active counter">{counter}</span>
          </Button>
        </div>
        <div className="w-50 m-5">
          <h2 className="mb-4">
            {" "}
            {Object.keys(title).length ? `${title?.branch} Avukatı` : ""}{" "}
          </h2>
          <p>
            Aramanızla eşleşen {lawyers.length} {branch} avukatı mevcut.
            Listelenen avukatlar Online Görüşmeye Uygundur ve Baro Kaydı kontrol
            edilmiştir.
          </p>
        </div>
        <div>
          {lawyers?.map((user) => (
            <div key={user._id} className=" d-flex justfiy-content-around m-5 ">
              <div className="border border-warning w-75 m-2 p-2 rounded-4 ">
                <div className="d-flex  ">
                  <div className=" d-flex ">
                    <div className="w-100 ">
                      <div className="d-flex w-100 ">
                        <div className="h-100">
                          <img width="150rem" src={image} alt="image" />
                        </div>

                        <div className="flex-fill m-2 ">
                          <div className="flex-grow-1 mx-2 ">
                            <span>
                              {" "}
                              <b>
                                {user.name} {user.surname}{" "}
                              </b>{" "}
                            </span>

                            <i class="fa-solid fa-clipboard-check mx-2 text-warning"></i>
                          </div>
                          <div className="d-flex">
                            <div className="mx-2 text-success">
                              {" "}
                              <i className="fa-solid fa-circle-check"></i>{" "}
                              <span>online görüşmeye uygun</span>{" "}
                            </div>
                            <div className="mx-2 text-success">
                              {" "}
                              <i className="fa-solid fa-circle-check"></i>{" "}
                              <span>büroda görüşmeye uygun</span>{" "}
                            </div>
                          </div>
                          <p className="m-2">{user.branch} avukatı, İstanbul</p>
                          <p className="mx-2">15 Yıllık Deneyim</p>
                          <p className="m-2 star">
                            {getStarReting(user.rating)}

                            <span>{user.reviews.length} yorum</span>
                          </p>
                        </div>
                        <button className="like">
                          <i className="fa-regular fa-heart fa-2xl"></i>
                        </button>
                      </div>
                      <div className="mt-2 ">
                        <p> Adres: dad adsad adasd asdasd asdasd asd asd d</p>
                        <h5 className="star">Bio</h5>
                        <p className="extra-content">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Qui, consectetur nequeab porro quasi culpa nulla
                          rerum quis minus voluptatibus sed hic ad quo sint,
                          libero commodi officia aliquam! Maxime. Lorem ipsum
                          dolor sit amet consectetur adipisicing elit.{" "}
                        </p>

                        {readMore && extraContent}
                        <a
                          className="read-more-link"
                          onClick={() => {
                            setReadMore(!readMore);
                          }}
                        >
                          <h2 className="more">{linkName}</h2>
                        </a>

                        <div className="p-2 d-flex justify-content-around star">
                          <div className="p-2 d-flex justify-content-around star">
                            <div>
                              <i className="fa-solid fa-tty fa-l"></i>{" "}
                              <span className="px-2">{user.phone}</span>{" "}
                            </div>

                            <div className="right-box-comment px-5">
                              {" "}
                              <i className=" fa-sharp fa-solid fa-comments "></i>{" "}
                              <span>Mesaj Gönder</span>{" "}
                            </div>

                            <div className="right-box-comment px-5 ">
                              <i className="fa-solid fa-globe  "></i>{" "}
                              <span>Web Sitesi'ne Git</span>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="right-box">
                      <div className="d-flex  p-2 ">
                        <Button
                          variant="outline-light"
                          className="ms-2 rounded-2 button"
                        >
                          Büro
                        </Button>
                        <Button
                          checked="true"
                          className="ms-2 rounded-2 button"
                        >
                          Online
                        </Button>
                      </div>
                      <div className="justify-content-center p-2">
                        <Table borderless="true">
                          <thead>
                            <tr className="tarih">
                              <td>
                                <button
                                  className="rounded-5 mt-3 search-caret"
                                  onClick={handlePrevWeek}
                                  disabled={new Date(dateRange[0]) < new Date()}
                                >
                                  <i className="fa-solid fa-caret-left fa-sm mx-2"></i>
                                </button>
                              </td>
                              {days.map((day, index) => {
                                const currentDate = new Date(dateRange[0]);
                                currentDate.setDate(
                                  dateRange[0].getDate() + index
                                );
                                const dayOfMonth = currentDate.getDate();
                                const month = currentDate.toLocaleString(
                                  "default",
                                  {
                                    month: "short",
                                  }
                                );
                                const dayOfWeek = currentDate.toLocaleString(
                                  "default",
                                  {
                                    weekday: "short",
                                  }
                                );
                                let label = "";
                                if (dayOfMonth === today.getDate()) {
                                  label = "Bugün";
                                } else if (dayOfMonth === today.getDate() + 1) {
                                  label = "Yarın";
                                } else {
                                  label = dayOfWeek;
                                }

                                return (
                                  <th key={day} className="text-center">
                                    {label} <br />
                                    {dayOfMonth} {month}
                                  </th>
                                );
                              })}
                              <td>
                                <button
                                  className="rounded-5 mt-3 search-caret"
                                  onClick={handleNextWeek}
                                >
                                  <i className="fa-solid fa-caret-right fa-sm mx-2"></i>
                                </button>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {hours.map((hour) => (
                              <tr key={hour}>
                                <td></td>
                                {days.map((day) => (
                                  <td>
                                    <button
                                      className="search-hoursbutton {selected} rounded-2"
                                      size="sm"
                                    >
                                      {hour}
                                    </button>
                                  </td>
                                ))}
                              </tr>
                            ))}

                            <tr className="much">
                              <td
                                onClick={() => {
                                  setMoreHour(!moreHour);

                                  if (moreHour) {
                                    setHours(hours.slice(0, 6));
                                  } else {
                                    setHours([
                                      "09:00",
                                      "10:00",
                                      "11:00",
                                      "12:00",
                                      "13:00",
                                      "14:00",
                                      "15:00",
                                      "16:00",
                                      "17:00",
                                      "18:00",
                                    ]);
                                  }
                                }}
                                colSpan={6}
                              >
                                {linkHour}
                                {caretIcon}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
