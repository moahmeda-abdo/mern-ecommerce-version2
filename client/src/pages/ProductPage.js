import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProductPage() {
const params = useParams()
const {slug} = params
  return (
    <>
    <h1>{slug}</h1>
    </>
  )
}
