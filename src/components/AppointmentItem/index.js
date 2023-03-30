// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachAppoint, toggleIsStar} = props
  const {title, date, isStar, id} = eachAppoint

  const images = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStar = () => {
    toggleIsStar(id)
  }

  return (
    <li className="list-card">
      <div className="recent-card">
        <p className="text-card">{title}</p>
        <button
          type="button"
          className="star-img-btn"
          data-testid="star"
          onClick={onStar}
        >
          <img src={images} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
