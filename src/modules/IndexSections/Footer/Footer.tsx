import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <article
      id={"contacts"}
      className={styles.parent}
      style={{ backgroundImage: `url("/images/footerBackground.webp")` }}
    >
      <section className={styles.title}>
        <h1>Хотите связаться с нами?</h1>
        <h2>
          Пишите на почту{" "}
          <a href={"mailto:contact@rtuitlab.dev"}>contact@rtuitlab.dev</a>
        </h2>
      </section>
      <section className={styles.bottomParent}>
        <section className={styles.bottomLinks}>
          <a
            href="https://www.youtube.com/channel/UC3nHF99l4aYHUvOqXkrKsaQ"
            target={"_blank"}
          >
            <img src="/images/icons/youtube.webp" alt="YouTube logo" />
          </a>
          <a href="https://vk.com/rtuitlab" target={"_blank"}>
            <img src="/images/icons/vk.webp" alt="VK logo" />
          </a>
          <a href="https://github.com/rtuitlab" target={"_blank"}>
            <img src="/images/icons/github.webp" alt="GitHub logo" />
          </a>
        </section>
        <p>© {process.env.REACT_APP_BUILD_YEAR} RTUITLab</p>
      </section>
    </article>
  );
}
