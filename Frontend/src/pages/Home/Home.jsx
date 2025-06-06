import { useState } from 'react'
import ExploreMenu from '../../components/ExporeMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
    const [category, setCategory] = useState("All")
  return (
    <>
    <Header/>
    <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodDisplay category={category} />
    <AppDownload />
    </>
  )
}

export default Home