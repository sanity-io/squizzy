import React from 'react'

const CircleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
  </svg>
)

const SquareIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20V20H4V4Z" />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.0002 2L14.4698 9.60081H22.4618L15.9962 14.2984L18.4658 21.8992L12.0002 17.2016L5.53456 21.8992L8.00421 14.2984L1.53857 9.60081H9.53054L12.0002 2Z" />
  </svg>
)

const TriangleIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9999 3L21.5262 19.5H2.47363L11.9999 3Z" />
  </svg>
)

const ICONS = [CircleIcon, StarIcon, TriangleIcon, SquareIcon]

export default ICONS
