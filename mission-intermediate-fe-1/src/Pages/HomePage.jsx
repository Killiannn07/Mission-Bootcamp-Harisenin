import React from 'react'
import { MainLayout } from '../Components/layout/MainLayout'
import { Hero } from '../Components/movie/Hero'
import { ContinueMovie } from '../Components/movie/ContinueMovie'
import { FilmSection } from '../Components/movie/Film Section'
import { getFilms, getNewRelease, getTopTen } from '../data/movie'


export const HomePage = () => {
  return (
    <MainLayout>
        <Hero/>
        <ContinueMovie/>
        <FilmSection text="Top Film dan Series Hari ini" movie={getFilms()}/>
        <FilmSection text="Film Trending" movie={getTopTen()}/>
        <FilmSection text="Rilis Baru" movie={getNewRelease()}/>
    </MainLayout>
  )
}

