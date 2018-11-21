import React from "react";

export const About = () => {
  return (
    <div>
      <h3>About</h3>
      <p>This website is made using these following systems.</p>
      <ul className="list-style">
        <li>ReactJs - Frontend</li>
        <li>Firebase - Backend</li>
        <li>Firestore - Database</li>
        <li>Redux - State & Property Manager</li>
        <li>Bootstrap - CSS</li>
        <li>Sass - CSS / SCSS</li>
        <li>Fontawesome - Icons</li>
      </ul>
      <div>
        If you have question:
        <ul className="list-unstyled">
          <li>
            <i className="fas fa-at fa-lg text-success m-2" />
            <a href="mailto:jammmg26@gmail.com">jammmg26@gmail.com</a>
          </li>
          <li>
            <i className="fab fa-facebook fa-lg text-primary m-2" />
            <a href="https://fb.me/jammmg">https://fb.me/jammmg</a>
          </li>
          <li>
            <i className="fas fa-phone fa-lg text-danger m-2" />
            <a href="callto:639304699769">+63-930-469-9769</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
