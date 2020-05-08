import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("req.method", req.method);

  console.log("req.email", req.body.email);
  console.log("req.password", req.body.password);
  const token = "hjsfhsjkfhsjfkskfhsjkfhs fhsjkffh skdfh sfjkh sfdsjk fhsjk hsjkf hsdjk "

  if (req.method === "POST") {
    // res.writeHead(302, {
    //   "Location": '/',
    //   "Set-Cookie": `token=${token}; expires=Sat, 01-Jan-2021 00:00:00 GMT; Path=/;`
    // })
    res.writeHead(200, {
      "Content-Type": "application/json",
      'Set-Cookie': [
        `token="${token}; Expires=1234; Path=/;"`,
        'wallawalla="bingbang; Expires=123456789; Path=/;"'
      ],
      // "Set-Cookie": `token=${token}; expires=Sat, 01-Jan-2021 00:00:00 GMT; Path=/; HttpOnly=true;, test=thethoianhem; expires=Sat, 01-Jan-2021 00:00:00 GMT;`
    })

    res.end()
  } else {
    res.statusCode = 405
    res.end('Method not allowed')
  }
}
