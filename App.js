import { StyleSheet, Text, View, Pressable } from 'react-native'
import Constants from 'expo-constants'
import { useState } from 'react'
import axios from 'axios'

const API_KEY = Constants.expoConfig.extra.ninjasApiKey
const baseUrl = 'https://api.api-ninjas.com'
const factUrl = `${baseUrl}/v1/facts`
const jokeUrl = `${baseUrl}/v1/jokes`
const quoteUrl = `${baseUrl}/v1/quotes`

console.log('start')

export default function App() {
  const [fact, setFact] = useState(
    'This is a template fact that is not too long'
  )
  const [quoteObject, setQuoteObject] = useState({
    quote: 'This is a template quote that is long',
    author: 'template author',
    category: 'category',
  })
  const [joke, setJoke] = useState(
    'This is a template joke that is not funny at all'
  )

  const getFact = async () => {
    try {
      const response = await axios.get(factUrl, {
        headers: { 'X-Api-Key': API_KEY },
      })
      console.log(response)
      setFact(response.data[0].fact)
    } catch (error) {
      console.log(error)
    }
  }

  const getJoke = async () => {
    try {
      const response = await axios.get(jokeUrl, {
        headers: { 'X-Api-Key': API_KEY },
      })
      console.log(response.data[0])
      setJoke(response.data[0].joke)
    } catch (error) {
      console.log(error)
    }
  }

  const getQuote = async () => {
    try {
      const response = await axios.get(quoteUrl, {
        headers: { 'X-Api-Key': API_KEY },
      })
      console.log(response.data[0])
      setQuoteObject(response.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.propContainer}>
          <Text style={styles.explanationText}>Fact of the day</Text>
          <Text style={styles.fact}>{fact}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.explanationText}>Joke of the day</Text>
          <Text style={styles.joke}>{joke}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.explanationText}>Quote of the day</Text>
          <Text style={styles.quote}>{quoteObject.quote}</Text>
          <View style={styles.quoteDataContainer}>
            <View style={styles.quoteData}>
              <Text>Author:</Text>
              <Text>Category:</Text>
            </View>
            <View style={styles.quoteData}>
              <Text>{quoteObject.author}</Text>
              <Text>{quoteObject.category}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={getFact} style={styles.button}>
          <Text>Get fact</Text>
        </Pressable>
        <Pressable onPress={getJoke} style={styles.button}>
          <Text>Get joke</Text>
        </Pressable>
        <Pressable onPress={getQuote} style={styles.button}>
          <Text>Get quote</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    margin: 20,
  },
  fact: {
    marginBottom: 20,
    fontSize: 30,
  },
  factContainer: {},
  joke: {
    marginBottom: 20,
    fontSize: 30,
  },
  jokeContainer: {},
  quote: {
    marginBottom: 10,
    fontSize: 30,
  },
  quoteAuthor: {},
  quoteCategory: {},
  quoteDataContainer: {
    flexDirection: 'row',
  },
  quoteData: {
    marginRight: 30,
  },
  quoteContainer: {},
  explanationText: {},
  propContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    margin: 10,
    padding: 30,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: '#aae',
  },
})
