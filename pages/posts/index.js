import React from "react";
import Head from 'next/head'
import fetch from 'isomorphic-unfetch';

const Posts = ({ data }) => {

  return (
    <div>
      <Head>
        <title>Posts Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello Posts Page</h1>
      <ul>
        {
          data && data.map(item => {
            return <li key={item.PID}>{item.post_content}</li>
          })
        }
      </ul>
    </div>
  )
}

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ test: 'ahihi' });
    }, 100000);
  })
}

Posts.getInitialProps = async (ctx) => {
  const page = ctx?.query?.page || 1;
  const res = await fetch(`https://api-meme-zendvn-01.herokuapp.com/api/post/getListPagination.php?pagesize=${page}&currPage=1`)
  const json = await res.json()
  await delay();
  return { data: json.posts }
}

export default Posts;