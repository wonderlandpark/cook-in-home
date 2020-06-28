import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Container, Card, Label, Image, Input, Dropdown, Search } from 'semantic-ui-react'
function Home({ featured }) {
  const { searchObj, getByName, search } = require('../utils')
  const [ results, setRes ] = useState(searchObj())
  const languageOptions = searchObj()
  const handleChange = (e, { value }) => {
    setRes(search(value))
    console.log(value)
  }
  const handleSelect = (e, { result }) => {
    Router.push('/recipes/' + result.id)
  }
  return (
    <div>
      <Head>
        <title>집에서 요리하기</title>
      </Head>
      <div style={{ background: '#D1DFE8', padding: '10%'}}>
        <h1>요리하시고 싶으세요?</h1>
        <Search style={{ width: '100%' }} size="large" results={results} noResultsMessage="검색 결과가 없습니다." onSearchChange={handleChange} onResultSelect={handleSelect} placeholder="음식명을 입력하세요..."/>
      </div>
      <div style={{ padding: '10%' }}>
      <h1>이런 요리는 어때요?</h1><br/><br/>
      <Card.Group stackable>
      { 
        featured.map(el=> (
          <Card>
            <Card.Content>
              <Image src={el['IMG_URL']} size='mini' floated='right'/>
              <Card.Header href={`/recipes/${el['RECIPE_ID']}`}>{el['RECIPE_NM_KO']}</Card.Header>
              <Card.Meta>{el['LEVEL_NM']} - {el['COOKING_TIME']}</Card.Meta>
              {el['SUMRY']}
            </Card.Content>
          </Card>
        ))
      }
      </Card.Group>
      </div>

      <div style={{ padding: '10%' }}>
      <h1>이런 요리는 어때요?</h1><br/><br/>
      <Card.Group stackable>
      { 
        featured.map(el=> (
          <Card>
            <Card.Content>
              <Image src={el['IMG_URL']} size='mini' floated='right'/>
              <Card.Header href={`/recipes/${el['RECIPE_ID']}`}>{el['RECIPE_NM_KO']}</Card.Header>
              <Card.Meta>{el['LEVEL_NM']} - {el['COOKING_TIME']}</Card.Meta>
              {el['SUMRY']}
            </Card.Content>
          </Card>
        ))
      }
      </Card.Group>
      </div>
    </div>
  )
}

Home.getInitialProps = async(ctx) => {
  const { getRandom } = require('../utils')
  return { featured: getRandom(3) }
}
export default Home