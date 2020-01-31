import md5 from 'md5'

const { REACT_APP_PUBLIC_API_KEY, REACT_APP_PRIVATE_API_KEY } = process.env

export default async (name = '') => {
  if (!REACT_APP_PUBLIC_API_KEY || !REACT_APP_PUBLIC_API_KEY){
    return { error : 'No API keys provided' }
  }
  const now = new Date().getTime().toString()
  const hash = md5(now + REACT_APP_PRIVATE_API_KEY + REACT_APP_PUBLIC_API_KEY)
  const authParams = `?ts=${ now }&apikey=${ REACT_APP_PUBLIC_API_KEY }&hash=${ hash }`
  const searchName = name.length ? ('&name=' + name) : ''
  const url = 'https://gateway.marvel.com/v1/public/characters' + authParams + searchName
  try{
    const response = await window.fetch(url)
    const { data } = await response.json()
    const characters = data.results.map(({ id, name, description, thumbnail, urls }) => {
      const { path, extension } = thumbnail
      const image = path + '/landscape_incredible.' + extension
      const wiki = urls.find(({ type }) => type === 'wiki')?.url
      return { id, name, description, image, wiki }
    })
    return { characters }
  }
  catch{
    return { error : `Can't fetch from API` }
  }
}
