import styles from './Notice.module.css'
import { Icon } from 'semantic-ui-react'
import Head from 'next/head'

function Notice({ header, desc }) {
  return (
    <div className={styles.container}>
    <Head>
        <title>{desc}</title>
    </Head>
    <h1 className={styles.project}>
    <Icon className='food'/>
  </h1>
  <br/>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <h1 className={styles.desc}>
            { desc }
          </h1>
        </div>
        <br/>
      </div>
    </div>
  )
}

export default Notice