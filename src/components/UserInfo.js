// components/UserInfo.js
export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._jobElement = document.querySelector(jobSelector);
    }

    // Method to get the current user info from the page
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        job: this._jobElement.textContent
      };
    }

    // Method to set new user info on the page
    setUserInfo({ name, job }) {
      if (name) this._nameElement.textContent = name;
      if (job) this._jobElement.textContent = job;
    }
  }
