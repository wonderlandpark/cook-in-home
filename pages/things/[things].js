import Head from 'next/head'
import { Card, Image, Container, Label, Divider } from 'semantic-ui-react'
import Notice from '../../components/Notice'

function Things({ data, selected }) {
    if(selected.length === 747) return (
        <Notice desc="냉장고가 묵직하네요~"/>
    )
    else return (
        <Container>
            <Head>
                <title>나의 냉장고</title>
            </Head>
            <h1>냉장고에 있는 음식들로 만들 수 있는 것들이에요.</h1>
            <strong>선택한 재료</strong> { selected.map(el=> <Label tag>{el}</Label>)}
            <br/><br/>
            <Card.Group>
            {
                data.map(el=> (
                    <Card fluid>
                <Card.Content>
                    <Image src={el['IMG_URL']} size='mini' floated='right' />
                    <Card.Header href={`/recipes/${el['RECIPE_ID']}`}>{el['RECIPE_NM_KO']}</Card.Header>
                    <Card.Meta>{el['LEVEL_NM']} - {el['COOKING_TIME']}</Card.Meta>
                    {el['SUMRY']}
                    <Divider/>
                    더 필요한 재료 {el.needs.filter(r=> !selected.includes(r['IRDNT_NM'])).map(r=> <Label>{r['IRDNT_NM']}</Label>)}
                </Card.Content>
            </Card>
                ))
            }
        </Card.Group>
        </Container>
    )
}

Things.getInitialProps = async(ctx) => {
    console.log(ctx.query.things)
    const { searchMatching } = require('../../utils')
    return { data: searchMatching(ctx.query.things.split('+')), selected: ctx.query.things.split('+') }
}
export default Things