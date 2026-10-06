'use client'
import FeaturesSection from '@/components/FeaturesSection';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader'
import { useAuth } from '@/context/authContext'
import React from 'react'

export default function Page() {
  const { loading } = useAuth();

  return (
    <>
      {loading ? <Loader /> : <section className='w-full'>
        <Hero />
        <FeaturesSection/>
      </section>}

    </>
  )
}

