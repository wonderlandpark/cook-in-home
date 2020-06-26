import Router from 'next/router'
import Head from 'next/head'
import { Container, Card, Label, Segment, Image, Grid, Icon } from 'semantic-ui-react'
import { useEffect } from 'react'
import Err from '../../components/Notice'
function Home({ info }) {
  console.log(info)
    if(!info) return(
      <Err header="404" desc="요청하신 음식은 존재하지 않습니다"/>
    )
  return (
    <div>
      <Head>
        <title>{info.general['RECIPE_NM_KO']}</title>
      </Head>
      <Container>
        <a className='back' href='/'><Icon name='arrow left'/> 뒤로 가기</a>
        <div className="contents">
        <Grid columns={2}>
          <Grid.Column>
            <a style={{ color: 'gray' }}>{info.general['NATION_NM'] && '#' + info.general['NATION_NM']} {info.general['TY_NM'].split('/').reverse().map(r=> `#${r} `)}</a>
            <h1 style={{ fontSize: '3em', marginTop: 0}}>{info.general['RECIPE_NM_KO']}</h1>
            <span style={{ color: 'gray' }}>{info.general['QNT']} {info.general['PC_NM'] && '| ' + info.general['PC_NM']}</span>
            <br/><br/>
          </Grid.Column>
          <Grid.Column>
          <Image src={info.general['IMG_URL']} floated="right"/>
          </Grid.Column>
        </Grid>
        <p>{info.general['SUMRY']}</p>

       
        <h2>재료</h2>
        <Segment>
          {
            info.things.map((el, n)=> `${el['IRDNT_NM']} ${el['IRDNT_CPCTY']}${n+1 === info.things.length ? '' : ', '}`)
          }
        </Segment>
        <h2>레시피</h2>
        <Segment>
        {
            info.steps.map((el, n)=> (
             <>
              <h3>{n+1}. {el['COOKING_DC']}</h3>
              {el['STEP_TIP'] && `TIP! ${el['STEP_TIP'].replace(/^\**/, '')}`}
              <Image src={el['STRE_STEP_IMAGE_URL']}/>
             </>
            ))
          }
        </Segment>
        </div>
      </Container>
    </div>
  )
}

Home.getInitialProps = async(ctx) => {
  const { getInfo } = require('../../utils')
  return { info: getInfo(ctx.req.url.split('/')[2]) }
}
export default Home