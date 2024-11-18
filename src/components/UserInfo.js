export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    // Validate DOM elements
    if (!this._nameElement) {
      throw new Error(`UserInfo: Element with selector "${nameSelector}" not found`);
    }
    if (!this._jobElement) {
      throw new Error(`UserInfo: Element with selector "${jobSelector}" not found`);
    }
    if (!this._avatarElement) {
      throw new Error(`UserInfo: Element with selector "${avatarSelector}" not found`);
    }
  }

  // Get the current user info from the DOM
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      job: this._jobElement.textContent.trim(),
      avatar: this._avatarElement.src,
    };
  }

  // Update user info in the DOM
  setUserInfo({ name, job }) {
    if (typeof name === 'string' && name.trim()) {
      this._nameElement.textContent = name.trim();
    } else if (name !== undefined) {
      console.warn('UserInfo: Invalid "name" provided');
    }

    if (typeof job === 'string' && job.trim()) {
      this._jobElement.textContent = job.trim();
    } else if (job !== undefined) {
      console.warn('UserInfo: Invalid "job" provided');
    }
  }

  // Update the user's avatar in the DOM
  setAvatar(avatarUrl) {
    if (typeof avatarUrl === 'string' && avatarUrl.trim()) {
      this._avatarElement.src = avatarUrl.trim();
    } else {
      console.warn('UserInfo: Invalid "avatarUrl" provided');
    }
  }
}
