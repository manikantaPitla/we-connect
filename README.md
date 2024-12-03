# WeConnect

A responsive and feature-rich chatting application designed
for seamless real-time communication. With modern design and robust
functionalities, WeConnect offers users an efficient way to connect with
friends and family.

## Features

- **Real-Time Messaging:** Instant communication with users in
  private chats.
- **Connection Requests:** Send and manage connection requests
  to build your network.
- **Media Sharing:** Share images, videos, and audio
  with real-time previews and thumbnails.
- **Optimized Performance:** Lazy
  loading for media and optimized component rendering for better
  performance.
- **Responsive Design:** Fully functional across all devices,
  ensuring an intuitive user experience on both desktop and mobile.

## Technologies Used

### Frontend

- **React.js:** For building reusable and
  interactive UI components.
- **Redux Toolkit:** For efficient state management
  and seamless data flow.
- **CSS Modules & Styled Components:** For modular and
  scalable styling.

### Backend

#### Firebase

- **Firestore:** For storing real-time
  messages and user data.
- **Authentication:** For secure user login and
  registration.
- **Storage:** For media uploads and efficient retrieval.

## How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/manikantaPitla/we-connect.git
cd we-connect
```

2 **Install dependencies:**

```bash
npm install
```

3 **Set up Firebase:**

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Firestore,Authentication, and Storage.
- Update `firebaseConfig` in the `src/config/firebase.js` file with your Firebase credentials.

4 **SetUp Environment Variables:**

```bash
VITE_API_KEY = "YOUR API KEY"
VITE_AUTH_DOMAIN = "YOUR AUTH DOMAIN"
VITE_PROJECT_ID = "YOUR PROJECT ID"
VITE_STORAGE_BUCKET = "YOUR STORAGE BUCKET"
VITE_MESSAGE_SENDER_ID = "YOUR MESSAGE SENDER ID"
VITE_APP_ID = " YOUR APP ID"
VITE_MEASUREMENT_ID = "YOUR MEASUREMENT ID"

```

5 **Run the development server:**

```bash
npm start
```

5 Open your browser and visit
http://localhost:5173.

## Application Design

- **Sign Up Page**
    <details>
    <summary>Desktop</summary>

  ![Desktop Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733211456/we-connect-readme-static-images/sign-up-large.png)

    </details>
    <details>
    <summary>Mobile</summary>

  ![Mobile Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216419/we-connect-readme-static-images/sign-up-small.png)

    </details>

- **Sign In Page**
    <details>
    <summary>Desktop</summary>

  ![Desktop Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216420/we-connect-readme-static-images/sign-in-large.png)

    </details>
    <details>
    <summary>Mobile</summary>

  ![Mobile Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216417/we-connect-readme-static-images/sign-in-small.png)

    </details>

- **Home**
    <details>
    <summary>Desktop</summary>

  ![Desktop Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216416/we-connect-readme-static-images/home-large.png)

    </details>
    <details>
    <summary>Mobile</summary>

  ![Mobile Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216416/we-connect-readme-static-images/home-small.png)

    </details>

- **Profile**
    <details>
    <summary>Desktop</summary>

  ![Desktop Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216416/we-connect-readme-static-images/profile-large.png)

    </details>
    <details>
    <summary>Mobile</summary>

  ![Mobile Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216416/we-connect-readme-static-images/profile-small.png)

    </details>

- **Messages**
    <details>
    <summary>Desktop</summary>

  ![Desktop Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216415/we-connect-readme-static-images/chats-large.png)

    </details>
    <details>
    <summary>Mobile</summary>

  ![Mobile Signup](https://res.cloudinary.com/df9fyawpk/image/upload/v1733216416/we-connect-readme-static-images/chats-small.png)

    </details>

## License

This project is licensed under the MIT License.

**_Project Link:_** https://github.com/manikantaPitla/we-connect

**_Live Link:_** https://weconnectdev.netlify.app
