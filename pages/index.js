import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Container, Card, Icon, Image, Input, Dropdown, Search, Button } from 'semantic-ui-react'
function Home({ featured }) {
  const { searchObj, getByName, search, unique } = require('../utils')
  const [ results, setRes ] = useState(searchObj())
  const [ things, setThings ] = useState([])
  const handleChange = (e, { name, value }) => {
    setRes(search(value))
  }
  const handleSelect = (e, { result }) => {
    Router.push('/recipes/' + result.id)
  }
  return (
    <div>
      <Head>
        <title>집콕 - 집에서 요리하기</title>
      </Head>
      <div style={{ background: '#D1DFE8', padding: '7%'}}>
        <h1>요리하시고 싶으세요?</h1>
        <Search name="search" style={{ width: '100%' }} size="large" results={results} noResultsMessage="검색 결과가 없습니다." onSearchChange={handleChange} onResultSelect={handleSelect} placeholder="음식명을 입력하세요..."/>
      </div>
      <Container>
      <h1>냉장고에 있는 재료를 조합해볼까요?</h1><br/><br/>
      <strong>냉장고에 있는 재료를 골라주세요</strong>
      <Dropdown onChange={(e, { value }) => setThings(value)} name="dropdown" value={things} fluid multiple search selection options={unique()} placeholder="재료를 선택하세요" noResultsMessage="검색 결과가 없습니다."/>
      <br/>
      <Button disabled={things.length === 0} href={`/things/${things.join('+')}`}><Icon className="food"/>검색하기</Button>
      </Container>

      <Container>
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
      </Container>
    </div>
  )
}

Home.getInitialProps = async(ctx) => {
  const { getRandom } = require('../utils')
  return { featured: getRandom(3) }
}
export default Home