// components/UserInfo.js
export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Method to get the current user info from the page
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Method to set new user info on the page
  setUserInfo({ name, job, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;

    if (avatar) {
      // Set up the avatar image with proper error handling for broken links
      this._avatarElement.src = avatar;
      this._avatarElement.alt = `Avatar of ${name || this._nameElement.textContent}`;

      // Error handling to load a fallback image if the provided avatar fails to load
      this._avatarElement.onerror = () => {
        this._avatarElement.src = 'https://placekitten.com/150/150'; // Fallback image for avatar
        this._avatarElement.alt = 'Fallback avatar image';
      };
    }
  }
}
