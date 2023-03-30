// Write your code here
import {format} from 'date-fns'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    allAppointmentList: [],
    isActiveStar: false,
  }

  onTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const appointDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppoint = {
      id: uuidv4(),
      title: titleInput,
      date: appointDate,
      isStar: false,
    }

    this.setState(oldValue => ({
      allAppointmentList: [...oldValue.allAppointmentList, newAppoint],
      titleInput: '',
      dateInput: '',
    }))
  }

  onStar = () => {
    const {isActiveStar} = this.state
    this.setState({
      isActiveStar: !isActiveStar,
    })
  }

  toggleIsStar = id => {
    this.setState(oldValue => ({
      allAppointmentList: oldValue.allAppointmentList.map(eachAppoint => {
        if (id === eachAppoint.id) {
          return {...eachAppoint, isStar: !eachAppoint.isStar}
        }
        return eachAppoint
      }),
    }))
  }

  onlyStarFill = () => {
    const {allAppointmentList, isActiveStar} = this.state
    if (isActiveStar) {
      return allAppointmentList.filter(
        eachAppoint => eachAppoint.isStar === true,
      )
    }
    return allAppointmentList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const newAppointList = this.onlyStarFill()
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="form-img-container">
            <form className="form-card" onSubmit={this.onFormSubmit}>
              <h1 className="heading-card">Add Appointment</h1>

              <label className="label-card" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                value={titleInput}
                onChange={this.onTitle}
                className="input-card"
              />

              <label htmlFor="date" className="label-card">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={dateInput}
                onChange={this.onDate}
                className="input-card"
              />

              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appoint-img"
            />
          </div>
          <hr className="line-card" />
          <div className="star-container">
            <h1 className="head-text">Appointments</h1>
            <button type="button" className="star-btn" onClick={this.onStar}>
              Starred
            </button>
          </div>
          <ul className="appoint-list-container">
            {newAppointList.map(eachAppoint => (
              <AppointmentItem
                eachAppoint={eachAppoint}
                key={eachAppoint.id}
                toggleIsStar={this.toggleIsStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
