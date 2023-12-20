import React from "react"
import descriptions from "./projekty/descriptions.json"
import project1 from "./projekty/project1.png"
import project2 from "./projekty/project2.png"
import project3 from "./projekty/project3.png"
import project4 from "./projekty/project4.png"
import project5 from "./projekty/project5.png"
import menu from "./assets/menu.svg"

const projects = [project1, project2, project3, project4, project5]


export default function App() {
  const [menuOpened, setMenuOpened] = React.useState(false)
  const [selectedSquare, setSelectedSquare] = React.useState(1)
  const [isChangingPosition, setIsChangingPosition] = React.useState(false)
  
  const projectCount = 5

  let galleryTabs = []
  let galleryProjects = []
  let galleryDescriptions = []

  galleryDescriptions = descriptions.map((elem, index) => {
    return <p className={`gallery__project-description${((index+1) == selectedSquare)? "": " hidden"}`}>{elem.description}</p>
  })

  for (let i = 1; i <= projectCount; i++) {
    galleryTabs.push(<div onClick={() => handleSelectingTabSquare(i)} className={`gallery__tabs__square${selectedSquare == i? " selected": ""}`}></div>)
  }

  for (let i = 1; i <= projectCount; i++) {
    function getOrderInCircle(order) {
      if (order > projectCount) {
        return order % projectCount
      } else if (order < 1){
        return projectCount + order
      } else {
        return order
      }
    }
    let currentProject = <img src={projects[i-1]} className="hidden"></img>

    /*Základní pořadí*/
    if (i == getOrderInCircle(selectedSquare - 1)) {
      currentProject = <img onClick={() => handleSelectingSquare(i)} src={projects[i-1]} className="gallery__projects--first"></img>
    } else if (i == getOrderInCircle(selectedSquare)) {
      currentProject = <img src={projects[i-1]} className="gallery__projects--second"></img>
    } else if (i == getOrderInCircle(selectedSquare + 1)) {
      currentProject = <img onClick={() => handleSelectingSquare(i)} src={projects[i-1]} className="gallery__projects--third"></img>
    }

    /*Nadcházející a předcházející projekty které okem nejdou vidět*/
    if (i == getOrderInCircle(selectedSquare - 2) && isChangingPosition) {
      currentProject = <img src={projects[i-1]} className="gallery__projects--first down"></img>
    }

    if (i == getOrderInCircle(selectedSquare + 2) && isChangingPosition) {
      currentProject = <img src={projects[i-1]} className="gallery__projects--third down"></img>
    }

    galleryProjects.push(currentProject)
  }

  function handleSelectingSquare(i) {
    setSelectedSquare(i)
    setIsChangingPosition(true)
    setTimeout(() => {
      setIsChangingPosition(false)
    }, 2000)
  }

  function handleSelectingTabSquare(i) {
    setSelectedSquare(-100) //zmizení projektů
    setTimeout(() => {setSelectedSquare(i)}, 10) //znova zobrazení projektů
  }

  function openMenu() {
    setMenuOpened(true)
  }

  function closeMenu(event) {
    const target = event.target
    if (menuOpened && target.tagName != "LI" && target.className != "header__items__menu__icon") {
      setMenuOpened(false)
    }
  }

  React.useEffect(() => {
    const root = document.getElementById("root")
    root.addEventListener("click", closeMenu)
    return () => {
      root.removeEventListener("click", closeMenu)
    }
  }, [menuOpened])

  console.log("render")
  return (
    <>
      {/* <header>
        <div className="header__items">
          <div className="header__items__menu">
            <img onClick={openMenu} className="header__items__menu__icon" src={menu}></img>
            <nav className={`header__items__menu__nav${menuOpened? "": " hidden"}`}>
              * TO DO *
              <ul>
                <li>Home</li>
                <hr/>
                {}
                <li>Contact</li>
                <hr/>
                <li>About me</li>
              </ul>
            </nav>
          </div>
          * TO DO *
          <div className="header__items__icons">
            <a href=""><img src="./twitter-logo.svg"></img></a>
            <a href=""><img src="./mail-logo.svg"></img></a>
            <a href=""><img src="./ig-logo.svg"></img></a>
          </div>
        </div>
      </header> */}
      <main>
        <div id="gallery">
          <h1>My portfolio</h1>
          <div className="gallery__projects">
            {galleryProjects}
          </div>
          <div className="gallery__tabs">
            {galleryTabs}
          </div>
          <div className="gallery__project-description-list">
            {galleryDescriptions}
          </div>
        </div>
      </main>
    </>
  )
}