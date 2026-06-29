import React from 'react'
import { MainLayout } from '../Components/layout/MainLayout'
import { Hero } from '../Components/movie/Hero'
import { ContinueMovie } from '../Components/movie/ContinueMovie'


export const HomePage = () => {
  return (
    <MainLayout>
        <Hero/>
        <ContinueMovie/>
    </MainLayout>
  )
}

