import { useParams } from 'react-router-dom'
import { data } from './article.data'
import styles from './ArticlePage.module.scss'

const ArticlePage = () => {
  const { id } = useParams()

  const article = data[Number(id) - 1]

  // const apiUrl = 'http://localhost:3000/api/tts'
  // const textData = {
  //   text: 'Бул кыргызча сөздөрдү түшүнөсүзбү? Тест',
  //   speaker_id: 2,
  // }

  // fetch(apiUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(textData),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`)
  //     }
  //     return response.blob()
  //   })
  //   .then((audioBlob) => {
  //     const audioUrl = URL.createObjectURL(audioBlob)
  //     console.log('Аудиофайл доступен по URL:', audioUrl)

  //     const audioPlayer = document.getElementById('audioPlayer')
  //     audioPlayer?.src = audioUrl
  //     audioPlayer?.play()
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error)
  //   })

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
