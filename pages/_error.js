import React from 'react'
import Notice from '../components/Notice'

function CustomError ({ statusCode, statusText }) {
  return (
    <Notice header={ statusCode } desc={ statusText }/>
  )
}

function getInitialProps ({ res, err }) {
  let statusCode
  // If the res variable is defined it means nextjs
  // is in server side
  if (res) {
    statusCode = res.statusCode
  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null
  }
  const statusText = statusCodeToText[statusCode] || statusCodeToText.DEFAULT
  return { statusCode, statusText }
}

CustomError.getInitialProps = getInitialProps

export default CustomError

const statusCodeToText = {
  DEFAULT: '예상치 못한 에러가 발생하였습니다.',
  200: '문제가 없는데 여기를 어떻게 오셨죠?',
  400: '올바르지 않은 요청입니다.',
  401: '로그인이 필요합니다.',
  402: '결제가 필요합니다.',
  403: '권한이 없습니다.',
  404: '페이지가 존재하지 않습니다.',
  405: '해당 요청 방법은 허용되지 않습니다.',
  406: '연결을 받아드릴 수 없습니다.',
  429: '지정된 시간에 너무 많은 요청을 보내셨습니다.',
  500: '서버 내부 오류가 발생하였습니다.',
  502: '올바르지 않은 게이트웨이입니다.'
}
