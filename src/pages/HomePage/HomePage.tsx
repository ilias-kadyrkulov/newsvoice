import { Link } from 'react-router-dom'
import { articles } from './home.data'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <div className="container">
        <h1>Акыркы жаңылыктар</h1>
        <div className={styles.postFeed}>
          {articles.map((article) => (
            <article key={article.id}>
              <Link to={`article/${article.id.toString()}`}>
                <figure>
                  <picture>
                    <img src={article.imageUrl} alt="Article's img's URL path" />
                  </picture>
                </figure>
              </Link>
              <div>
                <h2>
                  <Link to={`article/${article.id.toString()}`}>{article.title}</Link>
                </h2>
                <p>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
