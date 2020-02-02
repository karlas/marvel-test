import md5 from 'md5'
import 'isomorphic-fetch'

export default async (publicKey, privateKey, name = '') => {
  if (!publicKey || !publicKey){
    return { error : 'No API keys provided' }
  }
  const now = new Date().getTime().toString()
  const hash = md5(now + privateKey + publicKey)
  const authParams = `?ts=${ now }&apikey=${ publicKey }&hash=${ hash }`
  const searchName = name.length ? ('&name=' + name) : ''
  const url = 'https://gateway.marvel.com/v1/public/characters' + authParams + searchName
  try{
    const response = await fetch(url)
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
