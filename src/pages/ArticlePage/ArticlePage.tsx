import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { data } from './article.data'
import Player from '../../player/Player'
import styles from './ArticlePage.module.scss'

const ArticlePage = () => {
  const { id } = useParams()

  const article = data[Number(id) - 1]
  const textToSpeech = article.title.concat(article.lead, article.body)
  console.log(textToSpeech);
  
  const renderPostParagraphs = (text: string) => {
    const paragraphs = text.split('\n').map((paragraph, index) => (
      <p key={index} className={styles.postBodyParagraph}>
        {paragraph}
      </p>
    ))

    return <div>{paragraphs}</div>
  }

  return (
    <>
      {id && (
        <main>
          <div className={styles.container}>
            <div className={styles.postHero}>
              <h1 className={styles.postHeroTitle}>{article.title}</h1>
              <Player text={textToSpeech} speaker_id={2} />
              <figure className={styles.postHeroFigure}>
                <picture>
                  <img src={article.imageUrl} alt="Article's main img" />
                </picture>
              </figure>
            </div>
            <article className={styles.postBody}>
              <strong>
                <p className={styles.postBodyLead}>{article.lead}</p>
              </strong>
              {renderPostParagraphs(article.body)}
              {article.blockquote && <blockquote>{article.blockquote}</blockquote>}
            </article>
          </div>
        </main>
      )}
    </>
  )
}

export default ArticlePage
