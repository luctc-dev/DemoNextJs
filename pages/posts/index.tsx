import React from "react";
import Head from 'next/head'
import Router from 'next/router';
import axios from 'axios';

const Posts = ({ data, ...restProps }) => {
  console.log("restProps", restProps);

  const handleLogin = (evt: React.MouseEvent) => {
    evt.preventDefault();

    axios
      .post('/api/login', { email: 'test@gmail.com', password: "123123" })
      .then(res => {
        console.log("res = ", res);
        Router.push('/');
      })
  }

  return (
    <div>
      <Head>
        <title>Posts Page</title>
      </Head>
      <h1>Hello Posts Page</h1>
      <form action="/api/login" method="POST">
        <input type="text" defaultValue="test@gmail.com" name="email" />
        <input type="password" autoComplete="off" defaultValue="password123456" name="password" />
        {/* <button type="submit">Login</button> */}

        <button onClick={handleLogin}>Login</button>
      </form>
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
    }, 5000);
  })
}

Posts.getInitialProps = async (ctx) => {
  const page = ctx?.query?.page || 1;
  const res = await axios.get(`https://api-meme-zendvn-01.herokuapp.com/api/post/getListPagination.php?pagesize=${page}&currPage=1`)

  return { data: res?.data?.posts || [] }
}

export default Posts;