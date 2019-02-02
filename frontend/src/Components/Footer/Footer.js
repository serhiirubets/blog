import React from "react";
import { FacebookIcon, VkontakteIcon, InstagramIcon, YoutubeIcon } from '../Icons';

import styles from "./Footer.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div>
        <h2>Я в соц. сетях:</h2>
        <ul>
          <li>
            <a href="https://www.youtube.com/channel/UCwMnDJrWnxoCoKRzL_9C4Qw" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>
          </li>
          <li>
            <a href="https://www.instagram.com/serhiirubets" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/serhiirubets"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a href="https://www.vkontakte.com/serhiirubets" target="_blank" rel="noopener noreferrer"><VkontakteIcon /></a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
