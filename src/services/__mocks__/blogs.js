const blogs = [
  {
    likes: 7,
    title: 'Metallica',
    author: 'James Hetfield',
    url: 'www.metallica.com',
    user: {
      username: 'Matuliini',
      name: 'Matleena Masalin',
      id: '5d8125685b8e56e0cc0a2142'
    },
    id: '5d81457b5b8e56e0cc0a2144'
  },
  {
    likes: 11,
    title: 'this one truth',
    author: 'Heikki H',
    url: 'www.onet.com',
    user: {
      username: 'Matuliini',
      name: 'Matleena Masalin',
      id: '5d8125685b8e56e0cc0a2142'
    },
    id: '5d8320f45b8e56e0cc0a2145'
  },
  {
    likes: 2,
    title: 'System',
    author: 'System of a down',
    url: 'www.system.com',
    user: {
      username: 'Matuliini',
      name: 'Matleena Masalin',
      id: '5d8125685b8e56e0cc0a2142'
    },
    id: '5d83228b5b8e56e0cc0a2146'
  },
  {
    likes: 2,
    title: 'Sepultura',
    author: 'Igor Cavalera',
    url: 'sepultura.com',
    user: {
      username: 'Matuliini',
      name: 'Matleena Masalin',
      id: '5d8125685b8e56e0cc0a2142'
    },
    id: '5d8324475b8e56e0cc0a2147'
  },
  {
    likes: 2,
    title: 'Bond',
    author: 'Joe Connery',
    url: 'www.bond.com',
    user: {
      username: 'Matuliini',
      name: 'Matleena Masalin',
      id: '5d8125685b8e56e0cc0a2142'
    },
    id: '5d8325745b8e56e0cc0a214a'
  },
  {
    likes: 1,
    title: 'Footballer',
    author: 'Ryan Giggs',
    url: 'www.ryangiggs.com',
    user: {
      username: 'Matuliini',
      name: 'Matleena Masalin',
      id: '5d8125685b8e56e0cc0a2142'
    },
    id: '5d8393315b8e56e0cc0a214e'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}


const setToken = (props) => {
  return Promise.resolve(props)
}


export default { getAll, setToken }