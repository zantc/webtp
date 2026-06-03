import type { IconOptions } from "leaflet"

export interface ILocation {
  lat: number
  lng: number
  title: string
  image: string
  address: string
  icon: IconOptions
  type: number
}