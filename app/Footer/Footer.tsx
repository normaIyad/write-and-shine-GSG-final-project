import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2025 Write & Shine All rights reserved.</p>
        <p>
          Follow us on{" "}
          <a
            href="https://github.com/normaIyad/write-and-shine-GSG-final-project.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write & Shine
          </a>
          !
        </p>
      </div>
    </footer>
  );
};

export default Footer;
