import Image from "next/image";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.text}>
        Welcome to our blog! Our mission is to provide high-quality content on
        the latest trends in tech and beyond, helping both beginners and experts
        stay informed and inspired.
      </p>
      <Image
        src="/images/about-us.jpg"
        alt="About Us"
        width={600}
        height={400}
        className={styles.image}
      />
      <p className={styles.text}>
        We are passionate about sharing knowledge and fostering a community of
        developers, scientists, and artists.
      </p>
    </div>
  );
};

export default About;
